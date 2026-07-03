// Renders cv/cv.html to public/Berat_Dogan_CV.pdf.
// Run from the repo root: node cv/render-pdf.mjs
import { chromium } from 'playwright'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const dir = path.dirname(fileURLToPath(import.meta.url))
const browser = await chromium.launch()
const page = await browser.newPage()
await page.goto('file://' + path.join(dir, 'cv.html'))
await page.pdf({
  path: path.join(dir, '../public/Berat_Dogan_CV.pdf'),
  format: 'A4',
  printBackground: true,
})
await browser.close()
console.log('written: public/Berat_Dogan_CV.pdf')
