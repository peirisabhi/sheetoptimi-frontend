import { cn } from '@/lib/utils'

interface SkeletonProps { className?: string }

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn('animate-pulse rounded-lg bg-[var(--bg-surface-2)]', className)} />
  )
}

export function SkeletonCard() {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-5 space-y-3">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  )
}
