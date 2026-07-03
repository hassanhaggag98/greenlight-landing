import { motion } from 'framer-motion'
import { fadeIn, getMotionProps, staggerContainer } from '@/utils/motion'
import { cn } from '@/utils/cn'

export interface TimelineItem {
  step: number
  title: string
  description: string
}

interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

function StepCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface-elevated p-4 shadow-sm sm:p-5">
      <h3 className="font-semibold text-foreground">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{description}</p>
    </div>
  )
}

function StepBadge({ step }: { step: number }) {
  return (
    <div className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-green text-sm font-bold text-white shadow-md ring-4 ring-surface sm:size-10">
      {step}
    </div>
  )
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <motion.div
      className={cn('relative mx-auto max-w-4xl', className)}
      variants={staggerContainer}
      {...getMotionProps()}
    >
      {/* Center line — desktop only */}
      <div
        className="absolute start-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-border md:block"
        aria-hidden
      />

      <ol className="space-y-8 md:space-y-10">
        {items.map((item, i) => {
          const isLeft = i % 2 === 0

          return (
            <motion.li key={item.step} variants={fadeIn} className="relative">
              {/* Mobile + tablet: simple vertical list */}
              <div className="flex items-start gap-4 md:hidden">
                <div className="relative flex flex-col items-center">
                  <StepBadge step={item.step} />
                  {i < items.length - 1 && (
                    <div className="mt-2 h-full min-h-8 w-0.5 bg-border" aria-hidden />
                  )}
                </div>
                <div className="min-w-0 flex-1 pb-2">
                  <StepCard title={item.title} description={item.description} />
                </div>
              </div>

              {/* Desktop: alternating left / right */}
              <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8">
                <div className={cn('flex justify-end', !isLeft && 'invisible')}>
                  {isLeft && (
                    <div className="max-w-sm">
                      <StepCard title={item.title} description={item.description} />
                    </div>
                  )}
                </div>

                <div className="flex justify-center">
                  <StepBadge step={item.step} />
                </div>

                <div className={cn('flex justify-start', isLeft && 'invisible')}>
                  {!isLeft && (
                    <div className="max-w-sm">
                      <StepCard title={item.title} description={item.description} />
                    </div>
                  )}
                </div>
              </div>
            </motion.li>
          )
        })}
      </ol>
    </motion.div>
  )
}
