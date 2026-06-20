import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface TabsProps {
  tabs: { id: string; label: string; count?: number }[]
  active: string
  onChange: (id: string) => void
  className?: string
}

export function Tabs({ tabs, active, onChange, className }: TabsProps) {
  return (
    <div className={cn('flex gap-1 border-b border-[var(--border)]', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap',
            active === tab.id
              ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
              : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          )}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className={cn('inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-xs min-w-5',
              active === tab.id ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)]' : 'bg-[var(--bg-surface-2)] text-[var(--text-muted)]'
            )}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}

interface TabContentProps { children: ReactNode; className?: string }
export function TabContent({ children, className }: TabContentProps) {
  return <div className={cn('mt-4', className)}>{children}</div>
}
