import { useState } from 'react'
import { Check, X } from 'lucide-react'
import { mockQuotations } from '@/lib/api/mockData'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatCurrency } from '@/lib/utils'

export function PendingApprovalsList() {
  const pending = mockQuotations.filter((q) => q.status === 'sent')
  const [dismissed, setDismissed] = useState<string[]>([])

  const visible = pending.filter((q) => !dismissed.includes(q.id))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Approvals</CardTitle>
        <Badge variant="warning">{visible.length}</Badge>
      </CardHeader>

      {visible.length === 0 ? (
        <p className="text-sm text-[var(--text-muted)] py-4 text-center">All caught up! 🎉</p>
      ) : (
        <div className="space-y-3">
          {visible.map((q) => (
            <div key={q.id} className="flex items-start gap-3 p-3 rounded-xl bg-[var(--bg-surface-2)]">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--text-primary)] truncate">{q.reference}</p>
                <p className="text-xs text-[var(--text-muted)]">{q.clientName}</p>
                <p className="text-sm font-semibold mt-1" style={{ color: 'var(--color-primary)' }}>
                  {formatCurrency(q.total)}
                </p>
              </div>
              <div className="flex gap-1.5 flex-shrink-0">
                <button
                  className="p-1.5 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                  onClick={() => setDismissed((d) => [...d, q.id])}
                  aria-label="Approve"
                >
                  <Check size={14} />
                </button>
                <button
                  className="p-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                  onClick={() => setDismissed((d) => [...d, q.id])}
                  aria-label="Reject"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
