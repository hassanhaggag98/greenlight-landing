import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Logo } from '@/components/common'
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_TEL, ROUTES } from '@/constants'

export function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="footer-gradient border-t border-border text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 sm:py-12 lg:grid-cols-3 lg:px-8">
        <div className="space-y-3 sm:col-span-2 lg:col-span-1">
          <div className="flex min-w-0 items-center gap-2.5">
            <Logo size="sm" />
            <span className="min-w-0 text-sm font-semibold sm:text-base">{t('common.appName')}</span>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/70">{t('footer.description')}</p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-gold">{t('footer.quickLinks')}</h3>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-white/75 sm:grid-cols-1">
            <li><Link to={ROUTES.home} className="transition-colors hover:text-gold">{t('nav.home')}</Link></li>
            <li><Link to={ROUTES.about} className="transition-colors hover:text-gold">{t('nav.about')}</Link></li>
            <li><Link to={ROUTES.services} className="transition-colors hover:text-gold">{t('nav.services')}</Link></li>
            <li><Link to={ROUTES.contact} className="transition-colors hover:text-gold">{t('nav.contact')}</Link></li>
          </ul>
        </div>

        <div className="sm:col-span-2 lg:col-span-1">
          <h3 className="mb-3 text-sm font-semibold text-gold">{t('footer.contactUs')}</h3>
          <ul className="space-y-3 text-sm text-white/75">
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 size-4 shrink-0 text-accent-on-dark" />
              <a href={`mailto:${CONTACT_EMAIL}`} className="break-all transition-colors hover:text-gold">
                {CONTACT_EMAIL}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-accent-on-dark" />
              <a href={`tel:${CONTACT_PHONE_TEL}`} className="transition-colors hover:text-gold">{CONTACT_PHONE}</a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent-on-dark" />
              <span>{t('footer.location')}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/50">
        © {year} {t('common.appName')}. {t('footer.rights')}
      </div>
    </footer>
  )
}
