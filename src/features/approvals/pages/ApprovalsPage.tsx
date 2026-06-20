import { useState } from 'react'
import { Check, X } from 'lucide-react'
import { mockQuotations } from '@/lib/api/mockData'
import { PageHeader } from '@/components/layout/PageHeader'
import { Tabs, TabContent } from '@/components/ui/Tabs'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { formatCurrency, formatDate } from '@/lib/utils'

const TABS = [
  { id: 'pending', label: 'Pending' },
  { id: 'approved', label: 'Approved' },
  { id: 'rejected', label: 'Rejected' },
]

export function ApprovalsPage() {
  const [tab, setTab] = useState('pending')
  const [actioned, setActioned] = useState<Record<string, 'approved' | 'rejected'>>({})

  const items = mockQuotations.filter((q) => {
    if (tab === 'pending') return q.status === 'sent' && !actioned[q.id]
    if (tab === 'approved') return q.status === 'approved' || actioned[q.id] === 'approved'
    if (tab === 'rejected') return q.status === 'rejected' || actioned[q.id] === 'rejected'
    return false
  })

  const pendingCount = mockQuotations.filter((q) => q.status === 'sent' && !actioned[q.id]).length
  const tabsWithCounts = TABS.map((t) => ({ ...t, count: t.id === 'pending' ? pendingCount : undefined }))

  return (
    <div className="space-y-5">
      <PageHeader title="Approvals" subtitle="Review and action pending quotations and requests" />
      <Tabs tabs={tabsWithCounts} active={tab} onChange={setTab} />
      <TabContent>
        {items.length === 0 ? (
          <p className="text-center text-[var(--text-muted)] py-16">Nothing here.</p>
        ) : (
          <div className="space-y-3">
            {items.map((q) => (
              <Card key={q.id} className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-[var(--text-primary)]">{q.reference}</p>
                    <Badge variant="info">Quotation</Badge>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">{q.clientName}</p>
                  {q.projectName && <p className="text-xs text-[var(--text-muted)]">{q.projectName}</p>}
                  <p className="text-base font-bold mt-2" style={{ color: 'var(--color-primary)' }}>{formatCurrency(q.total)}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">Valid until {formatDate(q.validUntil)}</p>
                </div>
                {tab === 'pending' && (
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-100 text-green-700 text-sm font-medium hover:bg-green-200 transition-colors"
                      onClick={() => setActioned((a) => ({ ...a, [q.id]: 'approved' }))}
                    >
                      <Check size={14} />Approve
                    </button>
                    <button
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-100 text-red-600 text-sm font-medium hover:bg-red-200 transition-colors"
                      onClick={() => setActioned((a) => ({ ...a, [q.id]: 'rejected' }))}
                    >
                      <X size={14} />Reject
                    </button>
                  </div>
                )}
                {tab !== 'pending' && (
                  <Badge variant={tab === 'approved' ? 'success' : 'danger'}>{tab}</Badge>
                )}
              </Card>
            ))}
          </div>
        )}
      </TabContent>
    </div>
  )
}
