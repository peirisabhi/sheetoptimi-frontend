import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface TableProps {
  children?: ReactNode
  className?: string
}

export function Table({ children, className }: TableProps) {
  return (
    <div className="overflow-x-auto w-full">
      <table className={cn('w-full text-sm border-collapse', className)}>{children}</table>
    </div>
  )
}

export function Thead({ children, className }: TableProps) {
  return <thead className={cn('border-b border-[var(--border)]', className)}>{children}</thead>
}

export function Tbody({ children, className }: TableProps) {
  return <tbody className={cn('divide-y divide-[var(--border-subtle)]', className)}>{children}</tbody>
}

export function Th({ children, className }: TableProps) {
  return (
    <th className={cn('px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]', className)}>
      {children}
    </th>
  )
}

export function Td({ children, className }: TableProps) {
  return (
    <td className={cn('px-4 py-3 text-[var(--text-primary)] align-middle', className)}>
      {children}
    </td>
  )
}

export function Tr({ children, className, onClick }: TableProps & { onClick?: () => void }) {
  return (
    <tr
      className={cn('transition-colors', onClick && 'cursor-pointer hover:bg-[var(--bg-surface-2)]', className)}
      onClick={onClick}
    >
      {children}
    </tr>
  )
}
