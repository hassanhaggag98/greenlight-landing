import type { ReactNode } from 'react'
import { useQuery } from '@tanstack/react-query'
import { publicApi } from '@/api/public.api'
import { ErrorState, LoadingSpinner } from '@/components/ui'

interface QueryPageWrapperProps {
  queryKey: readonly unknown[]
  queryFn: () => Promise<unknown>
  children: (data: never) => ReactNode
  loadingMinHeight?: string
}

export function QueryPageWrapper({
  queryKey,
  queryFn,
  children,
  loadingMinHeight = '40vh',
}: QueryPageWrapperProps) {
  const { data, isLoading, isError, refetch } = useQuery({
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

  if (isError) {
    return <ErrorState onRetry={() => refetch()} />
  }

  return <>{children(data as never)}</>
}

export function usePublicSettings() {
  return useQuery({
    queryKey: ['public', 'settings'],
    queryFn: () => publicApi.getSettings(),
  })
}
