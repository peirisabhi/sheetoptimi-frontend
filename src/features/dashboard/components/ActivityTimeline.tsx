import { Package, FolderKanban, FileText, Scissors, CheckSquare, AlertTriangle } from 'lucide-react'
import { mockActivity } from '@/lib/api/mockData'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

const typeConfig: Record<string, { icon: ReactNode; color: string }> = {
  project: { icon: <FolderKanban size={13} />, color: 'bg-blue-100 text-blue-600' },
  stock: { icon: <Package size={13} />, color: 'bg-teal-100 text-teal-600' },
  quotation: { icon: <FileText size={13} />, color: 'bg-purple-100 text-purple-600' },
  optimizer: { icon: <Scissors size={13} />, color: 'bg-orange-100 text-orange-600' },
  approval: { icon: <CheckSquare size={13} />, color: 'bg-green-100 text-green-600' },
  alert: { icon: <AlertTriangle size={13} />, color: 'bg-yellow-100 text-yellow-600' },
}

export function ActivityTimeline() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <div className="space-y-4">
        {mockActivity.map((item, idx) => {
          const cfg = typeConfig[item.type] ?? typeConfig.project
          return (
            <div key={item.id} className="flex gap-3">
              <div className={cn('w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5', cfg.color)}>
                {cfg.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[var(--text-primary)] leading-snug">{item.message}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-[var(--text-muted)]">{item.user}</span>
                  <span className="text-[var(--text-muted)]">·</span>
                  <span className="text-xs text-[var(--text-muted)]">{item.time}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
