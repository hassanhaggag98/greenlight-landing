import type { ReactNode } from 'react'
import { useQuery } from '@tanstack/react-query'
import { LoadingSpinner } from '@/components/ui'

interface QueryPageWrapperProps {
  queryKey: readonly unknown[]
  queryFn: () => Promise<unknown>
  children: (data: never) => ReactNode
  loadingMinHeight?: string
  fallbackData?: unknown
}

export function QueryPageWrapper({
  queryKey,
  queryFn,
  children,
  loadingMinHeight = '40vh',
  fallbackData,
}: QueryPageWrapperProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey,
    queryFn,
  })

  if (isLoading) {
    return (
      <div className={`flex min-h-[${loadingMinHeight}] items-center justify-center`}>
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  const resolvedData = isError ? fallbackData : data

  if (resolvedData == null) {
    return null
  }

  return <>{children(resolvedData as never)}</>
}

export function usePublicSettings() {
  return useQuery({
    queryKey: ['public', 'settings'],
    queryFn: () => import('@/api/public.api').then(({ publicApi }) => publicApi.getSettings()),
  })
}
