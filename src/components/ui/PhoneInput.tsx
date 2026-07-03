import { useEffect, useId, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/utils/cn'
import {
  DEFAULT_DIAL_COUNTRY,
  DIAL_CODES,
  formatPhoneValue,
  getDialCountry,
  parsePhoneValue,
} from '@/constants/dialCodes'
import { useLanguageStore } from '@/store/languageStore'

export interface PhoneInputProps {
  label?: string
  error?: string
  value?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  name?: string
  disabled?: boolean
  defaultCountry?: string
  className?: string
}

const fieldClassName = cn(
  'h-10 rounded-lg border border-border bg-surface text-sm text-foreground',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]',
  'disabled:cursor-not-allowed disabled:opacity-50',
)

export function PhoneInput({
  label,
  error,
  value = '',
  onChange,
  onBlur,
  name,
  disabled,
  defaultCountry = DEFAULT_DIAL_COUNTRY,
  className,
}: PhoneInputProps) {
  const { t } = useTranslation()
  const inputId = useId()
  const language = useLanguageStore((s) => s.language)
  const parsed = useMemo(() => parsePhoneValue(value, defaultCountry), [value, defaultCountry])

  const [countryIso, setCountryIso] = useState(parsed.iso)
  const [national, setNational] = useState(parsed.national)

  useEffect(() => {
    setCountryIso(parsed.iso)
    setNational(parsed.national)
  }, [parsed.iso, parsed.national])

  const selectedCountry = getDialCountry(countryIso)

  const emitChange = (iso: string, nextNational: string) => {
    onChange?.(formatPhoneValue(iso, nextNational))
  }

  const handleCountryChange = (iso: string) => {
    setCountryIso(iso)
    emitChange(iso, national)
  }

  const handleNationalChange = (nextNational: string) => {
    const digits = nextNational.replace(/\D/g, '')
    setNational(digits)
    emitChange(countryIso, digits)
  }

  return (
    <div className={cn('w-full space-y-1.5', className)}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-foreground">
          {label}
        </label>
      )}

      <div className="flex gap-2" dir="ltr">
        <select
          aria-label={label ? `${label} ${t('a11y.countryCode')}` : t('a11y.countryCode')}
          value={countryIso}
          disabled={disabled}
          onChange={(event) => handleCountryChange(event.target.value)}
          onBlur={onBlur}
          className={cn(
            fieldClassName,
            'w-[8.75rem] shrink-0 cursor-pointer px-2 sm:w-[10.5rem] sm:px-2.5',
            error && 'border-red-500 focus-visible:ring-red-500/30',
          )}
        >
          {DIAL_CODES.map((country) => (
            <option key={country.iso} value={country.iso}>
              {country.flag} +{country.dial} {language === 'ar' ? country.nameAr : country.nameEn}
            </option>
          ))}
        </select>

        <input
          id={inputId}
          name={name}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          disabled={disabled}
          value={national}
          placeholder={selectedCountry.placeholder}
          onChange={(event) => handleNationalChange(event.target.value)}
          onBlur={onBlur}
          className={cn(
            fieldClassName,
            'min-w-0 flex-1 px-3 py-2 placeholder:text-muted',
            error && 'border-red-500 focus-visible:ring-red-500/30',
          )}
        />
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
