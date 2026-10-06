import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import assert from 'node:assert/strict'

const base = process.env.PAGES_TEST_URL || 'http://127.0.0.1:8788'
const dir = mkdtempSync(join(tmpdir(), 'portfolio-pages-'))
const request = (path, accept, head = false) => {
  const bodyFile = join(dir, 'body')
  const args = ['-sS', '--max-time', '15', '-D', '-', '-o', bodyFile]
  if (head) args.push('--head')
  if (accept) args.push('-H', `Accept: ${accept}`)
  const raw = execFileSync('curl', [...args, `${base}${path}`], { encoding: 'utf8' })
  const headers = new Headers(raw.split(/\r?\n/).slice(1).filter(line => line.includes(':')).map(line => {
    const colon = line.indexOf(':'); return [line.slice(0, colon), line.slice(colon + 1).trim()]
  }))
  return { status: Number(raw.match(/^HTTP\/\S+ (\d+)/)[1]), headers, body: head ? '' : readFileSync(bodyFile, 'utf8') }
}
try {
  for (const [lang, path] of [['en', '/'], ['tr', '/tr/']]) {
    for (const [accept, type] of [['text/html', 'text/html'], ['text/markdown', 'text/markdown'], ['text/markdown;q=0', 'text/html'], ['text/html;q=1, text/markdown;q=0.5', 'text/html']]) {
      const response = request(path, accept)
      assert.equal(response.status, 200)
      assert.equal(response.headers.get('content-type'), `${type}; charset=utf-8`)
      assert.equal(response.headers.get('content-language'), lang)
      assert.ok(response.headers.get('vary').toLowerCase().includes('accept'))
      assert.equal(response.headers.get('cache-control'), 'no-store')
      if (type === 'text/html') {
        assert.ok(response.body.includes(`<html lang="${lang}">`))
        assert.equal([...response.body.matchAll(/<h1(?:\s|>)/g)].length, 1)
        assert.ok(response.body.includes('Cloud Native Order Platform'))
      } else assert.equal(response.body, readFileSync(`dist/${lang}.md`, 'utf8'))
      console.log(`GET ${path} | Accept: ${accept} → ${response.status} ${response.headers.get('content-type')} | lang=${lang} | Vary=${response.headers.get('vary')}`)
    }
    const head = request(path, 'text/markdown', true)
    assert.equal(head.status, 200)
    assert.equal(head.headers.get('content-type'), 'text/markdown; charset=utf-8')
    assert.equal(head.headers.get('content-location'), `/${lang}.md`)
    const direct = request(`/${lang}.md`)
    assert.equal(direct.status, 200)
    assert.equal(direct.headers.get('content-type'), 'text/markdown; charset=utf-8')
    assert.equal(direct.body, readFileSync(`dist/${lang}.md`, 'utf8'))
    console.log(`HEAD ${path} + GET /${lang}.md → 200; matching Markdown and language`)
  }
  const redirect = request('/tr?ref=test', 'text/markdown')
  assert.equal(redirect.status, 308)
  assert.equal(redirect.headers.get('location'), `${base}/tr/?ref=test`)
  console.log('GET /tr?ref=test → 308 /tr/?ref=test')
  for (const path of ['/llms.txt', '/robots.txt', '/sitemap.xml']) {
    const response = request(path)
    assert.equal(response.status, 200)
    assert.equal(response.body, readFileSync(`dist${path}`, 'utf8'))
    console.log(`GET ${path} → 200; matches generated asset`)
  }
  assert.equal(request('/this-page-does-not-exist', 'text/markdown').status, 404)
  console.log('GET /this-page-does-not-exist → 404 (no SPA fallback)')
  console.log('All curl checks passed.')
} finally { rmSync(dir, { recursive: true, force: true }) }
