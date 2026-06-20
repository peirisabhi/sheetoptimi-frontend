import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export function Card({ className, padding = 'md', children, ...props }: CardProps) {
  const padClasses = { none: '', sm: 'p-3', md: 'p-5', lg: 'p-6' }
  return (
    <div
      className={cn(
        'rounded-xl border border-[var(--border)] bg-[var(--bg-surface)]',
        padClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex items-center justify-between mb-4', className)} {...props}>{children}</div>
}

export function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('text-base font-semibold text-[var(--text-primary)]', className)} {...props}>{children}</h3>
}
