import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Home } from 'lucide-react'
import { SEO } from '@/components/common'
import { Button } from '@/components/ui'
import { ROUTES } from '@/constants'

export default function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <>
      <SEO title={t('notFound.title')} />
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <p className="text-6xl font-bold text-primary-green">404</p>
        <h1 className="mt-4 text-2xl font-bold text-foreground">{t('notFound.title')}</h1>
        <p className="mt-2 max-w-md text-muted">{t('notFound.subtitle')}</p>
        <Link to={ROUTES.home} className="mt-8">
          <Button>
            <Home className="size-4" />
            {t('notFound.backHome')}
          </Button>
        </Link>
      </div>
    </>
  )
}
