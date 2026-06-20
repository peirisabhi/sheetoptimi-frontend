import { Plus } from 'lucide-react'
import { mockQuotations } from '@/lib/api/mockData'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Table, Thead, Tbody, Th, Td, Tr } from '@/components/ui/Table'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { useDisclosure } from '@/hooks/useDisclosure'
import { formatCurrency, formatDate } from '@/lib/utils'
import type { QuotationStatus } from '@/types/quotation'

const statusVariant: Record<QuotationStatus, 'default' | 'info' | 'success' | 'danger' | 'purple'> = {
  draft: 'default', sent: 'info', approved: 'success', rejected: 'danger', invoiced: 'purple',
}

export function QuotationsListPage() {
  const modal = useDisclosure()
  return (
    <div className="space-y-5">
      <PageHeader title="Quotations" subtitle="Manage client quotations and estimates"
        actions={<Button size="sm" onClick={modal.open}><Plus size={14} />New Quotation</Button>} />

      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)]">
        <Table>
          <Thead>
            <Tr><Th>Reference</Th><Th>Client</Th><Th>Project</Th><Th>Status</Th><Th>Total</Th><Th>Valid Until</Th><Th>Updated</Th></Tr>
          </Thead>
          <Tbody>
            {mockQuotations.map((q) => (
              <Tr key={q.id}>
                <Td className="font-medium">{q.reference}</Td>
                <Td>{q.clientName}</Td>
                <Td className="text-[var(--text-muted)] text-sm">{q.projectName ?? '—'}</Td>
                <Td><Badge variant={statusVariant[q.status]}>{q.status}</Badge></Td>
                <Td className="font-semibold">{formatCurrency(q.total)}</Td>
                <Td className="text-xs text-[var(--text-muted)]">{formatDate(q.validUntil)}</Td>
                <Td className="text-xs text-[var(--text-muted)]">{formatDate(q.updatedAt)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>

      <Modal isOpen={modal.isOpen} onClose={modal.close} title="New Quotation" size="md"
        footer={<><Button variant="secondary" onClick={modal.close}>Cancel</Button><Button>Create</Button></>}>
        <div className="space-y-4">
          <Input label="Client" /><Input label="Project (optional)" /><Input label="Valid Until" type="date" /><Input label="Notes" />
        </div>
      </Modal>
    </div>
  )
}
