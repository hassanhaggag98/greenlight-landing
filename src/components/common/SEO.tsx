import { useEffect } from 'react'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
}

export function SEO({ title, description, keywords, image, url }: SEOProps) {
  const siteName = 'Green Light Group'
  const fullTitle = title ? `${title} | ${siteName}` : siteName

  useEffect(() => {
    document.title = fullTitle

    const setMeta = (name: string, content: string, attr = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    if (description) setMeta('description', description)
    if (keywords) setMeta('keywords', keywords)
    if (image) setMeta('og:image', image, 'property')
    if (url) setMeta('og:url', url, 'property')
    setMeta('og:title', fullTitle, 'property')
    if (description) setMeta('og:description', description, 'property')
  }, [fullTitle, description, keywords, image, url])

  return null
}
