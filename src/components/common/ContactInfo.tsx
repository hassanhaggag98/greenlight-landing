import type { ComponentType, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Globe, Mail, MapPin, Phone } from 'lucide-react'
import {
  CONTACT_EMAIL,
  CONTACT_MAPS_URL,
  CONTACT_PHONES,
  CONTACT_WEBSITE,
  CONTACT_WEBSITE_URL,
  WHATSAPP_NUMBER,
  WHATSAPP_DISPLAY,
} from '@/constants'
import { WhatsAppIcon } from '@/components/common/SocialIcons'
import { cn } from '@/utils/cn'

interface ContactInfoProps {
  className?: string
  variant?: 'light' | 'dark'
  layout?: 'stack' | 'grid'
}

export function ContactInfo({ className, variant = 'light', layout = 'stack' }: ContactInfoProps) {
  const { t } = useTranslation()
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t('whatsapp.message'))}`

  const labelClass = variant === 'dark' ? 'text-gold' : 'text-primary-green'
  const textClass = variant === 'dark' ? 'text-white/75' : 'text-muted'
  const valueClass =
    variant === 'dark'
      ? 'text-white transition-colors hover:text-gold'
      : 'text-foreground transition-colors hover:text-primary-green'
  const iconWrapClass =
    variant === 'dark'
      ? 'bg-white/5 text-accent-on-dark'
      : 'bg-accent-soft text-primary-green'
  const gridItemClass =
    variant === 'dark'
      ? 'rounded-xl border border-white/10 bg-white/[0.03] p-3.5 sm:p-4'
      : ''

  const Item = ({
    icon: Icon,
    label,
    children,
    iconWrapClassName,
    className: itemClassName,
  }: {
    icon: ComponentType<{ className?: string }>
    label: string
    children: ReactNode
    iconWrapClassName?: string
    className?: string
  }) => (
    <li className={cn('flex gap-3', layout === 'grid' && gridItemClass, itemClassName)}>
      <span
        className={cn(
          'flex size-9 shrink-0 items-center justify-center rounded-lg',
          iconWrapClass,
          iconWrapClassName,
        )}
      >
        <Icon className="size-4" />
      </span>
      <div className="min-w-0 flex-1 space-y-1">
        <p className={cn('text-xs font-semibold uppercase tracking-wide', labelClass)}>{label}</p>
        <div className={cn('text-sm leading-relaxed', textClass)}>{children}</div>
      </div>
    </li>
  )

  const items = (
    <>
      <Item icon={MapPin} label={t('contact.addressLabel')} className={layout === 'grid' ? 'sm:col-span-2' : undefined}>
        <a
          href={CONTACT_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={cn('inline-block transition-colors hover:text-gold', valueClass)}
        >
          {t('footer.location')}
        </a>
      </Item>

      <Item icon={Phone} label={t('contact.phonesLabel')}>
        <div className="flex flex-col gap-1">
          {CONTACT_PHONES.map((phone) => (
            <a key={phone.tel} href={`tel:${phone.tel}`} className={cn('break-all', valueClass)} dir="ltr">
              {phone.display}
            </a>
          ))}
        </div>
      </Item>

      <Item
        icon={WhatsAppIcon}
        label={t('contact.whatsappLabel')}
        iconWrapClassName={variant === 'dark' ? 'bg-[#25D366]/15 text-[#25D366]' : 'bg-[#25D366]/10 text-[#25D366]'}
      >
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className={cn('inline-flex flex-col gap-0.5 break-all', valueClass)}
          dir="ltr"
        >
          <span>{WHATSAPP_DISPLAY}</span>
          <span className="text-xs text-white/50">{t('contact.socialCtaWhatsapp')}</span>
        </a>
      </Item>

      <Item icon={Globe} label={t('contact.websiteLabel')}>
        <a
          href={CONTACT_WEBSITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={cn('break-all', valueClass)}
          dir="ltr"
        >
          {CONTACT_WEBSITE}
        </a>
      </Item>

      <Item icon={Mail} label={t('contact.emailLabel')}>
        <a href={`mailto:${CONTACT_EMAIL}`} className={cn('break-all', valueClass)} dir="ltr">
          {CONTACT_EMAIL}
        </a>
      </Item>
    </>
  )

  return (
    <ul
      className={cn(
        layout === 'grid' ? 'grid gap-3 sm:grid-cols-2' : 'space-y-4',
        className,
      )}
    >
      {items}
    </ul>
  )
}
