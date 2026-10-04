import { useEffect, useState, type ReactNode } from 'react'
import { dictionaries, I18nContext, type Lang } from './i18n'

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem('lang')
      if (saved === 'en' || saved === 'tr') return saved
    } catch {
      // Use the browser language when storage is unavailable.
    }
    return navigator.language.toLowerCase().startsWith('tr') ? 'tr' : 'en'
  })

  useEffect(() => {
    try {
      localStorage.setItem('lang', lang)
    } catch {
      // Language switching still works when storage is unavailable.
    }
    // keeps CSS text-transform: uppercase mapping i → İ correctly in Turkish
    document.documentElement.lang = lang
  }, [lang])

  return (
    <I18nContext.Provider value={{ lang, t: dictionaries[lang], setLang }}>
      {children}
    </I18nContext.Provider>
  )
}

