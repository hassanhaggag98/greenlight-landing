import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { publicApi } from '@/api/public.api'
import { getStaticServiceBySlug } from '@/data/staticFallbacks'
import { PageHeader, SEO } from '@/components/common'
import { Button, LoadingSpinner } from '@/components/ui'
import { ROUTES } from '@/constants'

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { t } = useTranslation()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['public', 'service', slug],
    queryFn: () => publicApi.getServiceBySlug(slug!),
    enabled: !!slug,
  })

  const service = data ?? (slug ? getStaticServiceBySlug(t, slug) : undefined)

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!service) {
    return (
      <>
        <SEO title={t('notFound.title')} />
        <PageHeader title={t('notFound.title')} subtitle={t('notFound.subtitle')} />
        <div className="mx-auto max-w-xl px-4 py-16 text-center">
          <Link to={ROUTES.services}>
            <Button>{t('notFound.backHome')}</Button>
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <SEO title={service.title} description={service.short_description ?? service.description} />
      <PageHeader
        title={service.title}
        subtitle={service.short_description}
        breadcrumbs={[
          { label: t('nav.services'), href: ROUTES.services },
          { label: service.title },
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="prose prose-neutral max-w-none text-muted">
          <p>{service.description}</p>
          {service.content && !isError && <div dangerouslySetInnerHTML={{ __html: service.content }} />}
        </div>
        <div className="mt-8 flex gap-4">
          <Link to={ROUTES.quote}>
            <Button>{t('quote.title')}</Button>
          </Link>
          <Link to={ROUTES.contact}>
            <Button variant="outline">{t('contact.title')}</Button>
          </Link>
        </div>
      </article>
    </>
  )
}
