import type { Transition, Variants } from 'framer-motion'

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export const fadeIn: Variants = {
  hidden: { opacity: 0, y: prefersReducedMotion() ? 0 : 12 },
  visible: { opacity: 1, y: 0 },
}

export const fadeInTransition: Transition = {
  duration: prefersReducedMotion() ? 0 : 0.35,
  ease: 'easeOut',
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: prefersReducedMotion() ? 0 : 0.08,
    },
  },
}

export function getMotionProps() {
  return {
    initial: prefersReducedMotion() ? false : ('hidden' as const),
    animate: 'visible' as const,
    transition: fadeInTransition,
  }
}
