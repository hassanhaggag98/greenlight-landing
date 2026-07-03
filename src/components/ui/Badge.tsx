import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

const variants = {
  default: 'bg-accent-soft text-primary-green',
  secondary: 'bg-surface-elevated text-muted border border-border',
  gold: 'bg-gold/15 text-[color-mix(in_srgb,var(--gold)_80%,black)]',
  success: 'bg-emerald-500/10 text-emerald-600',
  warning: 'bg-amber-500/10 text-amber-600',
  danger: 'bg-red-500/10 text-red-600',
} as const

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof variants
}

export function Badge({
  className,
  variant = 'default',
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}
