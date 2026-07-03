import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { EmptyState } from './EmptyState'
import { LoadingSpinner } from './LoadingSpinner'
import { Pagination } from './Pagination'
import { SearchInput } from './SearchInput'
import { cn } from '@/utils/cn'

export interface DataTableColumn<T> {
  key: string
  header: string
  render?: (row: T) => React.ReactNode
  sortable?: boolean
}

interface DataTableProps<T extends Record<string, unknown> = Record<string, unknown>> {
  columns: DataTableColumn<T>[]
  data: T[]
  isLoading?: boolean
  searchable?: boolean
  searchKeys?: (keyof T & string)[] | string[]
  pageSize?: number
  onRowClick?: (row: T) => void
  emptyTitle?: string
  emptyDescription?: string
  className?: string
}

export function DataTable<T extends Record<string, unknown> = Record<string, unknown>>({
  columns,
  data,
  isLoading,
  searchable = true,
  searchKeys,
  pageSize = 10,
  onRowClick,
  emptyTitle,
  emptyDescription,
  className,
}: DataTableProps<T>) {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  const filtered = useMemo(() => {
    let rows = [...data]
    if (search && searchKeys?.length) {
      const q = search.toLowerCase()
      rows = rows.filter((row) =>
        searchKeys.some((key) => String(row[key] ?? '').toLowerCase().includes(q)),
      )
    }
    if (sortKey) {
      rows.sort((a, b) => {
        const av = String(a[sortKey] ?? '')
        const bv = String(b[sortKey] ?? '')
        return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
      })
    }
    return rows
  }, [data, search, searchKeys, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize)

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className={cn('space-y-4', className)}>
      {searchable && (
        <SearchInput
          placeholder={t('common.search')}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
          onClear={() => setSearch('')}
          className="max-w-sm"
        />
      )}

      {paginated.length === 0 ? (
        <EmptyState
          title={emptyTitle ?? t('common.noResults')}
          description={emptyDescription}
        />
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-surface-elevated">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={cn(
                      'px-4 py-3 text-start font-medium text-muted',
                      col.sortable && 'cursor-pointer select-none hover:text-foreground',
                    )}
                    onClick={col.sortable ? () => toggleSort(col.key) : undefined}
                  >
                    {col.header}
                    {sortKey === col.key && (sortDir === 'asc' ? ' ↑' : ' ↓')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((row, i) => (
                <tr
                  key={i}
                  className={cn(
                    'border-t border-border',
                    onRowClick && 'cursor-pointer hover:bg-surface-elevated',
                  )}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-foreground">
                      {col.render ? col.render(row) : String(row[col.key] ?? '—')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  )
}
