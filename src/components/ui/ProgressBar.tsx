import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number  // 0-100
  className?: string
  color?: string
  showLabel?: boolean
  size?: 'sm' | 'md'
}

export function ProgressBar({ value, className, color, showLabel, size = 'sm' }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value))
  const h = size === 'sm' ? 'h-1.5' : 'h-2.5'
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn('flex-1 rounded-full bg-[var(--bg-surface-2)] overflow-hidden', h)}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${clamped}%`, backgroundColor: color ?? 'var(--color-primary)' }}
        />
      </div>
      {showLabel && <span className="text-xs text-[var(--text-muted)] w-10 text-right">{clamped.toFixed(0)}%</span>}
    </div>
  )
}
