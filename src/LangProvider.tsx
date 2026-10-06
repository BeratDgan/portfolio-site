import type { ReactNode } from 'react'
import { dictionaries, I18nContext, type Lang } from './i18n'

export function LangProvider({ children, lang }: { children: ReactNode; lang: Lang }) {
  return (
    <I18nContext.Provider value={{ lang, t: dictionaries[lang] }}>
      {children}
    </I18nContext.Provider>
  )
}
