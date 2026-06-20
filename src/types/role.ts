export type PermissionAction = 'view' | 'create' | 'edit' | 'delete' | 'approve'
export type PermissionModule =
  | 'dashboard' | 'projects' | 'optimizer' | 'stock' | 'offcuts'
  | 'sites' | 'approvals' | 'quotations' | 'clients' | 'reports'
  | 'roles' | 'settings'

export type Permission = Record<PermissionModule, Partial<Record<PermissionAction, boolean>>>

export interface Role {
  id: string
  name: string
  description: string
  permissions: Permission
  userCount: number
  isSystem: boolean
}
