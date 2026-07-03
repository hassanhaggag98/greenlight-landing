import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Globe, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import {
  CONTACT_EMAIL,
  CONTACT_PHONES,
  CONTACT_WEBSITE,
  CONTACT_WEBSITE_URL,
  WHATSAPP_NUMBER,
  WHATSAPP_DISPLAY,
} from '@/constants'
import { cn } from '@/utils/cn'

interface ContactInfoProps {
  className?: string
  variant?: 'light' | 'dark'
}

export function ContactInfo({ className, variant = 'light' }: ContactInfoProps) {
  const { t } = useTranslation()
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t('whatsapp.message'))}`

  const labelClass = variant === 'dark' ? 'text-gold' : 'text-primary-green'
  const textClass = variant === 'dark' ? 'text-white/75' : 'text-muted'
  const valueClass =
    variant === 'dark'
      ? 'text-white transition-colors hover:text-gold'
      : 'text-foreground transition-colors hover:text-primary-green'
  const iconClass = variant === 'dark' ? 'text-accent-on-dark' : 'text-primary-green'

  const Item = ({
    icon: Icon,
    label,
    children,
  }: {
    icon: typeof MapPin
    label: string
    children: ReactNode
  }) => (
    <li className="space-y-1">
      <p className={cn('text-xs font-semibold uppercase tracking-wide', labelClass)}>{label}</p>
      <div className={cn('flex items-start gap-2 text-sm', textClass)}>
        <Icon className={cn('mt-0.5 size-4 shrink-0', iconClass)} />
        <div className="min-w-0">{children}</div>
      </div>
    </li>
  )

  return (
    <ul className={cn('space-y-5', className)}>
      <Item icon={MapPin} label={t('contact.addressLabel')}>
        <span className={valueClass}>{t('footer.location')}</span>
      </Item>

      <Item icon={Phone} label={t('contact.phonesLabel')}>
        <div className="flex flex-col gap-1">
          {CONTACT_PHONES.map((phone) => (
            <a key={phone.tel} href={`tel:${phone.tel}`} className={cn('break-all', valueClass)}>
              {phone.display}
            </a>
          ))}
        </div>
      </Item>

      <Item icon={MessageCircle} label={t('contact.whatsappLabel')}>
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={cn('break-all', valueClass)}>
          {WHATSAPP_DISPLAY}
        </a>
      </Item>

      <Item icon={Globe} label={t('contact.websiteLabel')}>
        <a
          href={CONTACT_WEBSITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={cn('break-all', valueClass)}
        >
          {CONTACT_WEBSITE}
        </a>
      </Item>

      <Item icon={Mail} label={t('contact.emailLabel')}>
        <a href={`mailto:${CONTACT_EMAIL}`} className={cn('break-all', valueClass)}>
          {CONTACT_EMAIL}
        </a>
      </Item>
    </ul>
  )
}
