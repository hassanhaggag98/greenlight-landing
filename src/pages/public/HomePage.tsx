import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
  Anchor,
  ArrowRight,
  BadgeCheck,
  Boxes,
  CheckCircle2,
  Clock3,
  Compass,
  FileCheck2,
  Factory,
  Globe2,
  PackageCheck,
  Radar,
  Route,
  ShieldCheck,
  Ship,
  Truck,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SEO } from '@/components/common'
import { AnimatedCounter, HeroBanner, WorldMap } from '@/components/sections'
import { Button, Card, CardContent, CardDescription, CardTitle } from '@/components/ui'
import { ROUTES } from '@/constants'
import { fadeIn, getMotionProps, staggerContainer } from '@/utils/motion'

interface LandingCard {
  title: string
  description: string
  icon: LucideIcon
}

export default function HomePage() {
  const { t } = useTranslation()

  const metrics = [
    { value: 30, suffix: '+', label: t('home.statYears'), hint: t('home.landingMetricYears'), icon: BadgeCheck },
    { value: 5000, suffix: '+', label: t('home.statShipments'), hint: t('home.landingMetricShipments'), icon: PackageCheck },
    { value: 8, suffix: '+', label: t('home.statPorts'), hint: t('home.landingMetricPorts'), icon: Anchor },
    { value: 24, suffix: '/7', label: t('home.networkLogistics'), hint: t('home.landingMetricSupport'), icon: Clock3 },
  ]

  const solutions: LandingCard[] = [
    { title: t('home.fallbackService1Title'), description: t('home.fallbackService1Desc'), icon: Globe2 },
    { title: t('home.fallbackService2Title'), description: t('home.fallbackService2Desc'), icon: Truck },
    { title: t('home.fallbackService3Title'), description: t('home.fallbackService3Desc'), icon: Boxes },
    { title: t('home.fallbackService4Title'), description: t('home.fallbackService4Desc'), icon: Factory },
  ]

  const operations = [
    t('home.landingOpsPoint1'),
    t('home.landingOpsPoint2'),
    t('home.landingOpsPoint3'),
    t('home.landingOpsPoint4'),
  ]

  const process = [
    { title: t('home.processStep1Title'), description: t('home.processStep1Desc'), icon: Boxes },
    { title: t('home.processStep2Title'), description: t('home.processStep2Desc'), icon: ShieldCheck },
    { title: t('home.processStep3Title'), description: t('home.processStep3Desc'), icon: Route },
    { title: t('home.processStep4Title'), description: t('home.processStep4Desc'), icon: CheckCircle2 },
  ]

  const portHighlights = [
    t('home.landingPortAlex'),
    t('home.landingPortSokhna'),
    t('home.landingPortPortSaid'),
    t('home.landingPortDamietta'),
  ]

  return (
    <>
      <SEO title={t('home.heroTitle')} description={t('home.heroSubtitle')} />
      <HeroBanner
        tagline={t('home.heroTagline')}
        title={t('home.heroTitle')}
        subtitle={t('home.heroSubtitle')}
        primaryCta={{
          text: t('home.cta'),
          link: ROUTES.quote,
        }}
        secondaryCta={{
          text: t('contact.title'),
          link: ROUTES.contact,
        }}
        className="lg:min-h-[calc(100dvh-4rem)]"
      />

      <section className="relative z-20 -mt-6 pb-10 pt-2 sm:-mt-10 sm:pb-14 md:-mt-14 md:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid gap-2.5 rounded-2xl border border-border bg-surface/95 p-2.5 shadow-[var(--shadow-lg)] backdrop-blur-xl sm:gap-3 sm:rounded-3xl sm:p-3 md:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            {...getMotionProps()}
          >
            {metrics.map((metric) => {
              const Icon = metric.icon
              return (
                <motion.div key={metric.label} variants={fadeIn} className="min-w-0">
                  <div className="flex h-full items-start gap-3 rounded-xl bg-surface-elevated p-3.5 sm:items-center sm:gap-4 sm:rounded-2xl sm:p-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-primary-green sm:size-11 sm:rounded-2xl">
                      <Icon className="size-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="stat-value stat-value-inline text-xl sm:text-2xl md:text-3xl">
                        <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                      </div>
                      <p className="text-sm font-bold text-foreground">{metric.label}</p>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">{metric.hint}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      <section className="overflow-hidden pb-14 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid min-w-0 gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-10">
            <motion.div className="min-w-0" variants={fadeIn} {...getMotionProps()}>
              <span className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-primary-green/20 bg-accent-soft px-3 py-1 text-xs font-bold text-primary-green sm:text-sm">
                <Radar className="size-4 shrink-0" />
                {t('home.landingOpsBadge')}
              </span>
              <h2 className="mt-4 text-balance text-2xl font-bold leading-tight text-foreground sm:mt-5 sm:text-3xl lg:text-4xl">
                {t('home.landingOpsTitle')}
              </h2>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-muted sm:mt-4 sm:text-base lg:text-lg">
                {t('home.landingOpsSubtitle')}
              </p>

              <div className="mt-6 rounded-2xl border border-border bg-surface-elevated p-3 shadow-[var(--shadow-md)] sm:mt-8 sm:rounded-3xl sm:p-4 md:p-6">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-mid via-dark-navy to-[#062416] p-4 text-white sm:p-5">
                  <div className="absolute -end-16 -top-16 size-44 rounded-full bg-primary-green/25 blur-3xl" aria-hidden />
                  <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-accent-on-dark sm:text-sm">{t('home.landingControlRoom')}</p>
                      <h3 className="mt-2 text-balance text-lg font-bold sm:text-2xl">{t('home.landingLiveShipment')}</h3>
                    </div>
                    <div className="flex size-12 shrink-0 items-center justify-center self-start rounded-2xl border border-white/10 bg-white/10 sm:size-14 sm:self-auto">
                      <Compass className="size-6 text-gold sm:size-7" />
                    </div>
                  </div>

                  <div className="relative mt-6 h-24 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] sm:mt-8 sm:h-28">
                    <motion.div
                      className="absolute inset-x-4 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-gold via-accent-on-dark to-primary-green sm:inset-x-6"
                      initial={{ scaleX: 0, opacity: 0 }}
                      whileInView={{ scaleX: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                    {[Ship, FileCheck2, Truck].map((Icon, index) => (
                      <motion.div
                        key={index}
                        className="absolute top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-dark-navy text-accent-on-dark shadow-lg sm:size-10"
                        style={{ insetInlineStart: `${12 + index * 38}%` }}
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ delay: 0.2 + index * 0.18, duration: 0.4 }}
                      >
                        <Icon className="size-4 sm:size-5" />
                      </motion.div>
                    ))}
                    <motion.div
                      className="absolute top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_18px_rgba(212,175,55,0.9)] sm:size-3"
                      animate={{ insetInlineStart: ['12%', '50%', '88%'], opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div className="grid min-w-0 gap-3 sm:grid-cols-2 sm:gap-4" variants={staggerContainer} {...getMotionProps()}>
              {solutions.map((solution) => {
                const Icon = solution.icon
                return (
                  <motion.div key={solution.title} variants={fadeIn} className="min-w-0">
                    <Card className="group h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]">
                      <CardContent className="p-4 sm:p-6">
                        <div className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-accent-soft text-primary-green transition-transform duration-300 group-hover:scale-110 sm:mb-5 sm:size-12">
                          <Icon className="size-5 sm:size-6" />
                        </div>
                        <CardTitle className="text-base sm:text-lg">{solution.title}</CardTitle>
                        <CardDescription className="mt-2 text-sm leading-relaxed sm:mt-3">{solution.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-alt py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid min-w-0 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-10">
            <motion.div className="min-w-0" variants={fadeIn} {...getMotionProps()}>
              <span className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-bold text-gold sm:text-sm">
                <Globe2 className="size-4 shrink-0" />
                {t('home.networkTitle')}
              </span>
              <h2 className="mt-4 text-balance text-2xl font-bold leading-tight text-foreground sm:mt-5 sm:text-3xl lg:text-4xl">
                {t('home.landingNetworkTitle')}
              </h2>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-muted sm:mt-4 sm:text-base lg:text-lg">
                {t('home.landingNetworkSubtitle')}
              </p>
              <div className="mt-6 grid gap-2.5 sm:mt-8 sm:grid-cols-2 sm:gap-3">
                {portHighlights.map((port) => (
                  <div key={port} className="flex min-w-0 items-center gap-3 rounded-xl border border-border bg-surface-elevated p-3.5 sm:rounded-2xl sm:p-4">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-primary-green">
                      <Anchor className="size-4" />
                    </span>
                    <span className="min-w-0 text-sm font-semibold text-foreground sm:text-base">{port}</span>
                  </div>
                ))}
              </div>
              <Link to={ROUTES.services} className="mt-6 inline-flex w-full sm:mt-8 sm:w-auto">
                <Button variant="outline" className="h-auto min-h-10 w-full whitespace-normal px-4 py-2.5 text-sm sm:w-auto">
                  {t('home.landingExploreRoutes')}
                  <ArrowRight className="size-4 shrink-0 rtl:rotate-180" />
                </Button>
              </Link>
            </motion.div>
            <div className="min-w-0">
              <WorldMap />
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-green/20 bg-accent-soft px-3 py-1 text-xs font-bold text-primary-green sm:text-sm">
              <Route className="size-4" />
              {t('home.processTitle')}
            </span>
            <h2 className="mt-4 text-balance text-2xl font-bold leading-tight text-foreground sm:mt-5 sm:text-3xl lg:text-4xl">
              {t('home.landingProcessTitle')}
            </h2>
            <p className="mt-3 text-pretty text-sm text-muted sm:mt-4 sm:text-base">{t('home.processSubtitle')}</p>
          </div>

          <motion.div
            className="relative mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4"
            variants={staggerContainer}
            {...getMotionProps()}
          >
            <div className="absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-primary-green/30 to-transparent lg:block" />
            {process.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div key={step.title} variants={fadeIn} className="relative min-w-0">
                  <Card className="h-full bg-surface-elevated">
                    <CardContent className="p-4 sm:p-5">
                      <div className="flex items-center gap-3 lg:block">
                        <div className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary-green text-white shadow-[var(--shadow-sm)] lg:mx-auto lg:size-12">
                          <Icon className="size-5" />
                        </div>
                        <span className="text-sm font-bold text-gold lg:mt-5 lg:block lg:text-center">
                          0{index + 1}
                        </span>
                      </div>
                      <h3 className="mt-3 text-base font-bold text-foreground sm:mt-4 sm:text-lg lg:text-center">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted lg:text-center">{step.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>

          <motion.div
            className="mt-8 grid gap-3 rounded-2xl border border-border bg-surface-elevated p-3 shadow-[var(--shadow-sm)] sm:mt-10 sm:rounded-3xl sm:p-4 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            {...getMotionProps()}
          >
            {operations.map((item) => (
              <motion.div key={item} variants={fadeIn} className="flex min-w-0 items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary-green" />
                <span className="text-sm font-semibold leading-relaxed text-foreground">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="cta-gradient relative mx-auto max-w-7xl overflow-hidden rounded-2xl px-4 py-10 text-white shadow-[var(--shadow-lg)] sm:rounded-[2rem] sm:px-8 sm:py-14 lg:px-10 lg:py-16">
          <div className="absolute -end-24 -top-24 size-72 rounded-full bg-white/10 blur-3xl" aria-hidden />
          <div className="absolute -bottom-24 -start-24 size-72 rounded-full bg-primary-green/30 blur-3xl" aria-hidden />
          <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-8">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider text-accent-on-dark sm:text-sm">{t('home.landingFinalBadge')}</p>
              <h2 className="mt-3 text-balance text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">{t('home.ctaTitle')}</h2>
              <p className="mt-3 text-pretty text-sm text-white/80 sm:mt-4 sm:text-base">{t('home.ctaSubtitle')}</p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:flex-col xl:flex-row">
              <Link to={ROUTES.quote} className="w-full lg:w-auto">
                <Button className="h-auto min-h-12 w-full whitespace-normal bg-surface-elevated px-4 py-3 text-sm text-primary-green shadow-md hover:bg-surface-muted sm:text-base lg:w-auto">
                  {t('quote.title')}
                  <ArrowRight className="size-4 shrink-0 rtl:rotate-180" />
                </Button>
              </Link>
              <Link to={ROUTES.contact} className="w-full lg:w-auto">
                <Button variant="outline" className="h-auto min-h-12 w-full whitespace-normal border-white/30 px-4 py-3 text-sm text-white hover:bg-white/10 sm:text-base lg:w-auto">
                  {t('contact.title')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
