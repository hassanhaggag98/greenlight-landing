import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { HERO_SLIDES } from '@/constants/heroSlides'
import { prefersReducedMotion } from '@/utils/motion'
import { cn } from '@/utils/cn'

const AUTOPLAY_MS = 5500
const EASE = [0.22, 1, 0.36, 1] as const

const captionItem = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASE },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

function NavButton({
  onClick,
  label,
  children,
  className,
}: {
  onClick: () => void
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        'hero-slider-nav flex size-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur-md transition-colors duration-200 hover:border-white/45 hover:bg-black/55 sm:size-11',
        className,
      )}
    >
      {children}
    </button>
  )
}

export function HeroSlider({ className }: { className?: string }) {
  const { t } = useTranslation()
  const reduced = prefersReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const thumbRailRef = useRef<HTMLDivElement>(null)

  const slideCount = HERO_SLIDES.length
  const current = HERO_SLIDES[index]!

  const goTo = useCallback(
    (next: number) => {
      setIndex((next + slideCount) % slideCount)
    },
    [slideCount],
  )

  const prev = useCallback(() => goTo(index - 1), [goTo, index])
  const next = useCallback(() => goTo(index + 1), [goTo, index])

  useEffect(() => {
    if (reduced || paused || slideCount <= 1) return

    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % slideCount)
    }, AUTOPLAY_MS)

    return () => window.clearInterval(timer)
  }, [paused, reduced, slideCount])

  useEffect(() => {
    const rail = thumbRailRef.current
    if (!rail) return

    const active = rail.querySelector<HTMLElement>('[data-active="true"]')
    if (!active) return

    const target = active.offsetLeft - rail.clientWidth / 2 + active.clientWidth / 2
    rail.scrollTo({ left: target, behavior: reduced ? 'auto' : 'smooth' })
  }, [index, reduced])

  return (
    <div
      className={cn('hero-slider-shell group relative isolate w-full min-w-0 overflow-hidden', className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-green/10 via-transparent to-gold/5 dark:from-accent-on-dark/8"
        aria-hidden
      />

      <div className="hero-slider-card relative w-full overflow-hidden rounded-2xl border border-border/60 bg-surface-elevated shadow-[0_20px_60px_rgba(10,22,40,0.14)] dark:border-white/10 dark:bg-white/[0.04] sm:rounded-[1.65rem]">
        <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-gradient-to-br from-dark-navy via-navy-mid to-dark-navy">
          <div className="absolute inset-0 overflow-hidden">
            <AnimatePresence initial={false}>
              <motion.div
                key={index}
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.45, ease: 'easeInOut' }}
                className="absolute inset-0 flex items-center justify-center p-3 sm:p-4"
              >
                <img
                  src={current.src}
                  alt={t(current.altKey)}
                  className="max-h-full max-w-full rounded-lg object-contain shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15" aria-hidden />

          {slideCount > 1 && (
            <>
              <div className="absolute inset-x-0 top-0 z-10 h-0.5 bg-white/10">
                <span
                  key={index}
                  className={cn(
                    'hero-slider-progress block h-full bg-gradient-to-r from-gold to-primary-green',
                    paused && 'animation-paused',
                  )}
                  style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
                />
              </div>

              <div className="absolute end-3 top-3 z-10 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[11px] font-semibold tabular-nums text-white backdrop-blur-md sm:end-4 sm:top-4 sm:text-xs">
                <span dir="ltr">{index + 1} / {slideCount}</span>
              </div>

              <NavButton
                onClick={prev}
                label={t('a11y.previousSlide')}
                className="absolute start-2 top-1/2 z-10 -translate-y-1/2 sm:start-3 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
              >
                <ChevronLeft className="size-5 rtl:rotate-180" />
              </NavButton>

              <NavButton
                onClick={next}
                label={t('a11y.nextSlide')}
                className="absolute end-2 top-1/2 z-10 -translate-y-1/2 sm:end-3 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
              >
                <ChevronRight className="size-5 rtl:rotate-180" />
              </NavButton>
            </>
          )}
        </div>

        <div className="border-t border-border/60 bg-surface-elevated px-4 py-4 dark:border-white/10 dark:bg-white/[0.05] sm:px-5 sm:py-4">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.titleKey}
              initial={reduced ? false : 'hidden'}
              animate="visible"
              exit="exit"
              variants={reduced ? undefined : captionItem}
              className="hero-slider-caption-block flex min-h-[7.5rem] flex-col gap-2 text-start sm:min-h-[7rem]"
            >
              <span className="inline-flex w-fit rounded-full border border-primary-green/20 bg-accent-soft px-3 py-0.5 text-[10px] font-bold tracking-wide text-primary-green dark:border-accent-on-dark/30 dark:bg-white/10 dark:text-gold sm:text-xs">
                {t('home.heroPortLabel')}
              </span>
              <h3 className="hero-slider-title text-base font-extrabold leading-snug sm:text-lg">
                {t(current.titleKey)}
              </h3>
              <p className="hero-slider-caption line-clamp-2 text-sm font-medium leading-relaxed sm:text-[0.95rem]">
                {t(current.captionKey)}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {slideCount > 1 && (
          <div className="relative overflow-hidden border-t border-border/50 bg-surface-muted/50 px-3 py-3 dark:border-white/10 dark:bg-black/20 sm:px-4">
            <div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-6 bg-gradient-to-r from-surface-muted to-transparent dark:from-black/40" aria-hidden />
            <div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-6 bg-gradient-to-l from-surface-muted to-transparent dark:from-black/40" aria-hidden />

            <div ref={thumbRailRef} className="hero-slider-thumbs flex h-[3.75rem] gap-2 overflow-x-auto scroll-smooth sm:h-16">
              {HERO_SLIDES.map((slide, i) => (
                <button
                  key={slide.src}
                  type="button"
                  data-active={i === index ? 'true' : undefined}
                  onClick={() => goTo(i)}
                  aria-label={t('a11y.goToSlide', { index: i + 1 })}
                  aria-current={i === index ? 'true' : undefined}
                  className={cn(
                    'relative h-full w-14 shrink-0 overflow-hidden rounded-lg border-2 transition-[opacity,border-color,box-shadow] duration-200 sm:w-16',
                    i === index
                      ? 'hero-slider-thumb-active border-primary-green opacity-100 dark:border-accent-on-dark'
                      : 'border-transparent opacity-50 hover:opacity-80',
                  )}
                >
                  <img src={slide.src} alt="" className="size-full object-cover" loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
