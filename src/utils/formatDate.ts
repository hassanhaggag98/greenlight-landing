export function formatDate(
  value: string | undefined,
  locale: string,
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' },
): string {
  if (!value) return ''

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  const intlLocale = locale === 'ar' ? 'ar-EG' : 'en-US'
  return new Intl.DateTimeFormat(intlLocale, options).format(date)
}
