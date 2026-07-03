import type { TFunction } from 'i18next'
import { WHATSAPP_NUMBER } from '@/constants'

export type SocialPlatform = 'whatsapp' | 'facebook' | 'instagram' | 'linkedin'

export interface SocialLink {
  id: SocialPlatform
  href: string
  label: string
  cta: string
  color: string
}

export function getSocialLinks(t: TFunction): SocialLink[] {
  const whatsappMessage = encodeURIComponent(t('whatsapp.message'))

  return [
    {
      id: 'whatsapp',
      href: `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`,
      label: 'WhatsApp',
      cta: t('contact.socialCtaWhatsapp'),
      color: '#25D366',
    },
    {
      id: 'facebook',
      href: 'https://www.facebook.com/GreenLightCo',
      label: 'Facebook',
      cta: t('contact.socialCtaFacebook'),
      color: '#1877F2',
    },
    {
      id: 'instagram',
      href: 'https://www.instagram.com/greenlightgroup',
      label: 'Instagram',
      cta: t('contact.socialCtaInstagram'),
      color: '#E4405F',
    },
    {
      id: 'linkedin',
      href: 'https://www.linkedin.com/company/greenlightgroup',
      label: 'LinkedIn',
      cta: t('contact.socialCtaLinkedin'),
      color: '#0A66C2',
    },
  ]
}
