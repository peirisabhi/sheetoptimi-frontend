export type QuotationStatus = 'draft' | 'sent' | 'approved' | 'rejected' | 'invoiced'

export interface QuotationLineItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  total: number
}

export interface Quotation {
  id: string
  reference: string
  clientId: string
  clientName: string
  projectId?: string
  projectName?: string
  status: QuotationStatus
  lineItems: QuotationLineItem[]
  subtotal: number
  discount: number
  tax: number
  total: number
  validUntil: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface Client {
  id: string
  name: string
  contactPerson: string
  email: string
  phone: string
  address?: string
  projectCount: number
  totalValue: number
  isActive: boolean
  createdAt: string
}
