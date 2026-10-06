import { renderToString } from 'react-dom/server'
import App from './App'
import { dictionaries, type Lang } from './i18n'
import { renderHead, renderMarkdown, renderSitemap, renderLlms } from './seo'

export function render(lang: Lang) {
  return {
    html: renderToString(<App lang={lang} />),
    head: renderHead(lang),
    markdown: renderMarkdown(lang),
  }
}

export { dictionaries, renderSitemap, renderLlms }
