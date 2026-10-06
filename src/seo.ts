import { dictionaries, type Lang } from './i18n'
import { CERTIFICATES, FEATURED_REPO, GROUP_ITEMS, LANGUAGE_PATHS, LINKS, MARKDOWN_PATHS, PROJECTS, SITE_URL } from './content'
import portrait from './assets/portrait.jpg'

const metadata = {
  en: {
    title: 'Berat Doğan | Cloud & DevOps Engineer Intern',
    description: 'Berat Doğan, DevOps Engineer Intern at Soliner and software engineering student. Kubernetes, Terraform, GitOps and cloud projects on Azure and AWS.',
    locale: 'en_US',
    imageAlt: 'Berat Doğan — Cloud, DevOps & Platform Engineering',
  },
  tr: {
    title: 'Berat Doğan | Bulut ve DevOps Mühendisi Stajyeri',
    description: 'Berat Doğan, Soliner’de DevOps stajyeri ve Fırat Üniversitesi yazılım mühendisliği öğrencisi. Kubernetes, Terraform, GitOps, Azure ve AWS projeleri.',
    locale: 'tr_TR',
    imageAlt: 'Berat Doğan — Bulut, DevOps ve Platform Mühendisliği',
  },
} as const

const escape = (value: string) => value.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]!)
const absolute = (path: string) => new URL(path, SITE_URL).href
const languages: Lang[] = ['en', 'tr']

export function renderHead(lang: Lang) {
  const meta = metadata[lang]
  const t = dictionaries[lang]
  const url = absolute(LANGUAGE_PATHS[lang])
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Berat Doğan',
        alternateName: 'Berat Dogan',
        url: `${SITE_URL}/`,
        image: absolute(portrait),
        jobTitle: t.experience.role,
        description: meta.description,
        worksFor: { '@type': 'Organization', name: t.experience.company },
        sameAs: LINKS.map(([, href]) => href),
        knowsAbout: GROUP_ITEMS.flat(),
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: 'Berat Doğan',
        inLanguage: languages,
        author: { '@id': `${SITE_URL}/#person` },
      },
    ],
  }
  return `
    <title>${escape(meta.title)}</title>
    <meta name="description" content="${escape(meta.description)}" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${url}" />
    ${languages.map((l) => `<link rel="alternate" hreflang="${l}" href="${absolute(LANGUAGE_PATHS[l])}" />`).join('\n    ')}
    <link rel="alternate" hreflang="x-default" href="${SITE_URL}/" />
    <link rel="alternate" type="text/markdown" href="${absolute(MARKDOWN_PATHS[lang])}" title="${lang === 'tr' ? 'Türkçe' : 'English'} Markdown" />
    <meta property="og:title" content="${escape(meta.title)}" />
    <meta property="og:description" content="${escape(meta.description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url}" />
    <meta property="og:site_name" content="Berat Doğan" />
    <meta property="og:locale" content="${meta.locale}" />
    <meta property="og:locale:alternate" content="${metadata[lang === 'en' ? 'tr' : 'en'].locale}" />
    <meta property="og:image" content="${SITE_URL}/og.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escape(meta.imageAlt)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escape(meta.title)}" />
    <meta name="twitter:description" content="${escape(meta.description)}" />
    <meta name="twitter:image" content="${SITE_URL}/og.png" />
    <meta name="twitter:image:alt" content="${escape(meta.imageAlt)}" />
    <script type="application/ld+json">${JSON.stringify(graph).replace(/</g, '\\u003c')}</script>`
}

export function renderMarkdown(lang: Lang) {
  const t = dictionaries[lang]
  const lines = [
    '# Berat Doğan', '',
    `${t.hero.roleA} / ${t.hero.roleB} / ${t.hero.roleC}`, '',
    t.hero.blurb, '',
    `[${lang === 'tr' ? 'Web sitesi' : 'Website'}](${absolute(LANGUAGE_PATHS[lang])})`, '',
    `## ${t.nav.about}`, '',
    t.about.p1.join(''), '', t.about.p2.join(''), '',
    ...t.about.facts.map(([label, value]) => `- ${label}: ${value}`), '',
    `## ${t.nav.experience}`, '',
    `### ${t.experience.company} — ${t.experience.role}`, '',
    t.experience.period, '', t.experience.summary, '',
    ...t.experience.bullets.map((item) => `- ${item}`), '',
    `${t.experience.exposureLabel}: ${t.experience.exposure}`, '',
    `## ${t.nav.projects}`, '',
    `### ${t.projects.featured.name}`, '',
    t.projects.featured.context, '', t.projects.featured.description, '',
    ...t.projects.featured.details.flatMap((detail) => [`#### ${detail.title}`, '', detail.body, '']),
    `[GitHub](${FEATURED_REPO})`, '',
  ]
  PROJECTS.forEach((project, i) => {
    lines.push(`### ${project.name}`, '', t.projects.items[i].role, '', t.projects.items[i].description, '', project.tags.join(' / '), '', `[GitHub](${project.repo})`, '')
    if ('huggingface' in project) lines.push(`[Hugging Face](${project.huggingface})`, '')
  })
  lines.push(`## ${t.stack.title}`, '')
  GROUP_ITEMS.forEach((items, i) => lines.push(`### ${t.stack.groups[i]}`, '', ...items.map((item) => `- ${item}`), ''))
  lines.push(`## ${t.path.education}`, '')
  t.path.entries.forEach((entry) => lines.push(`### ${entry.place}`, '', entry.period, '', entry.detail, ''))
  lines.push(`## ${t.path.certificates}`, '', ...CERTIFICATES.map(([name, issuer]) => `- ${name} — ${issuer}`), '', `## ${t.nav.contact}`, '',
    '- [dgan.berat@gmail.com](mailto:dgan.berat@gmail.com)',
    ...LINKS.map(([label, href]) => `- [${label}](${href})`),
    `- [${t.contact.cvTitle} — ${t.contact.cvMeta}](${SITE_URL}/${lang === 'tr' ? 'Berat_Dogan_CV_TR.pdf' : 'Berat_Dogan_CV.pdf'})`, '')
  return lines.join('\n')
}

export function renderSitemap() {
  const alternates = [...languages.map((lang) => [lang, LANGUAGE_PATHS[lang]]), ['x-default', '/']]
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${languages.map((lang) => `  <url>
    <loc>${absolute(LANGUAGE_PATHS[lang])}</loc>
${alternates.map(([l, path]) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${absolute(path)}" />`).join('\n')}
  </url>`).join('\n')}
</urlset>
`
}

export function renderLlms() {
  return `# Berat Doğan

> ${metadata.en.description}

## Portfolio

- [English](${SITE_URL}/)
- [Türkçe](${SITE_URL}/tr/)
- [English Markdown](${SITE_URL}/en.md)
- [Türkçe Markdown](${SITE_URL}/tr.md)

## Profiles

${LINKS.map(([label, href]) => `- [${label}](${href})`).join('\n')}

The HTML pages and Markdown files are generated from the same portfolio content.
Request either page with Accept: text/markdown to receive its Markdown representation.
`
}
