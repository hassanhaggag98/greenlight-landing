import type { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui'
import { fadeIn, getMotionProps } from '@/utils/motion'
import { cn } from '@/utils/cn'

interface StatCardProps {
  label: string
  value: string | number
  icon?: LucideIcon
  className?: string
}

export function StatCard({ label, value, icon: Icon, className }: StatCardProps) {
  return (
    <motion.div variants={fadeIn} {...getMotionProps()}>
      <Card className={cn('text-center', className)}>
        <CardContent className="flex flex-col items-center gap-3 px-6 py-8">
          {Icon && (
            <div className="flex size-11 items-center justify-center rounded-xl bg-accent-soft text-primary-green">
              <Icon className="size-5" />
            </div>
          )}
          <div className="stat-value">{value}</div>
          <p className="text-sm font-medium text-muted">{label}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
