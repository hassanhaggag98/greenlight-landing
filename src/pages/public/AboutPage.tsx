import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { publicApi } from '@/api/public.api'
import { PageHeader, SEO } from '@/components/common'
import { Card, CardContent, ErrorState, LoadingSpinner } from '@/components/ui'
import { ROUTES } from '@/constants'

export default function AboutPage() {
  const { t, i18n } = useTranslation()
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['public', 'about', i18n.language],
    queryFn: () => publicApi.getAbout(),
  })

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (isError) {
    return <ErrorState onRetry={() => refetch()} />
  }

  return (
    <>
      <SEO title={t('about.title')} description={t('about.subtitle')} />
      <PageHeader
        title={data?.title ?? t('about.title')}
        subtitle={data?.description ?? t('about.subtitle')}
        breadcrumbs={[{ label: t('nav.about'), href: ROUTES.about }]}
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-lg font-semibold text-primary-green">{t('about.mission')}</h2>
              <p className="mt-2 text-muted">
                {data?.mission || t('about.missionText')}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-lg font-semibold text-gold">{t('about.vision')}</h2>
              <p className="mt-2 text-muted">
                {data?.vision || t('about.visionText')}
              </p>
            </CardContent>
          </Card>
        </div>
        {data?.values && data.values.length > 0 && (
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {data.values.map((v) => (
              <Card key={v.title}>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted">{v.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
