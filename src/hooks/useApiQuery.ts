import { useQuery, type UseQueryOptions } from '@tanstack/react-query'

export function useApiQuery<T>(
  key: readonly unknown[],
  queryFn: () => Promise<T>,
  options?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>,
) {
  return useQuery({
    queryKey: key,
    queryFn,
    ...options,
  })
}
