import assert from 'node:assert/strict'
import test from 'node:test'
import { onRequest } from '../functions/_middleware.js'

function context({ path = '/', method = 'GET', accept, headers = {}, asset, html } = {}) {
  const calls = { next: 0, assets: [] }
  if (accept !== undefined) headers.Accept = accept
  const nextResponse = html ?? new Response('<!doctype html><title>Berat</title>', {
    headers: { 'Content-Type': 'text/html', 'Cache-Control': 'public, max-age=600' },
  })
  return {
    calls,
    nextResponse,
    request: new Request(`https://beratdogan.me${path}`, { method, headers }),
    next: async () => {
      calls.next++
      return nextResponse
    },
    env: {
      ASSETS: {
        fetch: async (request) => {
          calls.assets.push(request)
          if (asset instanceof Error) throw asset
          return asset ?? new Response('# Berat Doğan\n', { headers: { 'Content-Type': 'text/markdown' } })
        },
      },
    },
  }
}

for (const [accept, markdown] of [
  [undefined, false],
  ['*/*', false],
  ['text/*', false],
  ['text/html', false],
  ['text/markdown', true],
  ['TEXT/MARKDOWN; Q=1', true],
  ['text/markdown;q=0', false],
  ['text/markdown;q=bogus', false],
  ['text/markdown;q=2', false],
  ['text/markdown;q=0.8, text/html;q=1', false],
  ['text/markdown;q=0.8, text/html;q=0.8', true],
  ['text/markdown;q=0.8, text/html;q=0.5', true],
  ['text/markdown;q=0.8, */*;q=1', false],
  ['text/markdown;q=0.8, text/*;q=1', false],
  ['text/markdown;q=0.8, text/html;q=0, */*;q=1', true],
  ['text/markdown;q=0.8, text/*;q=0.5, */*;q=1', true],
  ['text/markdown;q=0, */*;q=1', false],
  ['application/json, text/markdown;q=0.2', true],
]) {
  test(`Accept ${accept ?? '(absent)'} selects ${markdown ? 'Markdown' : 'HTML'}`, async () => {
    const ctx = context({ accept })
    const response = await onRequest(ctx)
    assert.equal(response.status, 200)
    assert.equal(ctx.calls.assets.length, markdown ? 1 : 0)
    assert.equal(ctx.calls.next, markdown ? 0 : 1)
    assert.equal(response.headers.get('Content-Language'), 'en')
    assert.equal(response.headers.get('Cache-Control'), 'no-store')
    assert.equal(response.headers.get('Vary'), 'Accept')
    assert.match(response.headers.get('Content-Type'), markdown ? /^text\/markdown/ : /^text\/html/)
  })
}

test('Turkish Markdown uses its own asset and drops client conditional/range headers and query', async () => {
  const ctx = context({
    path: '/tr/?source=search',
    accept: 'text/markdown',
    headers: { 'If-None-Match': '"html-etag"', 'If-Modified-Since': 'Tue, 06 Oct 2026 00:00:00 GMT', Range: 'bytes=0-10' },
  })
  const response = await onRequest(ctx)
  const assetRequest = ctx.calls.assets[0]
  assert.equal(assetRequest.url, 'https://beratdogan.me/tr.md')
  assert.equal(assetRequest.method, 'GET')
  assert.deepEqual([...assetRequest.headers], [])
  assert.equal(response.headers.get('Content-Location'), '/tr.md')
  assert.equal(response.headers.get('Content-Language'), 'tr')
  assert.equal(response.headers.get('Content-Type'), 'text/markdown; charset=utf-8')
  assert.equal(await response.text(), '# Berat Doğan\n')
})

for (const accept of ['text/html', 'text/markdown']) {
  test(`HEAD ${accept} has the GET representation headers and no body`, async () => {
    const ctx = context({ method: 'HEAD', accept, path: '/tr/' })
    const response = await onRequest(ctx)
    assert.equal(response.body, null)
    assert.equal(await response.text(), '')
    assert.equal(response.headers.get('Content-Language'), 'tr')
    assert.equal(response.headers.get('Cache-Control'), 'no-store')
    if (accept === 'text/markdown') assert.equal(ctx.calls.assets[0].method, 'GET')
  })
}

for (const [vary, expected] of [[null, 'Accept'], ['Accept-Encoding', 'Accept-Encoding, Accept'], ['accept', 'accept'], ['*', '*']]) {
  for (const accept of ['text/html', 'text/markdown']) {
    test(`${accept} preserves Vary ${vary ?? '(absent)'}`, async () => {
      const headers = { 'Content-Type': accept }
      if (vary) headers.Vary = vary
      const source = new Response(accept === 'text/html' ? '<html></html>' : '# Berat', { headers })
      const ctx = context({ accept, ...(accept === 'text/html' ? { html: source } : { asset: source }) })
      const response = await onRequest(ctx)
      assert.equal(response.headers.get('Vary'), expected)
    })
  }
}

for (const [name, createAsset, status] of [
  ['missing asset', () => new Response('Missing', { status: 404 }), 404],
  ['SPA fallback', () => new Response('<!doctype html><html></html>', { headers: { 'Content-Type': 'text/html' } }), 502],
  ['mislabeled SPA fallback', () => new Response('<!DOCTYPE html><html></html>', { headers: { 'Content-Type': 'text/markdown' } }), 502],
  ['empty asset', () => new Response('', { headers: { 'Content-Type': 'text/markdown' } }), 502],
  ['asset redirect', () => new Response(null, { status: 302, headers: { Location: '/' } }), 502],
  ['asset fetch failure', () => new Error('Unavailable'), 502],
]) {
  for (const method of ['GET', 'HEAD']) {
    test(`${method} reports ${name} without falling back to HTML`, async () => {
      const ctx = context({ method, accept: 'text/markdown', asset: createAsset() })
      const response = await onRequest(ctx)
      assert.equal(response.status, status)
      assert.equal(ctx.calls.next, 0)
      assert.equal(response.headers.get('Vary'), 'Accept')
      assert.equal(response.headers.get('Cache-Control'), 'no-store')
      assert.equal(response.headers.get('Content-Language'), 'en')
      assert.equal(await response.text(), method === 'HEAD' ? '' : 'Markdown version unavailable.\n')
    })
  }
}

for (const method of ['GET', 'HEAD']) {
  test(`${method} canonicalizes /tr and preserves the query`, async () => {
    const ctx = context({ method, path: '/tr?utm_source=profile&lang=tr', accept: 'text/markdown' })
    const response = await onRequest(ctx)
    assert.equal(response.status, 308)
    assert.equal(response.headers.get('Location'), 'https://beratdogan.me/tr/?utm_source=profile&lang=tr')
    assert.equal(response.body, null)
    assert.equal(ctx.calls.next, 0)
    assert.equal(ctx.calls.assets.length, 0)
  })
}

for (const [path, method] of [['/', 'POST'], ['/tr', 'POST'], ['/tr/', 'OPTIONS'], ['/en.md', 'GET'], ['/tr.md', 'HEAD'], ['/assets/site.js', 'GET'], ['/missing', 'GET']]) {
  test(`${method} ${path} passes through unchanged`, async () => {
    const ctx = context({ path, method, accept: 'text/markdown' })
    const response = await onRequest(ctx)
    assert.equal(response, ctx.nextResponse)
    assert.equal(ctx.calls.next, 1)
    assert.equal(ctx.calls.assets.length, 0)
  })
}
