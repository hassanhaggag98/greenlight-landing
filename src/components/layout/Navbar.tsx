import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronDown, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { ROUTES } from '@/constants'
import { LanguageSwitcher, Logo, NavbarTicker, ThemeSwitcher } from '@/components/common'
import { Button } from '@/components/ui'
import { cn } from '@/utils/cn'

const PRIMARY_NAV = [
  { to: ROUTES.home, key: 'home' },
  { to: ROUTES.about, key: 'about' },
  { to: ROUTES.services, key: 'services' },
  { to: ROUTES.contact, key: 'contact' },
] as const

const SECONDARY_NAV = [
  { to: ROUTES.industries, key: 'industries' },
  { to: ROUTES.logistics, key: 'logistics' },
  { to: ROUTES.banking, key: 'banking' },
  { to: ROUTES.certificates, key: 'certificates' },
  { to: ROUTES.news, key: 'news' },
] as const

const ALL_NAV = [...PRIMARY_NAV, ...SECONDARY_NAV]

const DESKTOP_NAV_BREAKPOINT = 1280

export function Navbar() {
  const { t } = useTranslation()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const moreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    setMobileOpen(false)
    setMoreOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= DESKTOP_NAV_BREAKPOINT) setMobileOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (!moreOpen) return

    const onPointerDown = (event: MouseEvent) => {
      if (!moreRef.current?.contains(event.target as Node)) {
        setMoreOpen(false)
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMoreOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [moreOpen])

  const linkClass = (isActive: boolean, compact = false) =>
    cn(
      'rounded-lg font-medium transition-colors whitespace-nowrap',
      compact ? 'px-2 py-1.5 text-xs 2xl:px-2.5 2xl:py-2 2xl:text-sm' : 'px-2.5 py-2 text-sm',
      isActive
        ? 'bg-accent-soft text-primary-green'
        : 'text-muted hover:bg-surface-muted hover:text-foreground',
    )

  const secondaryActive = SECONDARY_NAV.some((link) => location.pathname === link.to)

  return (
    <>
      <header className="sticky top-0 z-[110] border-b border-border bg-surface-elevated/95 shadow-[var(--shadow-sm)] backdrop-blur-md dark:bg-surface/95">
        <div className="mx-auto flex h-14 min-h-14 max-w-7xl items-center gap-2 px-3 sm:h-16 sm:gap-3 sm:px-6 xl:px-8">
          <Link to={ROUTES.home} className="flex shrink-0 items-center" onClick={() => setMobileOpen(false)}>
            <Logo
              size="sm"
              showName
              nameClassName="hidden xl:inline xl:max-w-[9rem] xl:truncate 2xl:max-w-[11rem]"
              imageClassName="sm:h-10 sm:w-10"
            />
          </Link>

          <NavbarTicker className="min-w-0 flex-1 xl:hidden" />

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 xl:flex 2xl:gap-1">
            {PRIMARY_NAV.map((link) => (
              <NavLink key={link.to} to={link.to} className={({ isActive }) => linkClass(isActive, true)}>
                {t(`nav.${link.key}`)}
              </NavLink>
            ))}

            <div ref={moreRef} className="relative 2xl:hidden">
              <button
                type="button"
                onClick={() => setMoreOpen((open) => !open)}
                className={cn(
                  linkClass(secondaryActive, true),
                  'inline-flex items-center gap-1',
                )}
                aria-expanded={moreOpen}
                aria-haspopup="menu"
              >
                {t('nav.more')}
                <ChevronDown className={cn('size-3.5 transition-transform', moreOpen && 'rotate-180')} />
              </button>

              {moreOpen && (
                <div
                  role="menu"
                  className="absolute top-[calc(100%+0.35rem)] z-50 min-w-[12rem] rounded-xl border border-border bg-surface-elevated p-1.5 shadow-[var(--shadow-lg)] start-0"
                >
                  {SECONDARY_NAV.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      role="menuitem"
                      onClick={() => setMoreOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'block rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                          isActive
                            ? 'bg-accent-soft text-primary-green'
                            : 'text-foreground hover:bg-surface-muted',
                        )
                      }
                    >
                      {t(`nav.${link.key}`)}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            <div className="hidden items-center gap-0.5 2xl:flex 2xl:gap-1">
              {SECONDARY_NAV.map((link) => (
                <NavLink key={link.to} to={link.to} className={({ isActive }) => linkClass(isActive, true)}>
                  {t(`nav.${link.key}`)}
                </NavLink>
              ))}
            </div>
          </nav>

          <div className="hidden shrink-0 items-center gap-1.5 xl:flex">
            <LanguageSwitcher />
            <ThemeSwitcher />
            <Link to={ROUTES.quote} className="hidden 2xl:block">
              <Button size="sm" variant="outline" className="whitespace-nowrap">
                {t('quote.title')}
              </Button>
            </Link>
            <Link to={ROUTES.quote} className="2xl:hidden">
              <Button size="sm" variant="outline" className="whitespace-nowrap px-2.5 text-xs">
                {t('nav.getQuote')}
              </Button>
            </Link>
          </div>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2 xl:hidden">
            <LanguageSwitcher />
            <ThemeSwitcher />
            <button
              type="button"
              className="rounded-lg p-2 text-foreground"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? t('a11y.closeMenu') : t('a11y.openMenu')}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-x-0 bottom-0 top-14 z-[100] flex flex-col border-t border-border bg-surface sm:top-16 xl:hidden">
          <nav className="flex-1 overflow-y-auto px-4 py-4">
            <ul className="flex flex-col gap-1">
              {ALL_NAV.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'block rounded-xl px-4 py-3 text-base font-medium transition-colors',
                        isActive ? 'bg-accent-soft text-primary-green' : 'text-foreground hover:bg-surface-muted',
                      )
                    }
                  >
                    {t(`nav.${link.key}`)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="shrink-0 border-t border-border p-4">
            <Link to={ROUTES.quote} onClick={() => setMobileOpen(false)} className="block">
              <Button size="lg" variant="outline" className="w-full">
                {t('quote.title')}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
