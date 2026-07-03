import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { publicApi } from '@/api/public.api'
import { PageHeader, SEO } from '@/components/common'
import { ErrorState, LoadingSpinner } from '@/components/ui'
import { ROUTES } from '@/constants'
import { formatDate } from '@/utils/formatDate'

export default function NewsDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { t, i18n } = useTranslation()

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['public', 'blog', slug, i18n.language],
    queryFn: () => publicApi.getBlogBySlug(slug!),
    enabled: !!slug,
  })

  if (isLoading) return <div className="flex min-h-[40vh] items-center justify-center"><LoadingSpinner size="lg" /></div>
  if (isError || !data) return <ErrorState onRetry={() => refetch()} />

  return (
    <>
      <SEO title={data.title} description={data.excerpt} />
      <PageHeader
        title={data.title}
        subtitle={formatDate(data.published_at, i18n.language)}
        breadcrumbs={[
          { label: t('nav.news'), href: ROUTES.news },
          { label: data.title },
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        {data.excerpt && <p className="text-lg text-muted">{data.excerpt}</p>}
        <div className="prose prose-neutral mt-6 max-w-none text-muted">
          {data.content ? (
            <div dangerouslySetInnerHTML={{ __html: data.content }} />
          ) : (
            <p>{data.excerpt}</p>
          )}
        </div>
        <Link to={ROUTES.news} className="mt-8 inline-block text-sm text-primary-green hover:underline">
          ← {t('common.back')}
        </Link>
      </article>
    </>
  )
}
