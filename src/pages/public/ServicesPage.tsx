import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { ArrowRight } from 'lucide-react'
import { publicApi } from '@/api/public.api'
import { getStaticServices } from '@/data/staticFallbacks'
import { PageHeader, SEO } from '@/components/common'
import { Card, CardContent, CardDescription, CardTitle, LoadingSpinner } from '@/components/ui'
import { ROUTES } from '@/constants'

export default function ServicesPage() {
  const { t } = useTranslation()
  const fallback = getStaticServices(t)
  const { data = [], isLoading, isError } = useQuery({
    queryKey: ['public', 'services'],
    queryFn: () => publicApi.getServices(),
  })

  const services = isError || data.length === 0 ? fallback : data

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <>
      <SEO title={t('services.title')} description={t('services.subtitle')} />
      <PageHeader
        title={t('services.title')}
        subtitle={t('services.subtitle')}
        breadcrumbs={[{ label: t('nav.services'), href: ROUTES.services }]}
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.id} className="transition-shadow hover:shadow-[var(--shadow-md)]">
              <CardContent className="pt-6">
                <CardTitle>{service.title}</CardTitle>
                <CardDescription className="mt-2">
                  {service.short_description ?? service.description}
                </CardDescription>
                <Link
                  to={`/services/${service.slug}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-green"
                >
                  {t('common.learnMore')} <ArrowRight className="size-3" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}
