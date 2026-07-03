import type { BaseEntity } from './api'

export interface Service extends BaseEntity {
  title: string
  slug: string
  description?: string
  short_description?: string
  content?: string
  icon?: string
  image?: string
  is_featured?: boolean
}

export interface Industry extends BaseEntity {
  name: string
  slug: string
  description?: string
  icon?: string
  image?: string
}

export interface Country extends BaseEntity {
  name: string
  code: string
  flag?: string
}

export interface Certificate extends BaseEntity {
  title: string
  description?: string
  image?: string
  issuer?: string
  issued_at?: string
}

export interface BlogPost extends BaseEntity {
  title: string
  slug: string
  excerpt?: string
  content?: string
  featured_image?: string
  published_at?: string
  category?: BlogCategory
  author?: { name: string }
}

export interface BlogCategory extends BaseEntity {
  name: string
  slug: string
}

export interface Testimonial extends BaseEntity {
  name: string
  role?: string
  company?: string
  content: string
  avatar?: string
  rating?: number
}

export interface Faq extends BaseEntity {
  question: string
  answer: string
  category?: string
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface QuoteRequestData {
  name: string
  email: string
  phone?: string
  company?: string
  service_id?: number
  message: string
}

export interface BankingConsultationData {
  name: string
  email: string
  phone: string
  company?: string
  message: string
}

export interface AboutContent {
  title: string
  description: string
  mission: string
  vision: string
  values?: { title: string; description: string }[]
  team_preview?: { name: string; role: string; image?: string }[]
}

export interface Stat {
  label: string
  value: string | number
  icon?: string
}

export interface HomeContent {
  hero?: {
    title: string
    subtitle: string
    cta_text?: string
    cta_link?: string
    image?: string
  }
  stats?: Stat[]
  about_preview?: { title: string; description: string; image?: string }
  services?: Service[]
  banking_highlight?: { title: string; description: string; features?: string[] }
  process?: { step: number; title: string; description: string }[]
  countries?: Country[]
  certificates?: Certificate[]
  testimonials?: Testimonial[]
  news?: BlogPost[]
}

export interface WebsiteSettings {
  site_name?: string
  contact_email?: string
  contact_phone?: string
  address?: string
  social_links?: Record<string, string>
}
