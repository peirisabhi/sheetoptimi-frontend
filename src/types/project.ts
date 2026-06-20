export type ProjectStatus = 'draft' | 'active' | 'optimizing' | 'completed' | 'on_hold'

export interface Project {
  id: string
  name: string
  clientId: string
  clientName: string
  siteId: string
  siteName: string
  status: ProjectStatus
  efficiency?: number
  sheetsUsed?: number
  panelCount: number
  createdAt: string
  updatedAt: string
  completedAt?: string
  notes?: string
}
