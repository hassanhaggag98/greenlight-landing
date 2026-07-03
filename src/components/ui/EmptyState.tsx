import { Inbox } from 'lucide-react'
import { Button } from './Button'

interface EmptyStateProps {
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-surface-elevated text-muted">
        <Inbox className="size-7" />
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-medium text-foreground">{title}</h3>
        {description && <p className="max-w-sm text-sm text-muted">{description}</p>}
      </div>
      {actionLabel && onAction && (
        <Button variant="outline" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
