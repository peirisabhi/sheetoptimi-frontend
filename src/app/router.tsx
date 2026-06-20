import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { useAuthStore } from '@/features/auth/store/authStore'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage'
import { OptimizerPage } from '@/features/optimizer/pages/OptimizerPage'
import { ProjectsListPage } from '@/features/projects/pages/ProjectsListPage'
import { StockPage } from '@/features/stock/pages/StockPage'
import { OffcutsPage } from '@/features/offcuts/pages/OffcutsPage'
import { StockInOutPage } from '@/features/stock/pages/StockInOutPage'
import { SitesPage } from '@/features/sites/pages/SitesPage'
import { ApprovalsPage } from '@/features/approvals/pages/ApprovalsPage'
import { QuotationsListPage } from '@/features/quotations/pages/QuotationsListPage'
import { ClientsPage } from '@/features/clients/pages/ClientsPage'
import { ReportsPage } from '@/features/reports/pages/ReportsPage'
import { RolesPage } from '@/features/roles/pages/RolesPage'
import { SettingsPage } from '@/features/settings/pages/SettingsPage'

function RequireAuth({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <>{children}</>
}

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <RequireAuth><AppShell /></RequireAuth>,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'projects', element: <ProjectsListPage /> },
      { path: 'optimizer', element: <OptimizerPage /> },
      { path: 'stock', element: <StockPage /> },
      { path: 'offcuts', element: <OffcutsPage /> },
      { path: 'stock-movements', element: <StockInOutPage /> },
      { path: 'sites', element: <SitesPage /> },
      { path: 'approvals', element: <ApprovalsPage /> },
      { path: 'quotations', element: <QuotationsListPage /> },
      { path: 'clients', element: <ClientsPage /> },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'roles', element: <RolesPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
  { path: '*', element: <Navigate to="/dashboard" replace /> },
])
