import { motion } from 'framer-motion'
import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { Button, type ButtonProps } from './Button'
import { prefersReducedMotion } from '@/utils/motion'
import { cn } from '@/utils/cn'

export const AnimatedButton = forwardRef<
  HTMLButtonElement,
  ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  if (prefersReducedMotion()) {
    return (
      <Button ref={ref} className={className} {...props}>
        {children}
      </Button>
    )
  }

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={cn('inline-flex w-full sm:w-auto', className)}>
      <Button ref={ref} className="w-full sm:w-auto" {...props}>
        {children}
      </Button>
    </motion.div>
  )
})

AnimatedButton.displayName = 'AnimatedButton'
