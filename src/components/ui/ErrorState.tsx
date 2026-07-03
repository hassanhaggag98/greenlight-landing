import { AlertCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from './Button'

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
  retryLabel?: string
}

export function ErrorState({
  title,
  message,
  onRetry,
  retryLabel,
}: ErrorStateProps) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-red-500/10 text-red-500">
        <AlertCircle className="size-7" />
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-medium text-foreground">{title ?? t('common.error')}</h3>
        <p className="max-w-sm text-sm text-muted">{message ?? t('common.errorMessage')}</p>
      </div>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          {retryLabel ?? t('common.retry')}
        </Button>
      )}
    </div>
  )
}
