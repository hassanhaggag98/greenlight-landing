import { Search, X } from 'lucide-react'
import { forwardRef, type InputHTMLAttributes } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/utils/cn'

export interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, value, onClear, ...props }, ref) => {
    const { t } = useTranslation()

    return (
      <div className={cn('relative', className)}>
        <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
        <input
          ref={ref}
          value={value}
          className={cn(
            'flex h-10 w-full rounded-lg border border-border bg-surface py-2 ps-10 pe-10 text-sm',
            'placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]',
          )}
          {...props}
        />
        {value && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute end-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
            aria-label={t('a11y.clearSearch')}
          >
            <X className="size-4" />
          </button>
        )}
      </div>
    )
  },
)

SearchInput.displayName = 'SearchInput'
