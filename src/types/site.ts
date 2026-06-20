export interface Site {
  id: string
  name: string
  address: string
  manager: string
  phone?: string
  email?: string
  projectCount: number
  stockCount: number
  userCount: number
  isActive: boolean
  createdAt: string
}
