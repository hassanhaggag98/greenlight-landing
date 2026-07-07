import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { publicApi } from '@/api/public.api'
import { getStaticAbout } from '@/data/staticFallbacks'
import { PageHeader, SEO } from '@/components/common'
import { Card, CardContent, LoadingSpinner } from '@/components/ui'
import { ROUTES } from '@/constants'

const COUNTRY_KEYS = [
  'about.countryChina',
  'about.countryTurkey',
  'about.countryIndonesia',
  'about.countryVietnam',
  'about.countryIndia',
  'about.countryGuatemala',
] as const

export default function AboutPage() {
  const { t, i18n } = useTranslation()
  const fallback = getStaticAbout(t)
  const { data, isLoading } = useQuery({
    queryKey: ['public', 'about', i18n.language],
    queryFn: () => publicApi.getAbout(),
  })

  const about = { ...fallback, ...data }

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <>
      <SEO title={about.title} description={about.description} />
      <PageHeader
        title={about.title}
        subtitle={about.description}
        breadcrumbs={[{ label: t('nav.about'), href: ROUTES.about }]}
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-lg font-semibold text-primary-green">{t('about.mission')}</h2>
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted sm:text-base">{about.mission}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-lg font-semibold text-gold">{t('about.vision')}</h2>
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted sm:text-base">{about.vision}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold text-primary-green">{t('about.internationalTradeTitle')}</h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted sm:text-base">
              {t('about.internationalTradeText')}
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold text-foreground">{t('about.countriesTitle')}</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {COUNTRY_KEYS.map((key) => (
                <li
                  key={key}
                  className="rounded-full border border-border bg-accent-soft px-3 py-1.5 text-sm font-semibold text-primary-green"
                >
                  {t(key)}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {about.values && about.values.length > 0 && (
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {about.values.map((v) => (
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
