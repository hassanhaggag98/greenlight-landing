import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, type ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import '@/locales/i18n'
import { useLanguageStore } from '@/store/languageStore'
import { useThemeStore } from '@/store/themeStore'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

function ThemeSync({ children }: { children: ReactNode }) {
  const theme = useThemeStore((s) => s.theme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return <>{children}</>
}

function LanguageSync({ children }: { children: ReactNode }) {
  const language = useLanguageStore((s) => s.language)
  const setLanguage = useLanguageStore((s) => s.setLanguage)
  const queryClient = useQueryClient()
  const prevLanguage = useRef(language)

  useEffect(() => {
    setLanguage(language)
  }, [language, setLanguage])

  useEffect(() => {
    if (prevLanguage.current !== language) {
      prevLanguage.current = language
      void queryClient.invalidateQueries({ queryKey: ['public'] })
    }
  }, [language, queryClient])

  return <>{children}</>
}

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeSync>
          <LanguageSync>
            {children}
            <Toaster
              position="top-center"
              toastOptions={{
                className: 'text-sm',
                style: {
                  background: 'var(--surface-elevated)',
                  color: 'var(--foreground)',
                  border: '1px solid var(--border)',
                },
              }}
            />
          </LanguageSync>
        </ThemeSync>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
