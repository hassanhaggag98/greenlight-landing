import { useTranslation } from 'react-i18next'
import { PageHeader, SEO } from '@/components/common'

export default function TermsPage() {
  const { t } = useTranslation()

  return (
    <>
      <SEO title={t('legal.termsTitle')} description={t('legal.termsSubtitle')} />
      <PageHeader title={t('legal.termsTitle')} subtitle={t('legal.termsSubtitle')} />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="prose prose-neutral max-w-none space-y-4 text-muted">
          <p>{t('legal.termsIntro')}</p>
          <h2 className="text-lg font-semibold text-foreground">{t('legal.acceptance')}</h2>
          <p>{t('legal.acceptanceText')}</p>
          <h2 className="text-lg font-semibold text-foreground">{t('legal.liability')}</h2>
          <p>{t('legal.liabilityText')}</p>
        </div>
      </div>
    </>
  )
}
