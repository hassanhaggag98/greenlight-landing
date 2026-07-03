import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { publicApi } from '@/api/public.api'
import { PageHeader, SEO } from '@/components/common'
import { Card, CardContent, CardDescription, CardTitle, EmptyState, ErrorState, LoadingSpinner } from '@/components/ui'
import { ROUTES } from '@/constants'

export default function IndustriesPage() {
  const { t } = useTranslation()
  const { data = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['public', 'industries'],
    queryFn: () => publicApi.getIndustries(),
  })

  if (isLoading) return <div className="flex min-h-[40vh] items-center justify-center"><LoadingSpinner size="lg" /></div>
  if (isError) return <ErrorState onRetry={() => refetch()} />

  return (
    <>
      <SEO title={t('industries.title')} description={t('industries.subtitle')} />
      <PageHeader title={t('industries.title')} subtitle={t('industries.subtitle')} breadcrumbs={[{ label: t('nav.industries'), href: ROUTES.industries }]} />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {data.length === 0 ? <EmptyState title={t('common.noResults')} /> : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((item) => (
              <Card key={item.id}><CardContent className="pt-6">
                <CardTitle>{item.name}</CardTitle>
                <CardDescription className="mt-2">{item.description}</CardDescription>
              </CardContent></Card>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
