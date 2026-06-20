import type { Project } from '@/types/project'
import type { StockItem, Offcut, StockMovement } from '@/types/stock'
import type { Site } from '@/types/site'
import type { Quotation, Client } from '@/types/quotation'
import type { User } from '@/types/user'
import type { Role } from '@/types/role'

// ── Sites ──────────────────────────────────────────────────────
export const mockSites: Site[] = [
  { id: 's1', name: 'Main Warehouse', address: '100 Industrial Rd, Melbourne VIC', manager: 'Alex Johnson', phone: '+61 3 9000 1111', email: 'main@company.com', projectCount: 12, stockCount: 48, userCount: 8, isActive: true, createdAt: '2024-01-10' },
  { id: 's2', name: 'North Branch', address: '45 Harbour St, Sydney NSW', manager: 'Sarah Kim', phone: '+61 2 8000 2222', email: 'north@company.com', projectCount: 7, stockCount: 22, userCount: 5, isActive: true, createdAt: '2024-03-01' },
  { id: 's3', name: 'East Fabrication', address: '88 Factory Ave, Brisbane QLD', manager: 'James Lee', phone: '+61 7 3000 3333', email: 'east@company.com', projectCount: 4, stockCount: 15, userCount: 3, isActive: true, createdAt: '2024-06-15' },
]

// ── Clients ────────────────────────────────────────────────────
export const mockClients: Client[] = [
  { id: 'c1', name: 'Apex Construction', contactPerson: 'Mark Rivers', email: 'mark@apex.com', phone: '+61 400 111 222', address: '10 Builder St, Melbourne', projectCount: 5, totalValue: 48500, isActive: true, createdAt: '2024-02-01' },
  { id: 'c2', name: 'Horizon Interiors', contactPerson: 'Priya Sharma', email: 'priya@horizon.com', phone: '+61 400 333 444', address: '55 Design Ave, Sydney', projectCount: 3, totalValue: 22300, isActive: true, createdAt: '2024-03-15' },
  { id: 'c3', name: 'BlueWave Cabinets', contactPerson: 'Tom Walsh', email: 'tom@bluewave.com', phone: '+61 400 555 666', projectCount: 8, totalValue: 76000, isActive: true, createdAt: '2024-01-20' },
  { id: 'c4', name: 'Metro Fit-Out', contactPerson: 'Lisa Chen', email: 'lisa@metro.com', phone: '+61 400 777 888', projectCount: 2, totalValue: 14200, isActive: false, createdAt: '2024-04-10' },
  { id: 'c5', name: 'Cornerstone Joinery', contactPerson: 'Ryan Park', email: 'ryan@cornerstone.com', phone: '+61 400 999 000', projectCount: 6, totalValue: 53800, isActive: true, createdAt: '2023-11-01' },
]

// ── Projects ───────────────────────────────────────────────────
export const mockProjects: Project[] = [
  { id: 'p1', name: 'Kitchen Cabinetry – Apex', clientId: 'c1', clientName: 'Apex Construction', siteId: 's1', siteName: 'Main Warehouse', status: 'active', efficiency: 87.4, sheetsUsed: 14, panelCount: 42, createdAt: '2025-06-01', updatedAt: '2025-06-18' },
  { id: 'p2', name: 'Office Partitions – Horizon', clientId: 'c2', clientName: 'Horizon Interiors', siteId: 's2', siteName: 'North Branch', status: 'optimizing', efficiency: 91.2, sheetsUsed: 8, panelCount: 28, createdAt: '2025-06-05', updatedAt: '2025-06-17' },
  { id: 'p3', name: 'Bedroom Suite – BlueWave', clientId: 'c3', clientName: 'BlueWave Cabinets', siteId: 's1', siteName: 'Main Warehouse', status: 'completed', efficiency: 93.6, sheetsUsed: 22, panelCount: 68, createdAt: '2025-05-15', updatedAt: '2025-06-10', completedAt: '2025-06-10' },
  { id: 'p4', name: 'Reception Desk – Metro', clientId: 'c4', clientName: 'Metro Fit-Out', siteId: 's3', siteName: 'East Fabrication', status: 'draft', panelCount: 12, createdAt: '2025-06-15', updatedAt: '2025-06-15' },
  { id: 'p5', name: 'Wardrobe Set – Cornerstone', clientId: 'c5', clientName: 'Cornerstone Joinery', siteId: 's2', siteName: 'North Branch', status: 'on_hold', panelCount: 35, createdAt: '2025-05-28', updatedAt: '2025-06-12' },
  { id: 'p6', name: 'Shop Fit – Apex Q3', clientId: 'c1', clientName: 'Apex Construction', siteId: 's1', siteName: 'Main Warehouse', status: 'active', efficiency: 84.1, sheetsUsed: 6, panelCount: 18, createdAt: '2025-06-10', updatedAt: '2025-06-18' },
]

// ── Stock ──────────────────────────────────────────────────────
export const mockStock: StockItem[] = [
  { id: 'st1', material: 'MDF', thickness: 18, width: 2440, height: 1220, inStock: 45, reserved: 14, available: 31, reorderThreshold: 10, status: 'good', siteId: 's1', siteName: 'Main Warehouse', unitCost: 48.50, updatedAt: '2025-06-18' },
  { id: 'st2', material: 'Plywood', thickness: 12, width: 2400, height: 1200, inStock: 8, reserved: 6, available: 2, reorderThreshold: 10, status: 'low', siteId: 's1', siteName: 'Main Warehouse', unitCost: 62.00, updatedAt: '2025-06-17' },
  { id: 'st3', material: 'MDF', thickness: 25, width: 2440, height: 1220, inStock: 0, reserved: 0, available: 0, reorderThreshold: 5, status: 'out', siteId: 's1', siteName: 'Main Warehouse', unitCost: 72.00, updatedAt: '2025-06-16' },
  { id: 'st4', material: 'Particleboard', thickness: 18, width: 2440, height: 1220, inStock: 22, reserved: 4, available: 18, reorderThreshold: 8, status: 'good', siteId: 's2', siteName: 'North Branch', unitCost: 38.00, updatedAt: '2025-06-18' },
  { id: 'st5', material: 'MDF', thickness: 18, width: 2440, height: 1220, inStock: 12, reserved: 10, available: 2, reorderThreshold: 5, status: 'low', siteId: 's2', siteName: 'North Branch', unitCost: 48.50, updatedAt: '2025-06-15' },
  { id: 'st6', material: 'Plywood', thickness: 18, width: 2400, height: 1200, inStock: 18, reserved: 2, available: 16, reorderThreshold: 6, status: 'good', siteId: 's3', siteName: 'East Fabrication', unitCost: 78.00, updatedAt: '2025-06-18' },
]

// ── Offcuts ────────────────────────────────────────────────────
export const mockOffcuts: Offcut[] = [
  { id: 'oc1', material: 'MDF', thickness: 18, width: 800, height: 600, status: 'available', sourceProjectId: 'p3', sourceProjectName: 'Bedroom Suite – BlueWave', siteId: 's1', siteName: 'Main Warehouse', createdAt: '2025-06-10' },
  { id: 'oc2', material: 'Plywood', thickness: 12, width: 1200, height: 400, status: 'matched', sourceProjectId: 'p3', sourceProjectName: 'Bedroom Suite – BlueWave', assignedProjectId: 'p1', assignedProjectName: 'Kitchen Cabinetry – Apex', siteId: 's1', siteName: 'Main Warehouse', createdAt: '2025-06-10' },
  { id: 'oc3', material: 'MDF', thickness: 18, width: 600, height: 900, status: 'available', siteId: 's2', siteName: 'North Branch', createdAt: '2025-06-12' },
  { id: 'oc4', material: 'Particleboard', thickness: 18, width: 1100, height: 700, status: 'reserved', assignedProjectId: 'p6', assignedProjectName: 'Shop Fit – Apex Q3', siteId: 's1', siteName: 'Main Warehouse', createdAt: '2025-06-15' },
  { id: 'oc5', material: 'MDF', thickness: 25, width: 500, height: 500, status: 'used', siteId: 's3', siteName: 'East Fabrication', createdAt: '2025-05-20' },
]

// ── Stock Movements ────────────────────────────────────────────
export const mockMovements: StockMovement[] = [
  { id: 'm1', type: 'in', stockItemId: 'st1', material: 'MDF 18mm', quantity: 20, toSiteId: 's1', toSiteName: 'Main Warehouse', performedBy: 'Alex Johnson', notes: 'Supplier delivery – INV-1042', createdAt: '2025-06-18T09:00:00Z' },
  { id: 'm2', type: 'out', stockItemId: 'st1', material: 'MDF 18mm', quantity: 14, toSiteId: 's1', toSiteName: 'Main Warehouse', projectId: 'p1', projectName: 'Kitchen Cabinetry – Apex', performedBy: 'Alex Johnson', createdAt: '2025-06-18T10:30:00Z' },
  { id: 'm3', type: 'transfer', stockItemId: 'st4', material: 'Particleboard 18mm', quantity: 5, fromSiteId: 's2', fromSiteName: 'North Branch', toSiteId: 's1', toSiteName: 'Main Warehouse', performedBy: 'Sarah Kim', createdAt: '2025-06-17T14:00:00Z' },
  { id: 'm4', type: 'in', stockItemId: 'st2', material: 'Plywood 12mm', quantity: 10, toSiteId: 's1', toSiteName: 'Main Warehouse', performedBy: 'Alex Johnson', notes: 'Emergency re-order', createdAt: '2025-06-17T08:00:00Z' },
  { id: 'm5', type: 'out', stockItemId: 'st2', material: 'Plywood 12mm', quantity: 8, toSiteId: 's1', toSiteName: 'Main Warehouse', projectId: 'p2', projectName: 'Office Partitions – Horizon', performedBy: 'Alex Johnson', createdAt: '2025-06-17T11:00:00Z' },
]

// ── Quotations ─────────────────────────────────────────────────
export const mockQuotations: Quotation[] = [
  { id: 'q1', reference: 'QT-2025-001', clientId: 'c1', clientName: 'Apex Construction', projectId: 'p1', projectName: 'Kitchen Cabinetry – Apex', status: 'approved', lineItems: [{ id: 'li1', description: 'MDF 18mm Panels x42', quantity: 14, unitPrice: 48.50, total: 679 }, { id: 'li2', description: 'Cutting Labour', quantity: 1, unitPrice: 850, total: 850 }], subtotal: 1529, discount: 100, tax: 204.3, total: 1633.3, validUntil: '2025-07-01', createdAt: '2025-06-01', updatedAt: '2025-06-05' },
  { id: 'q2', reference: 'QT-2025-002', clientId: 'c2', clientName: 'Horizon Interiors', projectId: 'p2', projectName: 'Office Partitions – Horizon', status: 'sent', lineItems: [{ id: 'li3', description: 'MDF 18mm Panels x28', quantity: 8, unitPrice: 48.50, total: 388 }, { id: 'li4', description: 'Cutting Labour', quantity: 1, unitPrice: 620, total: 620 }], subtotal: 1008, discount: 0, tax: 100.8, total: 1108.8, validUntil: '2025-07-15', createdAt: '2025-06-05', updatedAt: '2025-06-10' },
  { id: 'q3', reference: 'QT-2025-003', clientId: 'c5', clientName: 'Cornerstone Joinery', status: 'draft', lineItems: [], subtotal: 0, discount: 0, tax: 0, total: 0, validUntil: '2025-07-30', createdAt: '2025-06-15', updatedAt: '2025-06-15' },
  { id: 'q4', reference: 'QT-2025-004', clientId: 'c3', clientName: 'BlueWave Cabinets', projectId: 'p3', projectName: 'Bedroom Suite – BlueWave', status: 'invoiced', lineItems: [{ id: 'li5', description: 'MDF 18mm Panels x68', quantity: 22, unitPrice: 48.50, total: 1067 }, { id: 'li6', description: 'Plywood Panels', quantity: 4, unitPrice: 62, total: 248 }, { id: 'li7', description: 'Cutting Labour', quantity: 1, unitPrice: 1400, total: 1400 }], subtotal: 2715, discount: 200, tax: 251.5, total: 2766.5, validUntil: '2025-06-30', createdAt: '2025-05-20', updatedAt: '2025-06-10' },
]

// ── Users ──────────────────────────────────────────────────────
export const mockUsers: User[] = [
  { id: 'u1', name: 'Alex Johnson', email: 'alex@company.com', role: 'Super Admin', siteId: 's1', isActive: true, createdAt: '2024-01-01' },
  { id: 'u2', name: 'Sarah Kim', email: 'sarah@company.com', role: 'Site Manager', siteId: 's2', isActive: true, createdAt: '2024-03-01' },
  { id: 'u3', name: 'James Lee', email: 'james@company.com', role: 'Site Manager', siteId: 's3', isActive: true, createdAt: '2024-06-15' },
  { id: 'u4', name: 'Priya Sharma', email: 'priya@company.com', role: 'Sales/Quotation', isActive: true, createdAt: '2024-04-10' },
  { id: 'u5', name: 'Tom Walsh', email: 'tom@company.com', role: 'Cutter/Operator', siteId: 's1', isActive: true, createdAt: '2024-05-20' },
  { id: 'u6', name: 'Lisa Chen', email: 'lisa@company.com', role: 'Viewer', isActive: false, createdAt: '2024-07-01' },
]

// ── Dashboard chart data ───────────────────────────────────────
export const mockUsageChartData = [
  { month: 'Jan', sheets: 38, efficiency: 84 },
  { month: 'Feb', sheets: 42, efficiency: 87 },
  { month: 'Mar', sheets: 35, efficiency: 82 },
  { month: 'Apr', sheets: 55, efficiency: 91 },
  { month: 'May', sheets: 48, efficiency: 89 },
  { month: 'Jun', sheets: 62, efficiency: 93 },
]

export const mockMaterialDonutData = [
  { name: 'MDF 18mm', value: 45, color: '#2563eb' },
  { name: 'Plywood 12mm', value: 22, color: '#7c3aed' },
  { name: 'Particleboard', value: 18, color: '#0891b2' },
  { name: 'MDF 25mm', value: 10, color: '#16a34a' },
  { name: 'Other', value: 5, color: '#d97706' },
]

export const mockActivity = [
  { id: 'a1', type: 'project', message: 'Project "Kitchen Cabinetry" moved to active', user: 'Alex Johnson', time: '2 hours ago' },
  { id: 'a2', type: 'stock', message: 'Stock In: 20× MDF 18mm received at Main Warehouse', user: 'Alex Johnson', time: '3 hours ago' },
  { id: 'a3', type: 'quotation', message: 'Quotation QT-2025-002 sent to Horizon Interiors', user: 'Priya Sharma', time: '5 hours ago' },
  { id: 'a4', type: 'optimizer', message: 'Optimization run for Office Partitions – 91.2% efficiency', user: 'Tom Walsh', time: '6 hours ago' },
  { id: 'a5', type: 'approval', message: 'Quotation QT-2025-001 approved by Apex Construction', user: 'System', time: '1 day ago' },
  { id: 'a6', type: 'stock', message: 'Low stock alert: Plywood 12mm below threshold', user: 'System', time: '1 day ago' },
]

// ── Roles ──────────────────────────────────────────────────────
export const mockRoles: Role[] = [
  { id: 'r1', name: 'Super Admin', description: 'Full access to all modules', permissions: { dashboard: { view: true }, projects: { view: true, create: true, edit: true, delete: true, approve: true }, optimizer: { view: true, create: true }, stock: { view: true, create: true, edit: true, delete: true }, offcuts: { view: true, create: true, edit: true, delete: true }, sites: { view: true, create: true, edit: true, delete: true }, approvals: { view: true, approve: true }, quotations: { view: true, create: true, edit: true, delete: true, approve: true }, clients: { view: true, create: true, edit: true, delete: true }, reports: { view: true }, roles: { view: true, create: true, edit: true, delete: true }, settings: { view: true, edit: true } }, userCount: 1, isSystem: true },
  { id: 'r2', name: 'Site Manager', description: 'Manage a specific site', permissions: { dashboard: { view: true }, projects: { view: true, create: true, edit: true }, optimizer: { view: true, create: true }, stock: { view: true, create: true, edit: true }, offcuts: { view: true, create: true, edit: true }, sites: { view: true }, approvals: { view: true, approve: true }, quotations: { view: true }, clients: { view: true }, reports: { view: true }, roles: {}, settings: { view: true } }, userCount: 2, isSystem: true },
  { id: 'r3', name: 'Cutter/Operator', description: 'Run optimizer, manage stock', permissions: { dashboard: { view: true }, projects: { view: true }, optimizer: { view: true, create: true }, stock: { view: true, edit: true }, offcuts: { view: true }, sites: { view: true }, approvals: {}, quotations: {}, clients: {}, reports: {}, roles: {}, settings: {} }, userCount: 3, isSystem: true },
  { id: 'r4', name: 'Sales/Quotation', description: 'Manage quotations and clients', permissions: { dashboard: { view: true }, projects: { view: true }, optimizer: {}, stock: { view: true }, offcuts: {}, sites: {}, approvals: { view: true }, quotations: { view: true, create: true, edit: true }, clients: { view: true, create: true, edit: true }, reports: { view: true }, roles: {}, settings: {} }, userCount: 1, isSystem: true },
  { id: 'r5', name: 'Viewer', description: 'Read-only access', permissions: { dashboard: { view: true }, projects: { view: true }, optimizer: {}, stock: { view: true }, offcuts: { view: true }, sites: { view: true }, approvals: {}, quotations: { view: true }, clients: { view: true }, reports: { view: true }, roles: {}, settings: {} }, userCount: 1, isSystem: false },
]
