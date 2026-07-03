import { useTranslation } from 'react-i18next'
import { useLanguageStore } from '@/store/languageStore'
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from '@/constants'
import { cn } from '@/utils/cn'

interface LanguageSwitcherProps {
  className?: string
  variant?: 'toggle' | 'select'
}

export function LanguageSwitcher({ className, variant = 'toggle' }: LanguageSwitcherProps) {
  const { t } = useTranslation()
  const { language, setLanguage } = useLanguageStore()

  if (variant === 'select') {
    return (
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
        className={cn(
          'h-9 rounded-lg border border-border bg-surface-elevated px-2 text-sm text-foreground',
          className,
        )}
        aria-label={language === 'ar' ? t('language.switchToEn') : t('language.switchToAr')}
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option key={lang} value={lang}>
            {t(`language.${lang}`)}
          </option>
        ))}
      </select>
    )
  }

  const next: SupportedLanguage = language === 'en' ? 'ar' : 'en'
  const label = next === 'ar' ? t('language.switchToAr') : t('language.switchToEn')

  return (
    <button
      type="button"
      onClick={() => setLanguage(next)}
      className={cn(
        'min-w-[4.5rem] rounded-lg border border-border bg-surface-elevated px-2.5 py-1.5 text-sm font-semibold text-foreground transition-colors hover:border-primary-green/40 hover:bg-accent-soft',
        className,
      )}
      aria-label={label}
      title={label}
    >
      {label}
    </button>
  )
}
