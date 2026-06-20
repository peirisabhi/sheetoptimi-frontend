/**
 * API client — currently backed by mock data.
 * To switch to a real backend, replace each function body with a fetch/axios call
 * to VITE_API_BASE_URL. The function signatures must not change.
 */
import {
  mockProjects, mockStock, mockOffcuts, mockMovements,
  mockSites, mockQuotations, mockClients, mockUsers, mockRoles,
} from './mockData'
import type { Project } from '@/types/project'
import type { StockItem, Offcut, StockMovement } from '@/types/stock'
import type { Site } from '@/types/site'
import type { Quotation, Client } from '@/types/quotation'
import type { User } from '@/types/user'
import type { Role } from '@/types/role'

// Simulate async latency
const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms))

// ── Projects ───────────────────────────────────────────────────
export async function getProjects(): Promise<Project[]> {
  await delay()
  return [...mockProjects]
}
export async function getProject(id: string): Promise<Project | undefined> {
  await delay()
  return mockProjects.find((p) => p.id === id)
}
export async function createProject(data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
  await delay()
  const project: Project = { ...data, id: `p${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
  mockProjects.push(project)
  return project
}

// ── Stock ──────────────────────────────────────────────────────
export async function getStock(): Promise<StockItem[]> {
  await delay()
  return [...mockStock]
}
export async function createStockItem(data: Omit<StockItem, 'id' | 'updatedAt'>): Promise<StockItem> {
  await delay()
  const item: StockItem = { ...data, id: `st${Date.now()}`, updatedAt: new Date().toISOString() }
  mockStock.push(item)
  return item
}

// ── Offcuts ────────────────────────────────────────────────────
export async function getOffcuts(): Promise<Offcut[]> {
  await delay()
  return [...mockOffcuts]
}

// ── Movements ──────────────────────────────────────────────────
export async function getMovements(): Promise<StockMovement[]> {
  await delay()
  return [...mockMovements]
}

// ── Sites ──────────────────────────────────────────────────────
export async function getSites(): Promise<Site[]> {
  await delay()
  return [...mockSites]
}

// ── Quotations ─────────────────────────────────────────────────
export async function getQuotations(): Promise<Quotation[]> {
  await delay()
  return [...mockQuotations]
}

// ── Clients ────────────────────────────────────────────────────
export async function getClients(): Promise<Client[]> {
  await delay()
  return [...mockClients]
}

// ── Users ──────────────────────────────────────────────────────
export async function getUsers(): Promise<User[]> {
  await delay()
  return [...mockUsers]
}

// ── Roles ──────────────────────────────────────────────────────
export async function getRoles(): Promise<Role[]> {
  await delay()
  return [...mockRoles]
}
