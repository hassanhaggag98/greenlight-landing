import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Testimonial } from '@/types/public'
import { Button } from '@/components/ui'
import { prefersReducedMotion } from '@/utils/motion'
import { cn } from '@/utils/cn'

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
  className?: string
}

export function TestimonialCarousel({ testimonials, className }: TestimonialCarouselProps) {
  const { t } = useTranslation()
  const [index, setIndex] = useState(0)

  if (!testimonials.length) return null

  const current = testimonials[index]!

  const prev = () => setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1))
  const next = () => setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1))

  return (
    <div className={cn('relative mx-auto max-w-3xl px-2 sm:px-0', className)}>
      <Quote className="mx-auto mb-4 size-7 text-primary-green/40 sm:size-8" />
      <AnimatePresence mode="wait">
        <motion.blockquote
          key={current.id}
          initial={prefersReducedMotion() ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: prefersReducedMotion() ? 0 : 0.3 }}
          className="text-center"
        >
          <p className="text-base leading-relaxed italic text-foreground sm:text-lg">
            &ldquo;{current.content}&rdquo;
          </p>
          <footer className="mt-4">
            <p className="font-semibold text-foreground">{current.name}</p>
            {(current.role || current.company) && (
              <p className="mt-1 text-sm text-muted">
                {[current.role, current.company].filter(Boolean).join(' · ')}
              </p>
            )}
          </footer>
        </motion.blockquote>
      </AnimatePresence>

      {testimonials.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-3 sm:gap-4">
          <Button variant="ghost" size="sm" onClick={prev} aria-label={t('a11y.previousTestimonial')}>
            <ChevronLeft className="size-4 rtl:rotate-180" />
          </Button>
          <div className="flex gap-1.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                className={cn(
                  'size-2 rounded-full transition-colors',
                  i === index ? 'bg-primary-green' : 'bg-border',
                )}
                onClick={() => setIndex(i)}
                aria-label={t('a11y.goToTestimonial', { index: i + 1 })}
              />
            ))}
          </div>
          <Button variant="ghost" size="sm" onClick={next} aria-label={t('a11y.nextTestimonial')}>
            <ChevronRight className="size-4 rtl:rotate-180" />
          </Button>
        </div>
      )}
    </div>
  )
}
