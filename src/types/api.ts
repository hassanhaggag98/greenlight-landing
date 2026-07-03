export interface ApiEnvelope<T> {
  success: boolean
  message: string
  data: T
}

export interface PaginatedResponse<T> {
  data: T[]
  meta?: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

export interface BaseEntity {
  id: number | string
  created_at?: string
  updated_at?: string
  [key: string]: unknown
}

export interface TranslatableFields {
  title?: string
  slug?: string
  name?: string
  description?: string
  short_description?: string
  content?: string
}
