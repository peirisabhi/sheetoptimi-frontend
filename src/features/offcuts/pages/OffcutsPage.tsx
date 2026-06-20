import { mockOffcuts } from '@/lib/api/mockData'
import { PageHeader } from '@/components/layout/PageHeader'
import { Badge } from '@/components/ui/Badge'
import { Table, Thead, Tbody, Th, Td, Tr } from '@/components/ui/Table'
import { Button } from '@/components/ui/Button'
import { formatDate } from '@/lib/utils'
import type { Offcut } from '@/types/stock'

const variantMap: Record<Offcut['status'], 'success' | 'info' | 'warning' | 'default'> = {
  available: 'success', matched: 'info', reserved: 'warning', used: 'default',
}

export function OffcutsPage() {
  return (
    <div className="space-y-5">
      <PageHeader title="Offcuts" subtitle="Manage and reuse remnant sheet pieces" />
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)]">
        <Table>
          <Thead>
            <Tr><Th>Material</Th><Th>Thickness</Th><Th>Size</Th><Th>Site</Th><Th>Source Project</Th><Th>Status</Th><Th>Date</Th><Th></Th></Tr>
          </Thead>
          <Tbody>
            {mockOffcuts.map((o) => (
              <Tr key={o.id}>
                <Td className="font-medium">{o.material}</Td>
                <Td>{o.thickness}mm</Td>
                <Td className="text-xs text-[var(--text-muted)]">{o.width}×{o.height}mm</Td>
                <Td className="text-[var(--text-secondary)] text-sm">{o.siteName}</Td>
                <Td className="text-xs text-[var(--text-muted)]">{o.sourceProjectName ?? '—'}</Td>
                <Td><Badge variant={variantMap[o.status]}>{o.status}</Badge></Td>
                <Td className="text-xs text-[var(--text-muted)]">{formatDate(o.createdAt)}</Td>
                <Td>
                  {o.status === 'available' && (
                    <Button size="sm" variant="outline">Assign</Button>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </div>
  )
}
