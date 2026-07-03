import i18n from '@/locales/i18n'
import type { BlogPost, Certificate, HomeContent, Service, Stat, Testimonial } from '@/types/public'

type LocalizedText = Record<string, string>

interface RawHeroSection {
  title?: string
  subtitle?: string
  cta_text?: string
  cta_url?: string
}

interface RawHomeApiResponse {
  sections?: {
    hero?: Record<string, RawHeroSection>
    stats?: {
      items?: Array<{
        value?: string | number
        label?: LocalizedText | string
        icon?: string
      }>
    }
    about?: Record<string, { title?: string; description?: string }>
    banking?: Record<string, { title?: string; description?: string; features?: string[] }>
    process?: {
      items?: Array<{
        step?: number
        title?: LocalizedText | string
        description?: LocalizedText | string
      }>
    }
    cta?: Record<string, { title?: string; button?: string }>
  }
  featured_services?: Service[]
  testimonials?: Array<Testimonial & { position?: string }>
  partners?: unknown[]
  certificates?: Certificate[]
  news?: BlogPost[]
  countries?: HomeContent['countries']
}

function pickLocalized(value: LocalizedText | string | undefined, locale: string): string {
  if (!value) return ''
  if (typeof value === 'string') return value
  return value[locale] ?? value.en ?? Object.values(value)[0] ?? ''
}

function parseStatValue(value: string | number | undefined): string | number {
  if (value === undefined || value === null) return 0
  if (typeof value === 'number') return value
  const numeric = parseInt(value.replace(/\D/g, ''), 10)
  return Number.isNaN(numeric) ? value : numeric
}

export function mapHomeResponse(raw: RawHomeApiResponse, locale?: string): HomeContent {
  const lang = locale === 'ar' || i18n.language === 'ar' ? 'ar' : 'en'
  const sections = raw.sections ?? {}
  const heroSection = sections.hero?.[lang] ?? sections.hero?.en

  const stats: Stat[] =
    sections.stats?.items?.map((item, index) => ({
      label: pickLocalized(item.label, lang),
      value: parseStatValue(item.value),
      icon: item.icon ?? ['trending', 'globe', 'shield', 'building'][index % 4],
    })) ?? []

  const aboutSection = sections.about?.[lang] ?? sections.about?.en
  const bankingSection = sections.banking?.[lang] ?? sections.banking?.en

  const process =
    sections.process?.items?.map((item, index) => ({
      step: item.step ?? index + 1,
      title: pickLocalized(item.title, lang),
      description: pickLocalized(item.description, lang),
    })) ?? []

  const testimonials: Testimonial[] =
    raw.testimonials?.map((item) => ({
      ...item,
      role: item.role ?? item.position,
    })) ?? []

  const ctaSection = sections.cta?.[lang] ?? sections.cta?.en

  return {
    hero: heroSection
      ? {
          title: heroSection.title ?? '',
          subtitle: heroSection.subtitle ?? '',
          cta_text: heroSection.cta_text ?? ctaSection?.button,
          cta_link: heroSection.cta_url,
        }
      : undefined,
    stats,
    about_preview: aboutSection
      ? {
          title: aboutSection.title ?? '',
          description: aboutSection.description ?? '',
        }
      : undefined,
    services: raw.featured_services ?? [],
    banking_highlight: bankingSection
      ? {
          title: bankingSection.title ?? '',
          description: bankingSection.description ?? '',
          features: bankingSection.features,
        }
      : undefined,
    process,
    countries: raw.countries,
    certificates: raw.certificates ?? [],
    testimonials,
    news: raw.news ?? [],
  }
}
