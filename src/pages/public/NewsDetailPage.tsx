import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { publicApi } from '@/api/public.api'
import { getStaticNewsBySlug } from '@/data/staticFallbacks'
import { PageHeader, SEO } from '@/components/common'
import { Button, LoadingSpinner } from '@/components/ui'
import { ROUTES } from '@/constants'
import { formatDate } from '@/utils/formatDate'

export default function NewsDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { t, i18n } = useTranslation()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['public', 'blog', slug, i18n.language],
    queryFn: () => publicApi.getBlogBySlug(slug!),
    enabled: !!slug,
  })

  const post = data ?? (slug ? getStaticNewsBySlug(t, slug) : undefined)

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!post) {
    return (
      <>
        <SEO title={t('notFound.title')} />
        <PageHeader title={t('notFound.title')} subtitle={t('notFound.subtitle')} />
        <div className="mx-auto max-w-xl px-4 py-16 text-center">
          <Link to={ROUTES.news}>
            <Button>{t('common.back')}</Button>
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <SEO title={post.title} description={post.excerpt} />
      <PageHeader
        title={post.title}
        subtitle={formatDate(post.published_at, i18n.language)}
        breadcrumbs={[
          { label: t('nav.news'), href: ROUTES.news },
          { label: post.title },
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        {post.excerpt && <p className="text-lg text-muted">{post.excerpt}</p>}
        <div className="prose prose-neutral mt-6 max-w-none text-muted">
          {post.content && !isError ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <p>{post.excerpt}</p>
          )}
        </div>
        <Link to={ROUTES.news} className="mt-8 inline-block text-sm text-primary-green hover:underline">
          ← {t('common.back')}
        </Link>
      </article>
    </>
  )
}
