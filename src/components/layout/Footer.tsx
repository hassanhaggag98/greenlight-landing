import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Logo, ContactInfo, SocialLinksBar } from '@/components/common'
import { ROUTES } from '@/constants'

export function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="footer-gradient border-t border-border text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-14">
        <div className="space-y-4 sm:col-span-2 lg:col-span-4">
          <div className="flex min-w-0 items-center gap-2.5">
            <Logo size="sm" />
            <span className="min-w-0 text-sm font-semibold sm:text-base">{t('common.appName')}</span>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/70">{t('footer.description')}</p>
          <SocialLinksBar className="pt-1" showLabel />
        </div>

        <div className="lg:col-span-3">
          <h3 className="mb-4 text-sm font-semibold text-gold">{t('footer.quickLinks')}</h3>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm text-white/75 sm:grid-cols-1">
            <li><Link to={ROUTES.home} className="transition-colors hover:text-gold">{t('nav.home')}</Link></li>
            <li><Link to={ROUTES.about} className="transition-colors hover:text-gold">{t('nav.about')}</Link></li>
            <li><Link to={ROUTES.services} className="transition-colors hover:text-gold">{t('nav.services')}</Link></li>
            <li><Link to={ROUTES.contact} className="transition-colors hover:text-gold">{t('nav.contact')}</Link></li>
            <li><Link to={ROUTES.faqs} className="transition-colors hover:text-gold">{t('nav.faqs')}</Link></li>
          </ul>
        </div>

        <div className="sm:col-span-2 lg:col-span-5">
          <h3 className="mb-4 text-sm font-semibold text-gold">{t('contact.infoTitle')}</h3>
          <ContactInfo variant="dark" layout="grid" />
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/50 sm:px-6 lg:px-8">
        © {year} {t('common.appName')}. {t('footer.rights')}
      </div>
    </footer>
  )
}
