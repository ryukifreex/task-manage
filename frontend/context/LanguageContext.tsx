import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import i18n from '../i18n'

// Context
const LanguageContext = createContext<{ language: string } | undefined>(undefined)

// Provider
export const LanguageProvider = ({ children }) => {
  const router = useRouter()
  const [language, setLanguage] = useState(i18n.language)

  useEffect(() => {
    if (router.locale !== language) {
      i18n.changeLanguage(router.locale)
      setLanguage(router.locale)
    }
  }, [router.locale, language])

  const value = useMemo(() => ({ language }), [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

// Contextのhook
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be within a LanguageProvider')
  }
  return context
}
