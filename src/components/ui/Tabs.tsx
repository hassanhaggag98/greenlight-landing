import { useState, type ReactNode } from 'react'
import { cn } from '@/utils/cn'

export interface TabItem {
  id: string
  label: string
  content: ReactNode
}

interface TabsProps {
  items: TabItem[]
  className?: string
  defaultTab?: string
}

export function Tabs({ items, className, defaultTab }: TabsProps) {
  const [active, setActive] = useState(defaultTab ?? items[0]?.id)

  const current = items.find((t) => t.id === active)

  return (
    <div className={className}>
      <div className="flex gap-1 border-b border-border" role="tablist">
        {items.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active === tab.id}
            className={cn(
              'px-4 py-2 text-sm font-medium transition-colors',
              active === tab.id
                ? 'border-b-2 border-primary-green text-primary-green'
                : 'text-muted hover:text-foreground',
            )}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="pt-4" role="tabpanel">
        {current?.content}
      </div>
    </div>
  )
}
