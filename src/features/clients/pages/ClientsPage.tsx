import { Plus, Search } from 'lucide-react'
import { useState } from 'react'
import { mockClients } from '@/lib/api/mockData'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Table, Thead, Tbody, Th, Td, Tr } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { useDisclosure } from '@/hooks/useDisclosure'
import { formatCurrency } from '@/lib/utils'

export function ClientsPage() {
  const [search, setSearch] = useState('')
  const modal = useDisclosure()
  const filtered = mockClients.filter((c) => !search || c.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-5">
      <PageHeader title="Clients" subtitle="Manage your client database"
        actions={<Button size="sm" onClick={modal.open}><Plus size={14} />Add Client</Button>} />
      <Input placeholder="Search clients…" leftIcon={<Search size={14} />} value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-xs" />

      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)]">
        <Table>
          <Thead>
            <Tr><Th>Name</Th><Th>Contact</Th><Th>Email</Th><Th>Phone</Th><Th>Projects</Th><Th>Total Value</Th><Th>Status</Th></Tr>
          </Thead>
          <Tbody>
            {filtered.map((c) => (
              <Tr key={c.id}>
                <Td className="font-medium">{c.name}</Td>
                <Td>{c.contactPerson}</Td>
                <Td className="text-[var(--text-muted)] text-sm">{c.email}</Td>
                <Td className="text-[var(--text-muted)] text-sm">{c.phone}</Td>
                <Td>{c.projectCount}</Td>
                <Td className="font-semibold">{formatCurrency(c.totalValue)}</Td>
                <Td><Badge variant={c.isActive ? 'success' : 'default'}>{c.isActive ? 'Active' : 'Inactive'}</Badge></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>

      <Modal isOpen={modal.isOpen} onClose={modal.close} title="Add Client" size="md"
        footer={<><Button variant="secondary" onClick={modal.close}>Cancel</Button><Button>Add Client</Button></>}>
        <div className="space-y-4">
          <Input label="Company Name" /><Input label="Contact Person" /><Input label="Email" type="email" /><Input label="Phone" /><Input label="Address" />
        </div>
      </Modal>
    </div>
  )
}
