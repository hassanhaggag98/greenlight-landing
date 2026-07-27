import { CONTACT_EMAIL } from '@/constants'

type MailtoFields = Record<string, string | undefined>

export function buildMailtoLink(subject: string, fields: MailtoFields) {
  const body = Object.entries(fields)
    .map(([label, value]) => `${label}: ${value?.trim() || '—'}`)
    .join('\n')

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function openMailto(subject: string, fields: MailtoFields) {
  window.location.href = buildMailtoLink(subject, fields)
}
