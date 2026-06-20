import { Plus, Shield } from 'lucide-react'
import { useState } from 'react'
import { mockRoles } from '@/lib/api/mockData'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { useDisclosure } from '@/hooks/useDisclosure'
import type { PermissionModule, PermissionAction } from '@/types/role'

const MODULES: PermissionModule[] = ['dashboard', 'projects', 'optimizer', 'stock', 'offcuts', 'sites', 'approvals', 'quotations', 'clients', 'reports', 'roles', 'settings']
const ACTIONS: PermissionAction[] = ['view', 'create', 'edit', 'delete', 'approve']

export function RolesPage() {
  const [selectedRoleId, setSelectedRoleId] = useState(mockRoles[0].id)
  const modal = useDisclosure()
  const role = mockRoles.find((r) => r.id === selectedRoleId)!

  return (
    <div className="space-y-5">
      <PageHeader title="Roles & Permissions" subtitle="Manage user roles and access control"
        actions={<Button size="sm" onClick={modal.open}><Plus size={14} />New Role</Button>} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Role list */}
        <div className="space-y-2">
          {mockRoles.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedRoleId(r.id)}
              className={`w-full text-left rounded-xl border p-3 transition-all ${selectedRoleId === r.id ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)]' : 'border-[var(--border)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-2)]'}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Shield size={14} style={{ color: selectedRoleId === r.id ? 'var(--color-primary)' : undefined }} />
                <p className="text-sm font-semibold">{r.name}</p>
                {r.isSystem && <Badge variant="info">System</Badge>}
              </div>
              <p className="text-xs text-[var(--text-muted)]">{r.userCount} user{r.userCount !== 1 ? 's' : ''}</p>
            </button>
          ))}
        </div>

        {/* Permission matrix */}
        <div className="lg:col-span-3">
          <Card padding="none">
            <div className="p-4 border-b border-[var(--border)]">
              <p className="font-semibold">{role.name}</p>
              <p className="text-xs text-[var(--text-muted)]">{role.description}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left px-4 py-2 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Module</th>
                    {ACTIONS.map((a) => (
                      <th key={a} className="text-center px-3 py-2 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider capitalize">{a}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)]">
                  {MODULES.map((mod) => (
                    <tr key={mod} className="hover:bg-[var(--bg-surface-2)] transition-colors">
                      <td className="px-4 py-2.5 font-medium capitalize">{mod}</td>
                      {ACTIONS.map((action) => {
                        const has = role.permissions[mod]?.[action]
                        return (
                          <td key={action} className="text-center px-3 py-2.5">
                            <input
                              type="checkbox"
                              defaultChecked={has}
                              disabled={role.isSystem}
                              className="w-4 h-4 rounded cursor-pointer disabled:cursor-default"
                              style={{ accentColor: 'var(--color-primary)' }}
                            />
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      <Modal isOpen={modal.isOpen} onClose={modal.close} title="New Role" size="sm"
        footer={<><Button variant="secondary" onClick={modal.close}>Cancel</Button><Button>Create Role</Button></>}>
        <div className="space-y-4">
          <Input label="Role Name" /><Input label="Description" />
        </div>
      </Modal>
    </div>
  )
}
