import { Moon, Sun } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useThemeStore } from '@/store/themeStore'
import { Button } from '@/components/ui'
import { cn } from '@/utils/cn'

interface ThemeSwitcherProps {
  className?: string
}

export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const { t } = useTranslation()
  const { theme, toggleTheme } = useThemeStore()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className={cn(
        'border border-border bg-surface-elevated text-foreground hover:bg-accent-soft dark:border-white/15 dark:bg-white/10',
        className,
      )}
      aria-label={theme === 'light' ? t('theme.dark') : t('theme.light')}
    >
      {theme === 'light' ? <Moon className="size-4" /> : <Sun className="size-4" />}
    </Button>
  )
}
