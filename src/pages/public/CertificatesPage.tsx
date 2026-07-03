import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { Award } from 'lucide-react'
import { publicApi } from '@/api/public.api'
import { getStaticCertificates } from '@/data/staticFallbacks'
import { PageHeader, SEO } from '@/components/common'
import { Card, CardContent, CardDescription, CardTitle, LoadingSpinner } from '@/components/ui'
import { ROUTES } from '@/constants'

export default function CertificatesPage() {
  const { t } = useTranslation()
  const fallback = getStaticCertificates(t)
  const { data = [], isLoading, isError } = useQuery({
    queryKey: ['public', 'certificates'],
    queryFn: () => publicApi.getCertificates(),
  })

  const certificates = isError || data.length === 0 ? fallback : data

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <>
      <SEO title={t('certificates.title')} description={t('certificates.subtitle')} />
      <PageHeader
        title={t('certificates.title')}
        subtitle={t('certificates.subtitle')}
        breadcrumbs={[{ label: t('nav.certificates'), href: ROUTES.certificates }]}
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert) => (
            <Card key={cert.id} className="text-center">
              <CardContent className="pt-6">
                <Award className="mx-auto mb-3 size-10 text-gold" />
                <CardTitle>{cert.title}</CardTitle>
                {cert.issuer && <CardDescription>{cert.issuer}</CardDescription>}
                {cert.description && <p className="mt-2 text-sm text-muted">{cert.description}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}
