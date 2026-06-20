export const APP_NAME = import.meta.env.VITE_APP_NAME ?? 'SheetOptimi'
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api/v1'

export const MATERIALS = ['MDF', 'Plywood', 'Particleboard', 'HDF', 'OSB', 'Acrylic']
export const THICKNESSES = [6, 9, 12, 15, 18, 22, 25, 30]

export const STATUS_COLORS = {
  project: {
    draft: 'bg-gray-100 text-gray-600',
    active: 'bg-blue-100 text-blue-700',
    optimizing: 'bg-purple-100 text-purple-700',
    completed: 'bg-green-100 text-green-700',
    on_hold: 'bg-yellow-100 text-yellow-700',
  },
  stock: {
    good: 'bg-green-100 text-green-700',
    low: 'bg-yellow-100 text-yellow-700',
    out: 'bg-red-100 text-red-700',
  },
  quotation: {
    draft: 'bg-gray-100 text-gray-600',
    sent: 'bg-blue-100 text-blue-700',
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
    invoiced: 'bg-purple-100 text-purple-700',
  },
  offcut: {
    available: 'bg-green-100 text-green-700',
    matched: 'bg-blue-100 text-blue-700',
    reserved: 'bg-yellow-100 text-yellow-700',
    used: 'bg-gray-100 text-gray-600',
  },
} as const

export const PANEL_COLORS = [
  '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6', '#f59e0b',
  '#ef4444', '#22c55e', '#f97316', '#06b6d4', '#a855f7',
  '#84cc16', '#0ea5e9',
]
