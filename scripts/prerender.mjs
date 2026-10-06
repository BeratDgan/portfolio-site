import { build } from 'vite'
import { mkdir, readFile, writeFile } from 'node:fs/promises'

// Use Vite's existing JSX and asset transforms for the exact same React tree.
await build({ build: { ssr: 'src/entry-server.tsx', outDir: 'dist-ssr', copyPublicDir: false } })
const { render, renderLlms, renderSitemap } = await import('../dist-ssr/entry-server.js')
const template = await readFile('dist/index.html', 'utf8')
if (!template.includes('<!--seo-head-->') || !template.includes('<div id="root"></div>')) {
  throw new Error('Prerender template markers are missing')
}
for (const lang of ['en', 'tr']) {
  const { html, head, markdown } = render(lang)
  const page = template.replace('<html lang="en">', `<html lang="${lang}">`)
    .replace('<title>Berat Doğan</title>', '')
    .replace('<!--seo-head-->', head)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
  await mkdir(lang === 'tr' ? 'dist/tr' : 'dist', { recursive: true })
  await writeFile(lang === 'tr' ? 'dist/tr/index.html' : 'dist/index.html', page)
  await writeFile(`dist/${lang}.md`, markdown)
}
await writeFile('dist/sitemap.xml', renderSitemap())
await writeFile('dist/llms.txt', renderLlms())
console.log('Prerendered / and /tr/; generated en.md, tr.md, sitemap.xml and llms.txt')
