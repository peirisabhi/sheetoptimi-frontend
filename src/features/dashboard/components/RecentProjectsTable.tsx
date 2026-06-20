import { useNavigate } from 'react-router-dom'
import { mockProjects } from '@/lib/api/mockData'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { Table, Thead, Tbody, Th, Td, Tr } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { formatDate } from '@/lib/utils'
import type { ProjectStatus } from '@/types/project'

const statusBadgeVariant: Record<ProjectStatus, 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple'> = {
  draft: 'default',
  active: 'info',
  optimizing: 'purple',
  completed: 'success',
  on_hold: 'warning',
}

export function RecentProjectsTable() {
  const navigate = useNavigate()
  const recent = mockProjects.slice(0, 5)

  return (
    <Card padding="none">
      <CardHeader className="px-5 pt-5 pb-0">
        <CardTitle>Recent Projects</CardTitle>
        <button
          className="text-sm font-medium"
          style={{ color: 'var(--color-primary)' }}
          onClick={() => navigate('/projects')}
        >
          View all →
        </button>
      </CardHeader>

      {/* Desktop table */}
      <div className="hidden sm:block">
        <Table>
          <Thead>
            <Tr>
              <Th>Project</Th>
              <Th>Client</Th>
              <Th>Status</Th>
              <Th>Efficiency</Th>
              <Th>Updated</Th>
            </Tr>
          </Thead>
          <Tbody>
            {recent.map((p) => (
              <Tr key={p.id} onClick={() => navigate('/projects')} className="hover:bg-[var(--bg-surface-2)]">
                <Td>
                  <div>
                    <p className="font-medium text-[var(--text-primary)]">{p.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{p.siteName}</p>
                  </div>
                </Td>
                <Td className="text-[var(--text-secondary)]">{p.clientName}</Td>
                <Td>
                  <Badge variant={statusBadgeVariant[p.status]}>
                    {p.status.replace('_', ' ')}
                  </Badge>
                </Td>
                <Td>
                  {p.efficiency != null ? (
                    <div className="w-24">
                      <p className="text-xs font-medium mb-1">{p.efficiency}%</p>
                      <ProgressBar value={p.efficiency} />
                    </div>
                  ) : <span className="text-[var(--text-muted)] text-sm">—</span>}
                </Td>
                <Td className="text-[var(--text-muted)] text-xs">{formatDate(p.updatedAt)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden divide-y divide-[var(--border-subtle)]">
        {recent.map((p) => (
          <div key={p.id} className="px-5 py-3" onClick={() => navigate('/projects')}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-medium text-[var(--text-primary)] text-sm">{p.name}</p>
                <p className="text-xs text-[var(--text-muted)]">{p.clientName}</p>
              </div>
              <Badge variant={statusBadgeVariant[p.status]}>{p.status.replace('_', ' ')}</Badge>
            </div>
            {p.efficiency != null && <ProgressBar value={p.efficiency} className="mt-2" showLabel />}
          </div>
        ))}
      </div>
    </Card>
  )
}
