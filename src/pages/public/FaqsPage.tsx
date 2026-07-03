import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { publicApi } from '@/api/public.api'
import { getStaticFaqs } from '@/data/staticFallbacks'
import { PageHeader, SEO } from '@/components/common'
import { Accordion, LoadingSpinner } from '@/components/ui'
import { ROUTES } from '@/constants'

export default function FaqsPage() {
  const { t, i18n } = useTranslation()
  const fallback = getStaticFaqs(t)
  const { data = [], isLoading, isError } = useQuery({
    queryKey: ['public', 'faqs', i18n.language],
    queryFn: () => publicApi.getFaqs(),
  })

  const faqs = isError || data.length === 0 ? fallback : data

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  const items = faqs.map((faq) => ({
    id: String(faq.id),
    title: faq.question,
    content: faq.answer,
  }))

  return (
    <>
      <SEO title={t('faqs.title')} description={t('faqs.subtitle')} />
      <PageHeader
        title={t('faqs.title')}
        subtitle={t('faqs.subtitle')}
        breadcrumbs={[{ label: t('nav.faqs'), href: ROUTES.faqs }]}
      />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Accordion items={items} defaultOpen={items[0]?.id} />
      </div>
    </>
  )
}
