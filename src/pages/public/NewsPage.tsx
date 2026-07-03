import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { ArrowRight } from 'lucide-react'
import { publicApi } from '@/api/public.api'
import { PageHeader, SEO } from '@/components/common'
import { Card, CardContent, CardDescription, CardTitle, EmptyState, ErrorState, LoadingSpinner } from '@/components/ui'
import { ROUTES } from '@/constants'
import { formatDate } from '@/utils/formatDate'

export default function NewsPage() {
  const { t, i18n } = useTranslation()
  const { data = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['public', 'blogs', i18n.language],
    queryFn: () => publicApi.getBlogs(),
  })

  if (isLoading) return <div className="flex min-h-[40vh] items-center justify-center"><LoadingSpinner size="lg" /></div>
  if (isError) return <ErrorState onRetry={() => refetch()} />

  return (
    <>
      <SEO title={t('news.title')} description={t('news.subtitle')} />
      <PageHeader title={t('news.title')} subtitle={t('news.subtitle')} breadcrumbs={[{ label: t('nav.news'), href: ROUTES.news }]} />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {data.length === 0 ? <EmptyState title={t('common.noResults')} /> : (
          <div className="grid gap-6 sm:grid-cols-2">
            {data.map((post) => (
              <Card key={post.id} className="transition-shadow hover:shadow-[var(--shadow-md)]">
                <CardContent className="pt-6">
                  <p className="text-xs text-muted">{formatDate(post.published_at, i18n.language)}</p>
                  <CardTitle className="mt-2">{post.title}</CardTitle>
                  <CardDescription className="mt-2">{post.excerpt ?? t('news.cardExcerpt')}</CardDescription>
                  <Link to={`/news/${post.slug}`} className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-green">
                    {t('common.learnMore')} <ArrowRight className="size-3" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
