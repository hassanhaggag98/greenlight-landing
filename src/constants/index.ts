export const ROUTES = {
  home: '/',
  about: '/about',
  services: '/services',
  serviceDetail: '/services/:slug',
  industries: '/industries',
  logistics: '/logistics',
  banking: '/banking-consulting',
  certificates: '/certificates',
  news: '/news',
  newsDetail: '/news/:slug',
  contact: '/contact',
  quote: '/request-quote',
  privacy: '/privacy-policy',
  terms: '/terms-and-conditions',
} as const

export const STORAGE_KEYS = {
  theme: 'glg_theme',
  language: 'glg_language',
} as const

export const SUPPORTED_LANGUAGES = ['en', 'ar'] as const
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]

export const DEFAULT_LANGUAGE: SupportedLanguage = 'ar'

export { DEFAULT_DIAL_COUNTRY, DIAL_CODES } from './dialCodes'

export const CONTACT_EMAIL = 'info@greenlight-eg.com'
export const CONTACT_PHONE = '+20 100 030 7992'
export const CONTACT_PHONE_TEL = '+201000307992'
export const WHATSAPP_NUMBER = '201000307992'

export const DASHBOARD_URL = import.meta.env.VITE_DASHBOARD_URL ?? ''
