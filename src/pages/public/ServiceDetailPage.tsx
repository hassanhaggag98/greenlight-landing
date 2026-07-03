import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { publicApi } from '@/api/public.api'
import { PageHeader, SEO } from '@/components/common'
import { Button, ErrorState, LoadingSpinner } from '@/components/ui'
import { ROUTES } from '@/constants'

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { t } = useTranslation()

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['public', 'service', slug],
    queryFn: () => publicApi.getServiceBySlug(slug!),
    enabled: !!slug,
  })

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (isError || !data) {
    return <ErrorState onRetry={() => refetch()} />
  }

  return (
    <>
      <SEO title={data.title} description={data.short_description ?? data.description} />
      <PageHeader
        title={data.title}
        subtitle={data.short_description}
        breadcrumbs={[
          { label: t('nav.services'), href: ROUTES.services },
          { label: data.title },
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="prose prose-neutral max-w-none text-muted">
          <p>{data.description}</p>
          {data.content && <div dangerouslySetInnerHTML={{ __html: data.content }} />}
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
