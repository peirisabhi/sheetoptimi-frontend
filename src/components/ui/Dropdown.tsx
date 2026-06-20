import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface DropdownItem {
  label: string
  icon?: ReactNode
  onClick: () => void
  danger?: boolean
  divider?: boolean
}

interface DropdownProps {
  trigger: ReactNode
  items: DropdownItem[]
  isOpen: boolean
  onClose: () => void
  align?: 'left' | 'right'
}

export function Dropdown({ trigger, items, isOpen, onClose, align = 'right' }: DropdownProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isOpen, onClose])

  return (
    <div ref={ref} className="relative inline-flex">
      {trigger}
      {isOpen && (
        <div className={cn(
          'absolute top-full mt-1 z-50 min-w-44 py-1 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] shadow-lg fade-in',
          align === 'right' ? 'right-0' : 'left-0'
        )}>
          {items.map((item, i) => (
            <div key={i}>
              {item.divider && <div className="my-1 border-t border-[var(--border)]" />}
              <button
                onClick={() => { item.onClick(); onClose() }}
                className={cn(
                  'w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors text-left',
                  item.danger
                    ? 'text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
                    : 'text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)]'
                )}
              >
                {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                {item.label}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
