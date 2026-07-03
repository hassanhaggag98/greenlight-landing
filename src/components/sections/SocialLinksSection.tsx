import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ArrowUpRight, Mail, Share2 } from 'lucide-react'
import { CONTACT_EMAIL } from '@/constants'
import { getSocialLinks, type SocialLink } from '@/constants/social'
import { SocialPlatformIcon } from '@/components/common/SocialIcons'
import { fadeIn, prefersReducedMotion, staggerContainer } from '@/utils/motion'
import { cn } from '@/utils/cn'

interface SocialLinksSectionProps {
  className?: string
}

function SocialLinkRow({ link }: { link: SocialLink }) {
  const reduced = prefersReducedMotion()

  return (
    <motion.a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      variants={fadeIn}
      whileHover={reduced ? undefined : { x: 4 }}
      className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm transition-colors hover:border-white/25 hover:bg-white/[0.1] sm:p-5"
      aria-label={link.label}
    >
      <span
        className="flex size-12 shrink-0 items-center justify-center rounded-xl text-white shadow-lg transition-transform duration-300 group-hover:scale-105 sm:size-14"
        style={{ backgroundColor: link.color }}
      >
        <SocialPlatformIcon platform={link.id} className="size-6 sm:size-7" />
      </span>

      <span className="min-w-0 flex-1 text-start">
        <span className="block text-sm font-bold text-white sm:text-base">{link.label}</span>
        <span className="mt-0.5 block text-xs text-white/65 sm:text-sm">{link.cta}</span>
      </span>

      <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-all duration-300 group-hover:border-gold/40 group-hover:bg-gold/15 group-hover:text-gold">
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:rotate-180" />
      </span>
    </motion.a>
  )
}

export function SocialLinksSection({ className }: SocialLinksSectionProps) {
  const { t } = useTranslation()
  const links = useMemo(() => getSocialLinks(t), [t])
  const reduced = prefersReducedMotion()

  return (
    <section className={cn('px-4 py-10 sm:px-6 sm:py-14 lg:px-8', className)}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-dark-navy via-navy-mid to-[#0d3d28] p-6 shadow-[var(--shadow-lg)] sm:p-8 lg:p-10"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: reduced ? 0 : 0.5, ease: 'easeOut' }}
        >
          <div className="pointer-events-none absolute -end-24 -top-24 size-72 rounded-full bg-primary-green/20 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -bottom-20 -start-20 size-64 rounded-full bg-gold/10 blur-3xl" aria-hidden />

          <div className="relative grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-10">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold sm:text-sm">
                <Share2 className="size-3.5" />
                {t('contact.socialBadge')}
              </span>
              <h2 className="mt-4 text-balance text-2xl font-bold leading-tight text-white sm:text-3xl">
                {t('contact.socialTitle')}
              </h2>
              <p className="mt-3 max-w-md text-pretty text-sm leading-relaxed text-white/75 sm:text-base">
                {t('contact.socialSubtitle')}
              </p>

              <motion.a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-gold/40 hover:bg-white/15"
                whileHover={reduced ? undefined : { scale: 1.03 }}
                whileTap={reduced ? undefined : { scale: 0.98 }}
              >
                <Mail className="size-4 text-gold" />
                {t('contact.socialEmailCta')}
              </motion.a>
            </div>

            <motion.div
              className="grid gap-3 sm:gap-4"
              variants={staggerContainer}
              initial={reduced ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ staggerChildren: reduced ? 0 : 0.08 }}
            >
              {links.map((link) => (
                <SocialLinkRow key={link.id} link={link} />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
