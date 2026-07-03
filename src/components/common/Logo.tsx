import { useTranslation } from 'react-i18next'
import { cn } from '@/utils/cn'

interface LogoProps {
  className?: string
  imageClassName?: string
  nameClassName?: string
  showName?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 'h-9 w-9',
  md: 'h-11 w-11',
  lg: 'h-14 w-14',
}

export function Logo({
  className,
  imageClassName,
  nameClassName,
  showName = false,
  size = 'md',
}: LogoProps) {
  const { t } = useTranslation()

  return (
    <span className={cn('flex min-w-0 items-center gap-2.5', className)}>
      <img
        src="/logo.png"
        alt={t('common.appName')}
        className={cn('shrink-0 object-contain', sizes[size], imageClassName)}
        width={44}
        height={44}
        decoding="async"
      />
      {showName && (
        <span
          className={cn(
            'truncate text-sm font-semibold text-foreground sm:text-base sm:max-w-[11rem] md:max-w-none',
            nameClassName,
          )}
        >
          {t('common.appName')}
        </span>
      )}
    </span>
  )
}
