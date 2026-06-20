import { mockMovements } from '@/lib/api/mockData'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Table, Thead, Tbody, Th, Td, Tr } from '@/components/ui/Table'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { useDisclosure } from '@/hooks/useDisclosure'
import { ArrowUp, ArrowDown, ArrowLeftRight } from 'lucide-react'
import type { MovementType } from '@/types/stock'
import { formatDate } from '@/lib/utils'

const movementConfig: Record<MovementType, { label: string; variant: 'success' | 'danger' | 'info'; icon: React.ReactNode }> = {
  in: { label: 'Stock In', variant: 'success', icon: <ArrowUp size={12} /> },
  out: { label: 'Stock Out', variant: 'danger', icon: <ArrowDown size={12} /> },
  transfer: { label: 'Transfer', variant: 'info', icon: <ArrowLeftRight size={12} /> },
}

export function StockInOutPage() {
  const inModal = useDisclosure()
  const outModal = useDisclosure()

  return (
    <div className="space-y-5">
      <PageHeader title="Stock In/Out" subtitle="Log and track all stock movements"
        actions={
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={outModal.open}><ArrowDown size={14} />Stock Out</Button>
            <Button size="sm" onClick={inModal.open}><ArrowUp size={14} />Stock In</Button>
          </div>
        }
      />

      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)]">
        <Table>
          <Thead>
            <Tr><Th>Type</Th><Th>Material</Th><Th>Qty</Th><Th>From/To</Th><Th>Project</Th><Th>By</Th><Th>Date</Th></Tr>
          </Thead>
          <Tbody>
            {mockMovements.map((m) => {
              const cfg = movementConfig[m.type]
              return (
                <Tr key={m.id}>
                  <Td><Badge variant={cfg.variant}><span className="flex items-center gap-1">{cfg.icon}{cfg.label}</span></Badge></Td>
                  <Td className="font-medium">{m.material}</Td>
                  <Td>{m.quantity}</Td>
                  <Td className="text-xs text-[var(--text-muted)]">
                    {m.fromSiteName && `${m.fromSiteName} → `}{m.toSiteName}
                  </Td>
                  <Td className="text-xs text-[var(--text-secondary)]">{m.projectName ?? '—'}</Td>
                  <Td className="text-xs">{m.performedBy}</Td>
                  <Td className="text-xs text-[var(--text-muted)]">{formatDate(m.createdAt)}</Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </div>

      <Modal isOpen={inModal.isOpen} onClose={inModal.close} title="Stock In" size="md"
        footer={<><Button variant="secondary" onClick={inModal.close}>Cancel</Button><Button>Confirm Stock In</Button></>}>
        <div className="space-y-4">
          <Input label="Material / Stock Item" />
          <Input label="Quantity" type="number" />
          <Input label="Site" />
          <Input label="Notes / Invoice Ref" />
        </div>
      </Modal>

      <Modal isOpen={outModal.isOpen} onClose={outModal.close} title="Stock Out" size="md"
        footer={<><Button variant="secondary" onClick={outModal.close}>Cancel</Button><Button variant="danger">Confirm Stock Out</Button></>}>
        <div className="space-y-4">
          <Input label="Material / Stock Item" />
          <Input label="Quantity" type="number" />
          <Input label="Project (optional)" />
          <Input label="Notes" />
        </div>
      </Modal>
    </div>
  )
}
