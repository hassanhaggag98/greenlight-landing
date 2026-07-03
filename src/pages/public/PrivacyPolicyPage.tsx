import { useTranslation } from 'react-i18next'
import { PageHeader, SEO } from '@/components/common'

export default function PrivacyPolicyPage() {
  const { t } = useTranslation()

  return (
    <>
      <SEO title={t('legal.privacyTitle')} description={t('legal.privacySubtitle')} />
      <PageHeader title={t('legal.privacyTitle')} subtitle={t('legal.privacySubtitle')} />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="prose prose-neutral max-w-none space-y-4 text-muted">
          <p>{t('legal.privacyIntro')}</p>
          <h2 className="text-lg font-semibold text-foreground">{t('legal.dataCollection')}</h2>
          <p>{t('legal.dataCollectionText')}</p>
          <h2 className="text-lg font-semibold text-foreground">{t('legal.dataUsage')}</h2>
          <p>{t('legal.dataUsageText')}</p>
          <h2 className="text-lg font-semibold text-foreground">{t('legal.contactSection')}</h2>
          <p>{t('legal.contactSectionText')}</p>
        </div>
      </div>
    </>
  )
}
