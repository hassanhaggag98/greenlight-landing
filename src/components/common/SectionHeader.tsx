import { motion } from 'framer-motion'
import { fadeIn, getMotionProps } from '@/utils/motion'
import { cn } from '@/utils/cn'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({ title, subtitle, align = 'center', className }: SectionHeaderProps) {
  return (
    <motion.div
      className={cn(
        'mb-8 px-1 sm:mb-10',
        align === 'center' && 'mx-auto max-w-3xl text-center',
        className,
      )}
      variants={fadeIn}
      {...getMotionProps()}
    >
      <h2 className="text-xl font-bold text-foreground sm:text-2xl lg:text-3xl">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-sm leading-relaxed text-muted sm:mt-3 sm:text-base">{subtitle}</p>
      )}
    </motion.div>
  )
}
