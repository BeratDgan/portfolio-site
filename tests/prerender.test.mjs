import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { dictionaries } from '../dist-ssr/entry-server.js'

const origin = 'https://beratdogan.me'
const paths = { en: '/', tr: '/tr/' }
for (const lang of ['en', 'tr']) {
  test(`${lang}: full static content, metadata and Markdown stay aligned`, async () => {
    const html = await readFile(lang === 'tr' ? 'dist/tr/index.html' : 'dist/index.html', 'utf8')
    const md = await readFile(`dist/${lang}.md`, 'utf8')
    const t = dictionaries[lang]
    assert.ok(html.includes(`<html lang="${lang}">`))
    assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length, 1)
    assert.equal([...html.matchAll(/<title>/g)].length, 1)
    assert.ok(html.includes(`rel="canonical" href="${origin}${paths[lang]}"`))
    for (const [language, path] of [...Object.entries(paths), ['x-default', '/']]) {
      assert.ok(html.includes(`hreflang="${language}" href="${origin}${path}"`))
    }
    assert.ok(html.includes(`type="text/markdown" href="${origin}/${lang}.md"`))
    for (const section of ['about', 'experience', 'stack', 'projects', 'path', 'contact']) assert.ok(html.includes(`id="${section}"`))
    for (const title of ['Cloud Native Order Platform', 'Trackruit', 'PrePath', 'Lyricly.tech', 'Live Streaming Platform']) {
      assert.ok(html.includes(title)); assert.ok(md.includes(title))
    }
    assert.ok(md.startsWith('# Berat Doğan\n'))
    assert.ok(md.includes(t.hero.blurb))
    for (const detail of t.projects.featured.details) assert.ok(md.includes(detail.body))
    for (const project of t.projects.items) assert.ok(md.includes(project.description))
    assert.ok(md.includes(lang === 'tr' ? 'Berat_Dogan_CV_TR.pdf' : 'Berat_Dogan_CV.pdf'))
    const graph = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])['@graph']
    const person = graph.find(item => item['@type'] === 'Person')
    assert.equal(person.name, 'Berat Doğan'); assert.equal(person.alternateName, 'Berat Dogan')
    assert.equal(person.jobTitle, t.experience.role)
    assert.ok(person.sameAs.includes('https://github.com/BeratDgan'))
    assert.ok(person.sameAs.includes('https://www.linkedin.com/in/beratdgan/'))
    assert.ok(person.knowsAbout.length > 0)
    assert.ok(graph.find(item => item['@type'] === 'WebSite'))
    for (const image of html.matchAll(/<img\b[^>]*>/g)) assert.match(image[0], /\balt="[^"]*"/)
    assert.ok(html.includes('name="twitter:description"'))
    assert.ok(html.includes('property="og:locale"'))
    assert.ok(html.includes('href="/tr/" hrefLang="tr"'))
    assert.ok(!html.includes('<!--seo-head-->'))
  })
}

test('sitemap, discovery and real 404 are generated', async () => {
  const sitemap = await readFile('dist/sitemap.xml', 'utf8')
  assert.equal([...sitemap.matchAll(/<url>/g)].length, 2)
  assert.ok(sitemap.includes('xmlns:xhtml="http://www.w3.org/1999/xhtml"'))
  assert.equal([...sitemap.matchAll(/hreflang=/g)].length, 6)
  const llms = await readFile('dist/llms.txt', 'utf8')
  for (const path of ['/', '/tr/', '/en.md', '/tr.md']) assert.ok(llms.includes(`${origin}${path}`))
  const robots = await readFile('dist/robots.txt', 'utf8')
  for (const bot of ['*', 'GPTBot', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'OAI-SearchBot', 'Google-Extended']) assert.ok(robots.includes(`User-agent: ${bot}\nAllow: /`))
  assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`))
  assert.ok((await readFile('dist/404.html', 'utf8')).includes('content="noindex"'))
  assert.deepEqual(JSON.parse(await readFile('dist/_routes.json', 'utf8')).include, ['/', '/tr', '/tr/'])
})
