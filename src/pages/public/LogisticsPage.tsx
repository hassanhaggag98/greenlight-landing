import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Truck } from 'lucide-react'
import { PageHeader, SEO, SectionHeader } from '@/components/common'
import { Button, Card, CardContent } from '@/components/ui'
import { ROUTES } from '@/constants'

const FEATURE_KEYS = [
  'logistics.feature1',
  'logistics.feature2',
  'logistics.feature3',
  'logistics.feature4',
  'logistics.feature5',
] as const

export default function LogisticsPage() {
  const { t } = useTranslation()

  return (
    <>
      <SEO title={t('logistics.title')} description={t('logistics.subtitle')} />
      <PageHeader title={t('logistics.title')} subtitle={t('logistics.subtitle')} breadcrumbs={[{ label: t('nav.logistics'), href: ROUTES.logistics }]} />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader title={t('logistics.featuresTitle')} align="left" />
        <div className="grid gap-4 sm:grid-cols-2">
          {FEATURE_KEYS.map((key) => (
            <Card key={key}><CardContent className="flex items-center gap-3 pt-6">
              <Truck className="size-5 shrink-0 text-primary-green" />
              <span>{t(key)}</span>
            </CardContent></Card>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to={ROUTES.quote}><Button size="lg">{t('quote.title')}</Button></Link>
        </div>
      </div>
    </>
  )
}
