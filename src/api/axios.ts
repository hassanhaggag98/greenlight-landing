import axios from 'axios'
import { STORAGE_KEYS } from '@/constants'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api'

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30_000,
})

apiClient.interceptors.request.use((config) => {
  const storedLanguage = localStorage.getItem(STORAGE_KEYS.language)
  let locale = 'en'
  if (storedLanguage) {
    try {
      const parsed = JSON.parse(storedLanguage) as { state?: { language?: string } }
      locale = parsed.state?.language === 'ar' ? 'ar' : 'en'
    } catch {
      locale = storedLanguage.includes('ar') ? 'ar' : 'en'
    }
  }

  config.params = {
    ...config.params,
    locale,
  }

  return config
})

export default apiClient
