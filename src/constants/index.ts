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
  faqs: '/faqs',
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
export const CONTACT_WEBSITE = 'www.greenlight-eg.com'
export const CONTACT_WEBSITE_URL = 'https://www.greenlight-eg.com'

export const CONTACT_PHONES = [
  { display: '01000307992', tel: '+201000307992' },
  { display: '01203004406', tel: '+201203004406' },
  { display: '01551660168', tel: '+201551660168' },
] as const

export const WHATSAPP_NUMBER = '201002974960'
export const WHATSAPP_DISPLAY = '01000307992'

export const CONTACT_MAPS_URL = 'https://maps.app.goo.gl/grz1q8EjoZ4Tqmmq5'

export const DASHBOARD_URL = import.meta.env.VITE_DASHBOARD_URL ?? ''
