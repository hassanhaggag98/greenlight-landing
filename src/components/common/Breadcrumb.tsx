import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/utils/cn'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const { t } = useTranslation()

  return (
    <nav
      aria-label={t('a11y.breadcrumb')}
      className={cn('scrollbar-hide flex flex-wrap items-center gap-1 overflow-x-auto text-sm text-muted', className)}
    >
      <Link to="/" className="shrink-0 hover:text-primary-green" aria-label={t('a11y.home')}>
        <Home className="size-4" />
      </Link>
      {items.map((item, i) => (
        <span key={item.label} className="flex shrink-0 items-center gap-1">
          <ChevronRight className="size-3.5 rtl:rotate-180" />
          {item.href && i < items.length - 1 ? (
            <Link to={item.href} className="max-w-[8rem] truncate hover:text-primary-green sm:max-w-none">
              {item.label}
            </Link>
          ) : (
            <span className="max-w-[10rem] truncate text-foreground sm:max-w-none">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
