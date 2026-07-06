import { Link } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import { ArrowRight, Package, Shield, Ship, Truck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui'
import { HeroSlider } from './HeroSlider'
import { prefersReducedMotion } from '@/utils/motion'
import { cn } from '@/utils/cn'

interface HeroBannerProps {
  title: string
  subtitle: string
  tagline?: string
  primaryCta?: { text: string; link: string }
  secondaryCta?: { text: string; link: string }
  className?: string
}

const FLOATING_SERVICES = [
  { icon: Ship, labelKey: 'home.heroSeaFreight' },
  { icon: Package, labelKey: 'home.heroContainers' },
  { icon: Shield, labelKey: 'home.heroCustoms' },
  { icon: Truck, labelKey: 'home.heroLandTransport' },
] as const

const reduced = () => prefersReducedMotion()

const heroContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: reduced() ? 0 : 0.12, delayChildren: reduced() ? 0 : 0.05 },
  },
}

const heroBadge: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const heroTitle: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
}

const heroSubtitle: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay: 0.08 },
  },
}

const heroCta: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

export function HeroBanner({
  title,
  subtitle,
  tagline,
  primaryCta,
  secondaryCta,
  className,
}: HeroBannerProps) {
  const { t } = useTranslation()
  const motionOff = reduced()

  return (
    <section className={cn('hero-gradient relative overflow-hidden', className)}>
      {!motionOff && (
        <div
          className="absolute -end-32 -top-32 size-96 rounded-full bg-[var(--hero-glow)] blur-3xl"
          aria-hidden
        />
      )}

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-20 xl:py-24">
        <motion.div
          className="hero-copy min-w-0 text-center lg:text-start"
          variants={heroContainer}
          initial={motionOff ? false : 'hidden'}
          animate="visible"
        >
          <motion.div
            variants={heroBadge}
            className="mb-5 flex flex-wrap items-center justify-center gap-2 lg:justify-start"
          >
            <span className="hero-badge-since inline-flex items-center rounded-full border border-gold/35 bg-gold/12 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#8a6914] dark:border-gold/40 dark:bg-gold/10 dark:text-gold sm:text-xs">
              {t('home.since1996')}
            </span>
            {tagline && (
              <span className="hero-badge-tagline inline-flex max-w-full items-center rounded-full border border-primary-green/15 bg-surface-elevated/80 px-3 py-1 text-[11px] font-semibold text-primary-green shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/10 dark:text-accent-on-dark sm:text-xs">
                {tagline}
              </span>
            )}
          </motion.div>

          <div className="hero-copy-body">
            <motion.h1
              variants={heroTitle}
              className="hero-heading text-balance text-[1.85rem] font-extrabold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl xl:text-[3.2rem]"
            >
              {title}
            </motion.h1>

            <motion.p
              variants={heroSubtitle}
              className="hero-subcopy mx-auto mt-4 max-w-xl text-pretty text-[0.95rem] font-medium leading-[1.8] sm:mt-5 sm:text-lg lg:mx-0"
            >
              {subtitle}
            </motion.p>
          </div>

          <motion.div
            variants={heroCta}
            className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start"
          >
            {primaryCta && (
              <Link to={primaryCta.link} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="hero-cta-primary h-auto min-h-12 w-full whitespace-normal px-5 py-3 text-sm leading-snug shadow-[0_10px_30px_rgba(21,107,66,0.22)] sm:w-auto sm:text-base"
                >
                  {primaryCta.text}
                  <ArrowRight className="size-4 shrink-0 rtl:rotate-180" />
                </Button>
              </Link>
            )}
            {secondaryCta && (
              <Link to={secondaryCta.link} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="hero-cta-secondary h-auto min-h-12 w-full whitespace-normal px-5 py-3 text-sm leading-snug sm:w-auto sm:text-base"
                >
                  {secondaryCta.text}
                </Button>
              </Link>
            )}
          </motion.div>

          <motion.div variants={heroCta} className="mt-6 flex flex-wrap justify-center gap-2 md:hidden">
            {FLOATING_SERVICES.map(({ icon: Icon, labelKey }) => (
              <span
                key={labelKey}
                className="inline-flex items-center gap-1.5 rounded-full border border-primary-green/15 bg-surface-elevated px-3 py-1.5 text-xs font-medium text-foreground/80 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white/85"
              >
                <Icon className="size-3.5 text-primary-green dark:text-accent-on-dark" />
                {t(labelKey)}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-8 w-full min-w-0 overflow-hidden lg:mt-0"
          initial={motionOff ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: motionOff ? 0 : 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroSlider />
        </motion.div>
      </div>

      <div
        className="hero-bottom-fade pointer-events-none absolute inset-x-0 bottom-0 h-10 sm:h-14 lg:h-16 dark:h-16 dark:sm:h-20 dark:lg:h-24"
        aria-hidden
      />
    </section>
  )
}
