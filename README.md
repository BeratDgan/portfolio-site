# Berat Doğan — Portfolio

Bilingual personal portfolio built with React, TypeScript and Vite, hosted on Cloudflare Pages.

## Local development

```sh
npm ci
npm run dev
```

`npm run build` checks TypeScript and creates the production site in `dist/`.
`npm run lint` checks the source with Oxlint.

## Content and CVs

- English and Turkish copy lives in `src/i18n.tsx`.
- Current supplied CVs are `public/Berat_Dogan_CV.pdf` (English) and `public/Berat_Dogan_CV_TR.pdf` (Turkish). Both are one page. Downloads follow the selected site language.
- `cv/cv.html` is an archived layout, not the source for these PDFs. Its optional preview script writes to `cv/legacy-preview.pdf` so it cannot overwrite current downloads.
- Keep project descriptions and `public/llms.txt` aligned when changing experience. Preserve the distinction between internship/lab work and production deployments.

## Deployment

Pushing to the connected deployment branch updates the live site. Review locally before pushing; creating a local commit does not deploy.
