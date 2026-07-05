import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { HERO_SLIDES } from '@/constants/heroSlides'
import { Button } from '@/components/ui'
import { prefersReducedMotion } from '@/utils/motion'
import { cn } from '@/utils/cn'

const AUTOPLAY_MS = 5000

const captionVariants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25 } },
}

export function HeroSlider({ className }: { className?: string }) {
  const { t } = useTranslation()
  const reduced = prefersReducedMotion()
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)

  const slideCount = HERO_SLIDES.length
  const current = HERO_SLIDES[index]!

  const goTo = useCallback(
    (next: number) => {
      const normalized = (next + slideCount) % slideCount
      setDirection(normalized > index || (index === slideCount - 1 && normalized === 0) ? 1 : -1)
      setIndex(normalized)
    },
    [index, slideCount],
  )

  const prev = useCallback(() => goTo(index - 1), [goTo, index])
  const next = useCallback(() => goTo(index + 1), [goTo, index])

  useEffect(() => {
    if (reduced || paused || slideCount <= 1) return

    const timer = window.setInterval(() => {
      setDirection(1)
      setIndex((i) => (i + 1) % slideCount)
    }, AUTOPLAY_MS)

    return () => window.clearInterval(timer)
  }, [paused, reduced, slideCount])

  return (
    <div
      className={cn(
        'hero-slider-shell group relative mx-auto w-full max-w-md sm:max-w-lg lg:max-w-none',
        className,
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="absolute -inset-5 rounded-[2rem] bg-primary-green/12 blur-3xl dark:bg-accent-on-dark/10" aria-hidden />

      <div className="relative overflow-hidden rounded-[1.75rem] border border-border/80 bg-surface-elevated shadow-[0_24px_70px_rgba(10,22,40,0.12)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
        <div className="relative aspect-[16/11] overflow-hidden bg-dark-navy">
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.div
              key={current.src}
              custom={direction}
              className="absolute inset-0"
              initial={reduced ? false : { opacity: 0, x: direction * 40, scale: 1.03 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, x: direction * -40, scale: 0.98 }}
              transition={{ duration: reduced ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.img
                src={current.src}
                alt={t(current.altKey)}
                className="size-full object-cover"
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                draggable={false}
                animate={reduced ? undefined : { scale: [1, 1.06] }}
                transition={{ duration: AUTOPLAY_MS / 1000 + 0.8, ease: 'linear' }}
              />
            </motion.div>
          </AnimatePresence>

          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10"
            aria-hidden
          />

          {slideCount > 1 && (
            <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-3 sm:p-4">
              <div className="h-1 w-28 overflow-hidden rounded-full bg-white/30 backdrop-blur-sm">
                <span
                  key={index}
                  className={cn('hero-slider-progress block h-full rounded-full bg-gold', paused && 'animation-paused')}
                  style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
                />
              </div>

              <div className="flex gap-1.5 opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={prev}
                  aria-label={t('a11y.previousSlide')}
                  className="size-9 rounded-full border border-white/30 bg-black/30 p-0 text-white backdrop-blur-md hover:bg-black/50"
                >
                  <ChevronLeft className="size-4 rtl:rotate-180" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={next}
                  aria-label={t('a11y.nextSlide')}
                  className="size-9 rounded-full border border-white/30 bg-black/30 p-0 text-white backdrop-blur-md hover:bg-black/50"
                >
                  <ChevronRight className="size-4 rtl:rotate-180" />
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="relative border-t border-border/70 bg-accent-soft/40 px-4 py-3.5 dark:border-white/10 dark:bg-white/[0.04] sm:px-5 sm:py-4">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.titleKey}
              variants={reduced ? undefined : captionVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="min-h-[4.5rem]"
            >
              <span className="inline-flex rounded-full border border-primary-green/20 bg-surface-elevated px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-green dark:border-accent-on-dark/30 dark:bg-white/10 dark:text-gold sm:text-xs">
                {t('home.heroPortLabel')}
              </span>
              <h3 className="mt-2 text-base font-extrabold leading-snug text-foreground sm:text-lg dark:text-white">
                {t(current.titleKey)}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted dark:text-white/78">
                {t(current.captionKey)}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {slideCount > 1 && (
          <div className="grid grid-cols-5 gap-1.5 border-t border-border/60 bg-surface-elevated p-2 dark:border-white/10 dark:bg-transparent sm:gap-2 sm:p-2.5">
            {HERO_SLIDES.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={t('a11y.goToSlide', { index: i + 1 })}
                aria-current={i === index ? 'true' : undefined}
                className={cn(
                  'relative aspect-[5/3] overflow-hidden rounded-lg border transition-all duration-300',
                  i === index
                    ? 'border-primary-green ring-2 ring-primary-green/20 dark:border-accent-on-dark dark:ring-accent-on-dark/25'
                    : 'border-border/70 opacity-65 hover:opacity-100 dark:border-white/10',
                )}
              >
                <img src={slide.src} alt="" className="size-full object-cover" loading="lazy" decoding="async" />
                {i === index && (
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary-green dark:bg-accent-on-dark" aria-hidden />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
