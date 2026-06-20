export type StockStatus = 'good' | 'low' | 'out'
export type MovementType = 'in' | 'out' | 'transfer'

export interface StockItem {
  id: string
  material: string
  thickness: number
  width: number
  height: number
  inStock: number
  reserved: number
  available: number
  reorderThreshold: number
  status: StockStatus
  siteId: string
  siteName: string
  unitCost?: number
  updatedAt: string
}

export interface Offcut {
  id: string
  material: string
  thickness: number
  width: number
  height: number
  status: 'available' | 'matched' | 'reserved' | 'used'
  sourceProjectId?: string
  sourceProjectName?: string
  assignedProjectId?: string
  assignedProjectName?: string
  siteId: string
  siteName: string
  createdAt: string
}

export interface StockMovement {
  id: string
  type: MovementType
  stockItemId: string
  material: string
  quantity: number
  fromSiteId?: string
  fromSiteName?: string
  toSiteId?: string
  toSiteName?: string
  projectId?: string
  projectName?: string
  performedBy: string
  notes?: string
  createdAt: string
}
