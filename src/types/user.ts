export interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string
  role: string
  siteId?: string
  createdAt: string
  isActive: boolean
}

export interface AuthUser extends User {
  token: string
}
