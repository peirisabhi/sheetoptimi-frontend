import { type ReactNode } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: ReactNode
  iconBg?: string
  trend?: { value: number; label: string }
  className?: string
}

export function MetricCard({ title, value, subtitle, icon, iconBg, trend, className }: MetricCardProps) {
  return (
    <div className={cn('rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-5', className)}>
      <div className="flex items-start justify-between mb-3">
        <div className={cn('p-2.5 rounded-xl', iconBg ?? 'bg-[var(--color-primary-light)]')}>
          {icon}
        </div>
        {trend && (
          <div className={cn('flex items-center gap-1 text-xs font-medium', trend.value >= 0 ? 'text-green-600' : 'text-red-500')}>
            {trend.value >= 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
            {Math.abs(trend.value)}%
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-[var(--text-primary)]">{value}</p>
      <p className="text-sm font-medium text-[var(--text-secondary)] mt-0.5">{title}</p>
      {subtitle && <p className="text-xs text-[var(--text-muted)] mt-1">{subtitle}</p>}
      {trend && <p className="text-xs text-[var(--text-muted)] mt-1">{trend.label}</p>}
    </div>
  )
}
