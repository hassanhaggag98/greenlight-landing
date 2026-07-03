import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import i18n from 'i18next'
import {
  DEFAULT_LANGUAGE,
  STORAGE_KEYS,
  type SupportedLanguage,
} from '@/constants'

interface LanguageState {
  language: SupportedLanguage
  setLanguage: (language: SupportedLanguage) => void
}

function applyLanguage(language: SupportedLanguage) {
  const dir = language === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.lang = language
  document.documentElement.dir = dir
  void i18n.changeLanguage(language)
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: DEFAULT_LANGUAGE,
      setLanguage: (language) => {
        applyLanguage(language)
        set({ language })
      },
    }),
    {
      name: STORAGE_KEYS.language,
      onRehydrateStorage: () => (state) => {
        if (state) applyLanguage(state.language)
      },
    },
  ),
)
