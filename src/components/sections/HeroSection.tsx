import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { AnimatedButton } from '@/components/ui'
import { fadeIn, getMotionProps, staggerContainer } from '@/utils/motion'
import { cn } from '@/utils/cn'

interface HeroSectionProps {
  title: string
  subtitle: string
  ctaText?: string
  ctaLink?: string
  tagline?: string
  image?: string
  className?: string
}

export function HeroSection({
  title,
  subtitle,
  ctaText,
  ctaLink,
  tagline,
  image,
  className,
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden bg-gradient-to-b from-accent-soft to-surface py-14 sm:py-20 lg:py-28',
        className,
      )}
    >
      {image && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={staggerContainer}
          {...getMotionProps()}
        >
          {tagline && (
            <motion.p
              variants={fadeIn}
              className="mb-3 text-xs font-medium uppercase tracking-wider text-primary-green sm:mb-4 sm:text-sm"
            >
              {tagline}
            </motion.p>
          )}
          <motion.h1
            variants={fadeIn}
            className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="mt-4 text-base leading-relaxed text-muted sm:mt-6 sm:text-lg md:text-xl"
          >
            {subtitle}
          </motion.p>
          {ctaText && ctaLink && (
            <motion.div variants={fadeIn} className="mt-6 sm:mt-8">
              <Link to={ctaLink} className="inline-block w-full sm:w-auto">
                <AnimatedButton size="lg" className="w-full sm:w-auto">
                  {ctaText}
                  <ArrowRight className="size-4" />
                </AnimatedButton>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
