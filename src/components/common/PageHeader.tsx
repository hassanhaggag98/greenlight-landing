import { motion } from 'framer-motion'
import { Breadcrumb, type BreadcrumbItem } from './Breadcrumb'
import { fadeIn, getMotionProps, staggerContainer } from '@/utils/motion'
import { cn } from '@/utils/cn'

interface PageHeaderProps {
  title: string
  subtitle?: string
  breadcrumbs?: BreadcrumbItem[]
  className?: string
  centered?: boolean
}

export function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  className,
  centered = true,
}: PageHeaderProps) {
  return (
    <section className={cn('bg-gradient-to-b from-accent-soft to-surface py-10 sm:py-14 lg:py-16', className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="mb-3 sm:mb-4">
            <Breadcrumb items={breadcrumbs} />
          </div>
        )}
        <motion.div
          className={cn(centered && 'mx-auto max-w-3xl text-center')}
          variants={staggerContainer}
          {...getMotionProps()}
        >
          <motion.h1
            variants={fadeIn}
            className="text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p variants={fadeIn} className="mt-3 text-base leading-relaxed text-muted sm:mt-4 sm:text-lg">
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
