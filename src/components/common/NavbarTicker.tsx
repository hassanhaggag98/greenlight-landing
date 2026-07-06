import { useTranslation } from 'react-i18next'
import { cn } from '@/utils/cn'

const TICKER_KEYS = ['since1996', 'importFocus', 'customs', 'support', 'freeQuote'] as const

interface NavbarTickerProps {
  className?: string
}

export function NavbarTicker({ className }: NavbarTickerProps) {
  const { t } = useTranslation()

  const items = TICKER_KEYS.map((key) => t(`nav.ticker.${key}`))
  const track = [...items, ...items]

  return (
    <div
      className={cn(
        'relative min-w-0 overflow-hidden rounded-lg border border-primary-green/20 bg-accent-soft px-2.5 py-1.5 shadow-sm',
        className,
      )}
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-5 bg-gradient-to-e from-accent-soft to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-5 bg-gradient-to-e from-transparent to-accent-soft" />

      <div className="nav-ticker-track flex w-max items-center gap-6">
        {track.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex shrink-0 items-center gap-6 text-[11px] font-bold tracking-wide text-primary-green sm:text-xs"
          >
            {item}
            <span className="size-1 rounded-full bg-gold/80" />
          </span>
        ))}
      </div>
    </div>
  )
}
