import type { AxiosResponse } from 'axios'
import type { ApiEnvelope } from '@/types/api'

export function unwrap<T>(response: AxiosResponse<ApiEnvelope<T>>): T {
  return response.data.data
}

export function unwrapList<T>(response: AxiosResponse<ApiEnvelope<T[] | null>>): T[] {
  const data = response.data.data
  return Array.isArray(data) ? data : []
}
