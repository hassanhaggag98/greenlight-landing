import type { TFunction } from 'i18next'
import type { AboutContent, BlogPost, Certificate, Faq, Industry, Service } from '@/types/public'

export function getStaticAbout(t: TFunction): AboutContent {
  return {
    title: t('about.title'),
    description: t('about.subtitle'),
    mission: t('about.missionText'),
    vision: t('about.visionText'),
  }
}

export function getStaticServices(t: TFunction): Service[] {
  return [
    {
      id: 1,
      title: t('home.fallbackService1Title'),
      slug: 'international-trade',
      short_description: t('home.fallbackService1Desc'),
      description: t('home.fallbackService1Desc'),
    },
    {
      id: 2,
      title: t('home.fallbackService2Title'),
      slug: 'logistics-services',
      short_description: t('home.fallbackService2Desc'),
      description: t('home.fallbackService2Desc'),
    },
    {
      id: 3,
      title: t('home.fallbackService3Title'),
      slug: 'factory-raw-materials-import',
      short_description: t('home.fallbackService3Desc'),
      description: t('home.fallbackService3Desc'),
    },
    {
      id: 4,
      title: t('home.fallbackService4Title'),
      slug: 'detergent-factory-construction',
      short_description: t('home.fallbackService4Desc'),
      description: t('home.fallbackService4Desc'),
    },
  ]
}

export function getStaticIndustries(t: TFunction): Industry[] {
  return [
    {
      id: 1,
      name: t('industries.fallback1Name'),
      slug: 'food-beverage',
      description: t('industries.fallback1Desc'),
    },
    {
      id: 2,
      name: t('industries.fallback2Name'),
      slug: 'construction',
      description: t('industries.fallback2Desc'),
    },
    {
      id: 3,
      name: t('industries.fallback3Name'),
      slug: 'industrial',
      description: t('industries.fallback3Desc'),
    },
  ]
}

export function getStaticCertificates(t: TFunction): Certificate[] {
  return [
    { id: 1, title: t('home.fallbackCert1') },
    { id: 2, title: t('home.fallbackCert2') },
    { id: 3, title: t('home.fallbackCert3') },
    { id: 4, title: t('home.fallbackCert4') },
  ]
}

export function getStaticNewsPosts(t: TFunction): BlogPost[] {
  return [
    {
      id: 1,
      title: t('home.fallbackNews1Title'),
      slug: 'customs-update-2026',
      excerpt: t('home.fallbackNews1Excerpt'),
      content: t('home.fallbackNews1Excerpt'),
      published_at: '2026-01-15',
    },
    {
      id: 2,
      title: t('home.fallbackNews2Title'),
      slug: 'shipping-rates-egypt',
      excerpt: t('home.fallbackNews2Excerpt'),
      content: t('home.fallbackNews2Excerpt'),
      published_at: '2026-02-01',
    },
  ]
}

export function getStaticServiceBySlug(t: TFunction, slug: string): Service | undefined {
  return getStaticServices(t).find((service) => service.slug === slug)
}

export function getStaticNewsBySlug(t: TFunction, slug: string): BlogPost | undefined {
  return getStaticNewsPosts(t).find((post) => post.slug === slug)
}

export function getStaticFaqs(t: TFunction): Faq[] {
  return [1, 2, 3, 4, 5, 6, 7].map((index) => ({
    id: index,
    question: t(`faqs.item${index}Question`),
    answer: t(`faqs.item${index}Answer`),
  }))
}
