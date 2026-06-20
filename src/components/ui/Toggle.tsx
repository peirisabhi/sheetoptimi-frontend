import { cn } from '@/lib/utils'

interface ToggleProps {
  checked: boolean
  onChange: (v: boolean) => void
  label?: string
  description?: string
  disabled?: boolean
}

export function Toggle({ checked, onChange, label, description, disabled }: ToggleProps) {
  return (
    <label className={cn('flex items-start gap-3 cursor-pointer', disabled && 'opacity-50 cursor-not-allowed')}>
      <div className="relative mt-0.5">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          disabled={disabled}
        />
        <div
          className={cn(
            'w-10 h-6 rounded-full transition-colors duration-200',
            checked ? 'bg-[var(--color-primary)]' : 'bg-[var(--border)]'
          )}
        />
        <div
          className={cn(
            'absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200',
            checked ? 'translate-x-5' : 'translate-x-1'
          )}
        />
      </div>
      {(label || description) && (
        <div>
          {label && <p className="text-sm font-medium text-[var(--text-primary)]">{label}</p>}
          {description && <p className="text-xs text-[var(--text-muted)]">{description}</p>}
        </div>
      )}
    </label>
  )
}
