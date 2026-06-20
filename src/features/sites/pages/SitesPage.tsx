import { Plus, MapPin, FolderKanban, Package, Users } from 'lucide-react'
import { mockSites } from '@/lib/api/mockData'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { useDisclosure } from '@/hooks/useDisclosure'
import { Badge } from '@/components/ui/Badge'

export function SitesPage() {
  const modal = useDisclosure()
  return (
    <div className="space-y-5">
      <PageHeader title="Sites" subtitle="Manage manufacturing and storage locations"
        actions={<Button size="sm" onClick={modal.open}><Plus size={14} />Add Site</Button>} />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {mockSites.map((site) => (
          <Card key={site.id}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[var(--color-primary-light)]">
                  <MapPin size={18} style={{ color: 'var(--color-primary)' }} />
                </div>
                <div>
                  <p className="font-semibold text-[var(--text-primary)]">{site.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">{site.manager}</p>
                </div>
              </div>
              <Badge variant={site.isActive ? 'success' : 'default'}>{site.isActive ? 'Active' : 'Inactive'}</Badge>
            </div>
            <p className="text-xs text-[var(--text-muted)] mb-4">{site.address}</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: <FolderKanban size={14} />, label: 'Projects', value: site.projectCount },
                { icon: <Package size={14} />, label: 'Stock', value: site.stockCount },
                { icon: <Users size={14} />, label: 'Users', value: site.userCount },
              ].map((stat) => (
                <div key={stat.label} className="text-center rounded-lg bg-[var(--bg-surface-2)] p-2">
                  <div className="flex items-center justify-center text-[var(--text-muted)] mb-1">{stat.icon}</div>
                  <p className="text-sm font-bold text-[var(--text-primary)]">{stat.value}</p>
                  <p className="text-[10px] text-[var(--text-muted)]">{stat.label}</p>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={modal.isOpen} onClose={modal.close} title="Add Site" size="md"
        footer={<><Button variant="secondary" onClick={modal.close}>Cancel</Button><Button>Create Site</Button></>}>
        <div className="space-y-4">
          <Input label="Site Name" /><Input label="Address" /><Input label="Manager" /><Input label="Phone" /><Input label="Email" />
        </div>
      </Modal>
    </div>
  )
}
