import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { getSocialLinks, type SocialLink } from '@/constants/social'
import { SocialPlatformIcon } from '@/components/common/SocialIcons'
import { prefersReducedMotion } from '@/utils/motion'

function SocialIconButton({ link, index }: { link: SocialLink; index: number }) {
  const reduced = prefersReducedMotion()

  return (
    <motion.a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={link.label}
      title={link.label}
      className="group relative flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all duration-300 hover:border-transparent hover:shadow-lg sm:size-11"
      style={{ ['--social-color' as string]: link.color }}
      initial={reduced ? false : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: reduced ? 0 : index * 0.06, duration: 0.35, ease: 'easeOut' }}
      whileHover={reduced ? undefined : { y: -2 }}
      whileTap={reduced ? undefined : { scale: 0.95 }}
    >
      <span
        className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ backgroundColor: link.color }}
        aria-hidden
      />
      <SocialPlatformIcon
        platform={link.id}
        className="relative z-10 size-[18px] transition-colors duration-300 group-hover:text-white sm:size-5"
      />
    </motion.a>
  )
}

interface SocialLinksBarProps {
  className?: string
  showLabel?: boolean
}

export function SocialLinksBar({ className, showLabel = false }: SocialLinksBarProps) {
  const { t } = useTranslation()
  const links = useMemo(() => getSocialLinks(t), [t])

  return (
    <div className={className}>
      {showLabel && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gold">
          {t('contact.socialBadge')}
        </p>
      )}
      <div className="flex flex-wrap gap-2.5 sm:gap-3">
        {links.map((link, index) => (
          <SocialIconButton key={link.id} link={link} index={index} />
        ))}
      </div>
    </div>
  )
}
