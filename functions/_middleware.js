function acceptedTypes(accept) {
  return accept.split(',').map((entry) => {
    const [type, ...parameters] = entry.trim().toLowerCase().split(';')
    const quality = parameters.find((parameter) => parameter.trim().startsWith('q='))
    const value = quality ? Number(quality.trim().slice(2)) : 1
    return {
      type: type.trim(),
      quality: Number.isFinite(value) && value >= 0 && value <= 1 ? value : 0,
    }
  })
}

function prefersMarkdown(accept) {
  if (!accept) return false
  const types = acceptedTypes(accept)
  const markdown = types.filter(({ type }) => type === 'text/markdown')
  const markdownQuality = Math.max(0, ...markdown.map(({ quality }) => quality))
  if (!markdownQuality) return false

  // Exact HTML preferences take precedence over broader wildcard preferences.
  for (const type of ['text/html', 'text/*', '*/*']) {
    const matches = types.filter((entry) => entry.type === type)
    if (matches.length) {
      return markdownQuality >= Math.max(...matches.map(({ quality }) => quality))
    }
  }
  return true
}

function negotiatedHeaders(source, language) {
  const headers = new Headers(source)
  const vary = headers.get('Vary')
  const fields = vary?.split(',').map((field) => field.trim().toLowerCase()) ?? []
  if (!fields.includes('*') && !fields.includes('accept')) {
    headers.set('Vary', vary ? `${vary}, Accept` : 'Accept')
  }
  headers.set('Content-Language', language)
  headers.set('Cache-Control', 'no-store')
  return headers
}

function unavailable(language, head, status = 502) {
  const headers = negotiatedHeaders({ 'Content-Type': 'text/plain; charset=utf-8' }, language)
  return new Response(head ? null : 'Markdown version unavailable.\n', { status, headers })
}

export async function onRequest(context) {
  const { request } = context
  if (request.method !== 'GET' && request.method !== 'HEAD') return context.next()

  const url = new URL(request.url)
  if (url.pathname === '/tr') {
    url.pathname = '/tr/'
    return new Response(null, { status: 308, headers: { Location: url.href } })
  }
  if (url.pathname !== '/' && url.pathname !== '/tr/') return context.next()

  const language = url.pathname === '/tr/' ? 'tr' : 'en'
  const head = request.method === 'HEAD'
  if (!prefersMarkdown(request.headers.get('Accept'))) {
    const response = await context.next()
    return new Response(head ? null : response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: negotiatedHeaders(response.headers, language),
    })
  }

  const location = `/${language}.md`
  let asset
  let markdown
  try {
    // A fresh GET also lets HEAD validate the representation. Client validators
    // and Range describe the document URL, not this different static asset.
    asset = await context.env.ASSETS.fetch(new Request(new URL(location, url), { method: 'GET' }))
    if (asset.status !== 200) {
      return unavailable(language, head, asset.status >= 400 ? asset.status : 502)
    }
    const type = asset.headers.get('Content-Type')?.split(';')[0].trim().toLowerCase()
    if (type !== 'text/markdown' && type !== 'text/plain') return unavailable(language, head)
    markdown = await asset.text()
    // Pages can return the SPA HTML fallback with a 200 when an asset is missing.
    if (!markdown.trim() || /^\s*(?:<!doctype\s+html\b|<html\b)/i.test(markdown)) {
      return unavailable(language, head)
    }
  } catch {
    return unavailable(language, head)
  }

  const headers = negotiatedHeaders(asset.headers, language)
  headers.set('Content-Type', 'text/markdown; charset=utf-8')
  headers.set('Content-Location', location)
  // The new response serializes decoded text as UTF-8.
  headers.delete('Content-Length')
  headers.delete('Content-Encoding')
  return new Response(head ? null : markdown, { headers })
}
