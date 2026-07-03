import { motion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import { prefersReducedMotion } from '@/utils/motion'

export function PageTransition() {
  const location = useLocation()

  if (prefersReducedMotion()) {
    return <Outlet />
  }

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <Outlet />
    </motion.div>
  )
}
