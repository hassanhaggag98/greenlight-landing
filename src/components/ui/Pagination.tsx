import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from './Button'
import { cn } from '@/utils/cn'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  const { t } = useTranslation()

  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const visible = pages.filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1,
  )

  return (
    <nav className={cn('flex items-center justify-center gap-1', className)} aria-label={t('a11y.pagination')}>
      <Button
        variant="ghost"
        size="sm"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label={t('a11y.previousPage')}
      >
        <ChevronLeft className="size-4" />
      </Button>
      {visible.map((page, i) => {
        const prev = visible[i - 1]
        const showEllipsis = prev !== undefined && page - prev > 1
        return (
          <span key={page} className="flex items-center gap-1">
            {showEllipsis && <span className="px-1 text-muted">…</span>}
            <Button
              variant={page === currentPage ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          </span>
        )
      })}
      <Button
        variant="ghost"
        size="sm"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label={t('a11y.nextPage')}
      >
        <ChevronRight className="size-4" />
      </Button>
    </nav>
  )
}
