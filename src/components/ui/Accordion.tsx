import { ChevronDown } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { prefersReducedMotion } from '@/utils/motion'
import { cn } from '@/utils/cn'

export interface AccordionItem {
  id: string
  title: string
  content: ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  className?: string
  defaultOpen?: string
}

export function Accordion({ items, className, defaultOpen }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpen ?? null)

  return (
    <div className={cn('divide-y divide-border rounded-lg border border-border', className)}>
      {items.map((item) => {
        const isOpen = openId === item.id
        return (
          <div key={item.id}>
            <button
              type="button"
              className="flex w-full items-center justify-between px-4 py-4 text-start font-medium text-foreground hover:bg-surface-elevated"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
            >
              {item.title}
              <ChevronDown
                className={cn('size-4 shrink-0 transition-transform', isOpen && 'rotate-180')}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={prefersReducedMotion() ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: prefersReducedMotion() ? 0 : 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 text-sm text-muted">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
