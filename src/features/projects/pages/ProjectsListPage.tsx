import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { mockProjects } from '@/lib/api/mockData'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Tabs, TabContent } from '@/components/ui/Tabs'
import { Badge } from '@/components/ui/Badge'
import { Table, Thead, Tbody, Th, Td, Tr } from '@/components/ui/Table'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Modal } from '@/components/ui/Modal'
import { useDisclosure } from '@/hooks/useDisclosure'
import { useDebounce } from '@/hooks/useDebounce'
import { formatDate } from '@/lib/utils'
import type { ProjectStatus } from '@/types/project'

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'draft', label: 'Draft' },
  { id: 'completed', label: 'Completed' },
]

const statusVariant: Record<ProjectStatus, 'default' | 'info' | 'purple' | 'success' | 'warning'> = {
  draft: 'default', active: 'info', optimizing: 'purple', completed: 'success', on_hold: 'warning',
}

export function ProjectsListPage() {
  const [tab, setTab] = useState('all')
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search)
  const modal = useDisclosure()

  const filtered = mockProjects.filter((p) => {
    const matchesTab = tab === 'all' || p.status === tab
    const q = debouncedSearch.toLowerCase()
    const matchesSearch = !q || p.name.toLowerCase().includes(q) || p.clientName.toLowerCase().includes(q)
    return matchesTab && matchesSearch
  })

  const tabsWithCounts = TABS.map((t) => ({
    ...t,
    count: t.id === 'all' ? mockProjects.length : mockProjects.filter((p) => p.status === t.id).length,
  }))

  return (
    <div className="space-y-5">
      <PageHeader
        title="Projects"
        subtitle="Manage all cutting projects"
        actions={
          <Button size="sm" onClick={modal.open}>
            <Plus size={14} />
            New Project
          </Button>
        }
      />

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <Input
          placeholder="Search projects…"
          leftIcon={<Search size={14} />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-64"
        />
      </div>

      <Tabs tabs={tabsWithCounts} active={tab} onChange={setTab} />
      <TabContent>
        {/* Desktop table */}
        <div className="hidden sm:block rounded-xl border border-[var(--border)] bg-[var(--bg-surface)]">
          <Table>
            <Thead>
              <Tr><Th>Name</Th><Th>Client</Th><Th>Site</Th><Th>Status</Th><Th>Efficiency</Th><Th>Panels</Th><Th>Updated</Th></Tr>
            </Thead>
            <Tbody>
              {filtered.map((p) => (
                <Tr key={p.id}>
                  <Td><p className="font-medium">{p.name}</p></Td>
                  <Td className="text-[var(--text-secondary)]">{p.clientName}</Td>
                  <Td className="text-[var(--text-secondary)]">{p.siteName}</Td>
                  <Td><Badge variant={statusVariant[p.status]}>{p.status.replace('_', ' ')}</Badge></Td>
                  <Td>
                    {p.efficiency != null
                      ? <div className="w-24"><p className="text-xs mb-1">{p.efficiency}%</p><ProgressBar value={p.efficiency} /></div>
                      : <span className="text-[var(--text-muted)]">—</span>}
                  </Td>
                  <Td>{p.panelCount}</Td>
                  <Td className="text-[var(--text-muted)] text-xs">{formatDate(p.updatedAt)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </div>

        {/* Mobile cards */}
        <div className="sm:hidden space-y-3">
          {filtered.map((p) => (
            <div key={p.id} className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="font-semibold text-[var(--text-primary)]">{p.name}</p>
                <Badge variant={statusVariant[p.status]}>{p.status.replace('_', ' ')}</Badge>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">{p.clientName} · {p.siteName}</p>
              {p.efficiency != null && <ProgressBar value={p.efficiency} showLabel className="mt-2" />}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-[var(--text-muted)] py-12">No projects found.</p>
        )}
      </TabContent>

      <Modal isOpen={modal.isOpen} onClose={modal.close} title="New Project" size="md"
        footer={<><Button variant="secondary" onClick={modal.close}>Cancel</Button><Button>Create Project</Button></>}
      >
        <div className="space-y-4">
          <Input label="Project Name" placeholder="e.g. Kitchen Cabinetry – Client A" />
          <Input label="Client" placeholder="Select client…" />
          <Input label="Site" placeholder="Select site…" />
          <Input label="Notes" placeholder="Optional notes…" />
        </div>
      </Modal>
    </div>
  )
}
