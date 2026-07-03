import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Package,
  Shield,
  Ship,
  Truck,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui'
import { fadeIn, getMotionProps, prefersReducedMotion, staggerContainer } from '@/utils/motion'
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
  { icon: Ship, labelKey: 'home.heroSeaFreight', delay: 0, x: '6%', y: '14%' },
  { icon: Package, labelKey: 'home.heroContainers', delay: 0.35, x: '70%', y: '10%' },
  { icon: Shield, labelKey: 'home.heroCustoms', delay: 0.7, x: '74%', y: '55%' },
  { icon: Truck, labelKey: 'home.heroLandTransport', delay: 1.05, x: '8%', y: '58%' },
] as const

const CONTAINER_COLORS = ['#156b42', '#3cb371', '#d4af37', '#1a8050', '#b8941f', '#6ecf98']

function ContainerBox({ x, y, w, h, color, delay = 0 }: { x: number; y: number; w: number; h: number; color: string; delay?: number }) {
  return (
    <motion.g
      initial={{ opacity: 0, y: y + 8 }}
      animate={{ opacity: 1, y }}
      transition={{ duration: 0.5, delay }}
    >
      <rect x={x} y={y} width={w} height={h} rx={2} fill={color} stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
      <line x1={x} y1={y + h * 0.35} x2={x + w} y2={y + h * 0.35} stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <line x1={x + w * 0.5} y1={y} x2={x + w * 0.5} y2={y + h} stroke="rgba(0,0,0,0.15)" strokeWidth="0.8" />
    </motion.g>
  )
}

function PortHubVisual() {
  const { t } = useTranslation()
  const reduced = prefersReducedMotion()

  const containers = [
    { x: 248, y: 168, w: 36, h: 28, color: CONTAINER_COLORS[0]!, delay: 0.3 },
    { x: 286, y: 168, w: 36, h: 28, color: CONTAINER_COLORS[1]!, delay: 0.4 },
    { x: 248, y: 138, w: 36, h: 28, color: CONTAINER_COLORS[2]!, delay: 0.5 },
    { x: 286, y: 138, w: 36, h: 28, color: CONTAINER_COLORS[3]!, delay: 0.55 },
    { x: 267, y: 108, w: 36, h: 28, color: CONTAINER_COLORS[4]!, delay: 0.65 },
    { x: 200, y: 178, w: 32, h: 24, color: CONTAINER_COLORS[5]!, delay: 0.45 },
    { x: 200, y: 152, w: 32, h: 24, color: CONTAINER_COLORS[0]!, delay: 0.5 },
    { x: 200, y: 126, w: 32, h: 24, color: CONTAINER_COLORS[2]!, delay: 0.6 },
  ]

  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-md sm:max-w-lg lg:max-w-none">
      <div className="absolute inset-0 rounded-2xl bg-navy-mid/40 blur-2xl" aria-hidden />

      <svg viewBox="0 0 400 300" className="relative size-full" aria-hidden>
        {/* Sky glow */}
        <defs>
          <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0c2844" />
            <stop offset="100%" stopColor="#0a1628" />
          </linearGradient>
          <linearGradient id="seaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a4a6e" />
            <stop offset="100%" stopColor="#0d3050" />
          </linearGradient>
        </defs>

        {/* Water */}
        <rect x="0" y="200" width="400" height="100" fill="url(#seaGrad)" />
        {!reduced && (
          <>
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.path
                key={i}
                d={`M ${i * 90} 210 Q ${i * 90 + 45} ${215 + (i % 2) * 4} ${i * 90 + 90} 210`}
                fill="none"
                stroke="rgba(110,207,152,0.15)"
                strokeWidth="1.5"
                animate={{ d: [`M ${i * 90} 210 Q ${i * 90 + 45} 215 ${i * 90 + 90} 210`, `M ${i * 90} 210 Q ${i * 90 + 45} 219 ${i * 90 + 90} 210`, `M ${i * 90} 210 Q ${i * 90 + 45} 215 ${i * 90 + 90} 210`] }}
                transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}
          </>
        )}

        {/* Dock / pier */}
        <rect x="180" y="195" width="220" height="12" rx="2" fill="#2a3f55" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <rect x="180" y="185" width="220" height="10" fill="#1e3045" />

        {/* Crane */}
        <g>
          <rect x="318" y="90" width="6" height="105" fill="#d4af37" rx="1" />
          <motion.g
            animate={reduced ? undefined : { rotate: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '321px 95px' }}
          >
            <rect x="200" y="92" width="122" height="5" rx="1" fill="#d4af37" />
            <line x1="200" y1="94" x2="200" y2="110" stroke="#d4af37" strokeWidth="2" />
            {!reduced && (
              <motion.rect
                x="198"
                y="110"
                width="6"
                height="8"
                fill="#6ecf98"
                animate={{ y: [110, 130, 110] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
          </motion.g>
        </g>

        {/* Container stacks on dock */}
        {containers.map((c, i) => (
          <ContainerBox key={i} {...c} />
        ))}

        {/* Cargo ship */}
        <motion.g
          animate={reduced ? undefined : { y: [0, -3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path
            d="M 30 195 L 50 175 L 130 175 L 145 195 Z"
            fill="#1e3045"
            stroke="rgba(110,207,152,0.4)"
            strokeWidth="1"
          />
          <rect x="55" y="158" width="18" height="17" rx="1" fill="#156b42" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
          <rect x="76" y="158" width="18" height="17" rx="1" fill="#3cb371" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
          <rect x="97" y="158" width="18" height="17" rx="1" fill="#d4af37" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
          <rect x="118" y="163" width="18" height="12" rx="1" fill="#156b42" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
          {/* Smokestack */}
          <rect x="62" y="148" width="8" height="10" rx="1" fill="#2a3f55" />
          {!reduced && (
            <motion.circle
              cx="66"
              cy="143"
              r="4"
              fill="rgba(255,255,255,0.12)"
              animate={{ cy: [143, 135, 143], opacity: [0.3, 0.1, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          )}
        </motion.g>

        {/* Moving cargo dot on route */}
        {!reduced && (
          <motion.circle
            r="5"
            fill="#6ecf98"
            stroke="#fff"
            strokeWidth="1.5"
            animate={{ cx: [40, 120, 200, 280, 200, 40], cy: [190, 185, 195, 185, 195, 190] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          />
        )}
      </svg>

      {/* Port badge */}
      <div className="absolute bottom-[14%] inset-x-0 z-10 mx-auto flex w-fit max-w-[calc(100%-1.5rem)] flex-col items-center gap-1 px-2">
        <div className="flex items-center gap-2 rounded-xl border border-gold/40 bg-navy-mid/90 px-2.5 py-2 shadow-xl backdrop-blur-sm sm:px-3">
          <Ship className="size-5 text-gold" strokeWidth={1.5} />
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gold sm:text-xs">
              {t('home.heroPortLabel')}
            </p>
            <p className="text-xs font-semibold text-white sm:text-sm">{t('home.heroPortHub')}</p>
          </div>
        </div>
      </div>

      {/* Floating service cards */}
      {FLOATING_SERVICES.map(({ icon: Icon, labelKey, delay, x, y }) => (
        <motion.div
          key={labelKey}
          className="absolute hidden md:block"
          style={{ insetInlineStart: x, top: y }}
          initial={reduced ? false : { opacity: 0, scale: 0.8 }}
          animate={reduced ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, y: [0, -5, 0] }}
          transition={{
            opacity: { duration: 0.4, delay },
            scale: { duration: 0.4, delay },
            y: { duration: 3.5, repeat: Infinity, delay: delay + 0.5, ease: 'easeInOut' },
          }}
        >
          <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-navy-mid/85 px-3 py-2 shadow-lg backdrop-blur-sm">
            <Icon className="size-4 shrink-0 text-accent-on-dark" />
            <span className="whitespace-nowrap text-xs font-medium text-white">{t(labelKey)}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
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
  const reduced = prefersReducedMotion()

  return (
    <section className={cn('hero-gradient relative overflow-hidden text-white', className)}>
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden
      />
      {!reduced && (
        <div className="absolute -end-32 -top-32 size-96 rounded-full bg-accent-on-dark/15 blur-3xl" aria-hidden />
      )}

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8 lg:py-20 xl:py-24">
        <motion.div className="min-w-0 text-center lg:text-start" variants={staggerContainer} {...getMotionProps()}>
          <motion.div variants={fadeIn} className="mb-4 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
            <span className="inline-flex items-center rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold sm:text-xs">
              {t('home.since1996')}
            </span>
            {tagline && (
              <span className="max-w-full text-[11px] font-medium uppercase tracking-wide text-accent-on-dark sm:text-sm">
                {tagline}
              </span>
            )}
          </motion.div>

          <motion.h1
            variants={fadeIn}
            className="text-balance text-[1.75rem] font-extrabold leading-tight tracking-tight text-white drop-shadow-[0_3px_18px_rgba(0,0,0,0.45)] sm:text-4xl md:text-5xl xl:text-[3.25rem] xl:leading-[1.15]"
          >
            {title}
          </motion.h1>

          <motion.p
            variants={fadeIn}
            className="mx-auto mt-4 max-w-xl text-pretty text-sm font-medium leading-relaxed text-white/85 sm:mt-6 sm:text-lg lg:mx-0"
          >
            {subtitle}
          </motion.p>

          <motion.div
            variants={fadeIn}
            className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start"
          >
            {primaryCta && (
              <Link to={primaryCta.link} className="w-full sm:w-auto">
                <Button size="lg" className="h-auto min-h-12 w-full whitespace-normal bg-primary-green px-4 py-3 text-sm leading-snug hover:bg-secondary-green sm:w-auto sm:text-base">
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
                  className="h-auto min-h-12 w-full whitespace-normal border-white/30 px-4 py-3 text-sm leading-snug text-white hover:bg-white/10 sm:w-auto sm:text-base"
                >
                  {secondaryCta.text}
                </Button>
              </Link>
            )}
          </motion.div>

          <motion.div variants={fadeIn} className="mt-6 flex flex-wrap justify-center gap-2 md:hidden">
            {FLOATING_SERVICES.map(({ icon: Icon, labelKey }) => (
              <span
                key={labelKey}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/85"
              >
                <Icon className="size-3.5 text-accent-on-dark" />
                {t(labelKey)}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-8 min-w-0 lg:mt-0"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.7, delay: 0.2 }}
        >
          <PortHubVisual />
        </motion.div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-surface via-surface/95 to-transparent sm:h-20 lg:h-24 dark:h-12 dark:via-surface/80 sm:dark:h-16"
        aria-hidden
      />
    </section>
  )
}
