// Previews the archived layout without overwriting the current supplied CVs.
// Run from the repo root: node cv/render-pdf.mjs
import { chromium } from 'playwright'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const dir = path.dirname(fileURLToPath(import.meta.url))
const browser = await chromium.launch()
const page = await browser.newPage()
await page.goto('file://' + path.join(dir, 'cv.html'))
await page.pdf({
  path: path.join(dir, 'legacy-preview.pdf'),
  format: 'A4',
  printBackground: true,
})
await browser.close()
console.log('written: cv/legacy-preview.pdf (archived layout)')
