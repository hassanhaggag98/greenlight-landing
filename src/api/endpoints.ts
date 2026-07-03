const V1 = '/v1'

export const API_ENDPOINTS = {
  public: {
    settings: `${V1}/public/settings`,
    home: `${V1}/public/home`,
    about: `${V1}/public/about`,
    services: `${V1}/public/services`,
    serviceBySlug: (slug: string) => `${V1}/public/services/${slug}`,
    industries: `${V1}/public/industries`,
    countries: `${V1}/public/countries`,
    certificates: `${V1}/public/certificates`,
    blogs: `${V1}/public/blogs`,
    blogBySlug: (slug: string) => `${V1}/public/blogs/${slug}`,
    testimonials: `${V1}/public/testimonials`,
    faqs: `${V1}/public/faqs`,
    contact: `${V1}/public/contact`,
    quoteRequest: `${V1}/public/quote-request`,
    bankingConsultation: `${V1}/public/banking-consultation-request`,
  },
} as const
