import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { PageTransition, PublicLayout } from '@/components/layout'
import { LoadingSpinner } from '@/components/ui'
import { ROUTES } from '@/constants'

const HomePage = lazy(() => import('@/pages/public/HomePage'))
const AboutPage = lazy(() => import('@/pages/public/AboutPage'))
const ServicesPage = lazy(() => import('@/pages/public/ServicesPage'))
const ServiceDetailPage = lazy(() => import('@/pages/public/ServiceDetailPage'))
const IndustriesPage = lazy(() => import('@/pages/public/IndustriesPage'))
const LogisticsPage = lazy(() => import('@/pages/public/LogisticsPage'))
const BankingConsultingPage = lazy(() => import('@/pages/public/BankingConsultingPage'))
const CertificatesPage = lazy(() => import('@/pages/public/CertificatesPage'))
const NewsPage = lazy(() => import('@/pages/public/NewsPage'))
const NewsDetailPage = lazy(() => import('@/pages/public/NewsDetailPage'))
const ContactPage = lazy(() => import('@/pages/public/ContactPage'))
const RequestQuotePage = lazy(() => import('@/pages/public/RequestQuotePage'))
const PrivacyPolicyPage = lazy(() => import('@/pages/public/PrivacyPolicyPage'))
const TermsPage = lazy(() => import('@/pages/public/TermsPage'))
const NotFoundPage = lazy(() => import('@/pages/public/NotFoundPage'))

function PageLoader() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  )
}

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route element={<PageTransition />}>
            <Route index element={<HomePage />} />
            <Route path={ROUTES.about} element={<AboutPage />} />
            <Route path={ROUTES.services} element={<ServicesPage />} />
            <Route path={ROUTES.serviceDetail} element={<ServiceDetailPage />} />
            <Route path={ROUTES.industries} element={<IndustriesPage />} />
            <Route path={ROUTES.logistics} element={<LogisticsPage />} />
            <Route path={ROUTES.banking} element={<BankingConsultingPage />} />
            <Route path={ROUTES.certificates} element={<CertificatesPage />} />
            <Route path={ROUTES.news} element={<NewsPage />} />
            <Route path={ROUTES.newsDetail} element={<NewsDetailPage />} />
            <Route path={ROUTES.contact} element={<ContactPage />} />
            <Route path={ROUTES.quote} element={<RequestQuotePage />} />
            <Route path={ROUTES.privacy} element={<PrivacyPolicyPage />} />
            <Route path={ROUTES.terms} element={<TermsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  )
}
