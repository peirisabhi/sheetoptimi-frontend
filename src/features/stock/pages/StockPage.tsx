import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { mockStock } from '@/lib/api/mockData'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Table, Thead, Tbody, Th, Td, Tr } from '@/components/ui/Table'
import { Modal } from '@/components/ui/Modal'
import { useDisclosure } from '@/hooks/useDisclosure'
import type { StockStatus } from '@/types/stock'

const statusVariant: Record<StockStatus, 'success' | 'warning' | 'danger'> = {
  good: 'success', low: 'warning', out: 'danger',
}

export function StockPage() {
  const [search, setSearch] = useState('')
  const modal = useDisclosure()
  const filtered = mockStock.filter((s) =>
    !search || s.material.toLowerCase().includes(search.toLowerCase()) || s.siteName.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-5">
      <PageHeader title="Stock" subtitle="Manage sheet material inventory"
        actions={<Button size="sm" onClick={modal.open}><Plus size={14} />Add Stock</Button>} />
      <Input placeholder="Search stock…" leftIcon={<Search size={14} />} value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-xs" />

      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)]">
        {/* Desktop */}
        <div className="hidden sm:block">
          <Table>
            <Thead>
              <Tr><Th>Material</Th><Th>Thickness</Th><Th>Size</Th><Th>Site</Th><Th>In Stock</Th><Th>Reserved</Th><Th>Available</Th><Th>Status</Th></Tr>
            </Thead>
            <Tbody>
              {filtered.map((s) => (
                <Tr key={s.id}>
                  <Td className="font-medium">{s.material}</Td>
                  <Td>{s.thickness}mm</Td>
                  <Td className="text-[var(--text-muted)] text-xs">{s.width}×{s.height}</Td>
                  <Td className="text-[var(--text-secondary)]">{s.siteName}</Td>
                  <Td>{s.inStock}</Td>
                  <Td className="text-yellow-600">{s.reserved}</Td>
                  <Td className="font-semibold">{s.available}</Td>
                  <Td><Badge variant={statusVariant[s.status]}>{s.status}</Badge></Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </div>
        {/* Mobile cards */}
        <div className="sm:hidden divide-y divide-[var(--border-subtle)]">
          {filtered.map((s) => (
            <div key={s.id} className="p-4">
              <div className="flex justify-between items-start mb-1">
                <p className="font-semibold">{s.material} {s.thickness}mm</p>
                <Badge variant={statusVariant[s.status]}>{s.status}</Badge>
              </div>
              <p className="text-xs text-[var(--text-muted)]">{s.siteName} · {s.width}×{s.height}mm</p>
              <div className="flex gap-4 mt-2 text-sm">
                <span>Stock: <strong>{s.inStock}</strong></span>
                <span>Reserved: <strong className="text-yellow-600">{s.reserved}</strong></span>
                <span>Available: <strong>{s.available}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={modal.isOpen} onClose={modal.close} title="Add Stock" size="md"
        footer={<><Button variant="secondary" onClick={modal.close}>Cancel</Button><Button>Add</Button></>}>
        <div className="space-y-4">
          <Input label="Material" />
          <Input label="Thickness (mm)" type="number" />
          <Input label="Sheet Width (mm)" type="number" />
          <Input label="Sheet Height (mm)" type="number" />
          <Input label="Quantity" type="number" />
          <Input label="Site" />
        </div>
      </Modal>
    </div>
  )
}
