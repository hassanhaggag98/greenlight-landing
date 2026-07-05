import { useId } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/utils/cn'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  label?: string
  showLabel?: boolean
}

const sizes = {
  sm: { box: 'size-10', logo: 'size-5', ring: 'size-10', stroke: 2.5 },
  md: { box: 'size-16', logo: 'size-8', ring: 'size-16', stroke: 3 },
  lg: { box: 'size-24', logo: 'size-12', ring: 'size-24', stroke: 3.5 },
} as const

export function LoadingSpinner({
  size = 'md',
  className,
  label,
  showLabel = false,
}: LoadingSpinnerProps) {
  const { t } = useTranslation()
  const gradientId = useId()
  const config = sizes[size]
  const ariaLabel = label ?? t('common.loading')

  return (
    <div
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
      className={cn('flex flex-col items-center justify-center gap-3', className)}
    >
      <div className={cn('relative flex items-center justify-center', config.box)}>
        <span className="loader-green-glow absolute inset-0 rounded-full" aria-hidden />

        <svg
          className={cn('absolute inset-0 animate-spin motion-reduce:animate-none', config.ring)}
          viewBox="0 0 48 48"
          fill="none"
          aria-hidden
        >
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="currentColor"
            strokeWidth={config.stroke}
            className="text-primary-green/15"
          />
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke={`url(#${gradientId})`}
            strokeWidth={config.stroke}
            strokeLinecap="round"
            strokeDasharray="72 54"
          />
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--primary-green)" />
              <stop offset="55%" stopColor="var(--secondary-green)" />
              <stop offset="100%" stopColor="var(--gold)" />
            </linearGradient>
          </defs>
        </svg>

        <span
          className={cn(
            'loader-ring-pulse absolute inset-1 rounded-full border border-primary-green/20',
            size === 'lg' && 'inset-2',
          )}
          aria-hidden
        />

        <img
          src="/logo.png"
          alt=""
          className={cn('relative z-10 object-contain loader-logo-breathe', config.logo)}
          width={48}
          height={48}
          decoding="async"
        />
      </div>

      {showLabel && (
        <p className="text-sm font-medium text-muted">{ariaLabel}</p>
      )}
    </div>
  )
}
