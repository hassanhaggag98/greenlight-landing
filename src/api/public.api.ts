import apiClient from './axios'
import { unwrap, unwrapList } from './helpers'
import { mapAboutResponse } from './mappers/about.mapper'
import { mapHomeResponse } from './mappers/home.mapper'
import { API_ENDPOINTS } from './endpoints'
import type { SupportedLanguage } from '@/constants'
import type {
  BankingConsultationData,
  BlogPost,
  Certificate,
  ContactFormData,
  Country,
  Faq,
  Industry,
  QuoteRequestData,
  Service,
  Testimonial,
  WebsiteSettings,
} from '@/types/public'
import type { ApiEnvelope } from '@/types/api'

export const publicApi = {
  getSettings: () =>
    apiClient.get<ApiEnvelope<WebsiteSettings>>(API_ENDPOINTS.public.settings).then(unwrap),

  getHome: (locale?: SupportedLanguage) =>
    apiClient
      .get<ApiEnvelope<Parameters<typeof mapHomeResponse>[0]>>(API_ENDPOINTS.public.home)
      .then((response) => mapHomeResponse(unwrap(response), locale)),

  getAbout: () =>
    apiClient
      .get<ApiEnvelope<Parameters<typeof mapAboutResponse>[0]>>(API_ENDPOINTS.public.about)
      .then((response) => mapAboutResponse(unwrap(response))),

  getServices: () =>
    apiClient.get<ApiEnvelope<Service[]>>(API_ENDPOINTS.public.services).then(unwrapList),

  getServiceBySlug: (slug: string) =>
    apiClient
      .get<ApiEnvelope<Service>>(API_ENDPOINTS.public.serviceBySlug(slug))
      .then(unwrap),

  getIndustries: () =>
    apiClient.get<ApiEnvelope<Industry[]>>(API_ENDPOINTS.public.industries).then(unwrapList),

  getCountries: () =>
    apiClient.get<ApiEnvelope<Country[]>>(API_ENDPOINTS.public.countries).then(unwrapList),

  getCertificates: () =>
    apiClient.get<ApiEnvelope<Certificate[]>>(API_ENDPOINTS.public.certificates).then(unwrapList),

  getBlogs: () =>
    apiClient.get<ApiEnvelope<BlogPost[]>>(API_ENDPOINTS.public.blogs).then(unwrapList),

  getBlogBySlug: (slug: string) =>
    apiClient.get<ApiEnvelope<BlogPost>>(API_ENDPOINTS.public.blogBySlug(slug)).then(unwrap),

  getTestimonials: () =>
    apiClient.get<ApiEnvelope<Testimonial[]>>(API_ENDPOINTS.public.testimonials).then(unwrapList),

  getFaqs: () =>
    apiClient.get<ApiEnvelope<Faq[]>>(API_ENDPOINTS.public.faqs).then(unwrapList),

  submitContact: (data: ContactFormData) =>
    apiClient.post(API_ENDPOINTS.public.contact, data),

  submitQuoteRequest: (data: QuoteRequestData) =>
    apiClient.post(API_ENDPOINTS.public.quoteRequest, data),

  submitBankingConsultation: (data: BankingConsultationData) =>
    apiClient.post(API_ENDPOINTS.public.bankingConsultation, data),
}
