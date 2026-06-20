import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { MobileNav } from './MobileNav'
import { useUIStore } from '@/stores/uiStore'
import { cn } from '@/lib/utils'

export function AppShell() {
  const { sidebarCollapsed, mobileSidebarOpen, setMobileSidebarOpen } = useUIStore()
  const location = useLocation()

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileSidebarOpen(false)
  }, [location.pathname, setMobileSidebarOpen])

  return (
    <div className="flex h-screen bg-[var(--bg)] overflow-hidden">
      {/* Desktop Sidebar */}
      <div
        className={cn(
          'hidden lg:flex flex-col flex-shrink-0 sidebar-transition',
          sidebarCollapsed ? 'w-16' : 'w-60'
        )}
      >
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          {/* Drawer */}
          <div className="relative w-64 h-full flex-shrink-0 fade-in z-10">
            <Sidebar isMobile />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-20 md:pb-6">
          <Outlet />
        </main>
        <MobileNav />
      </div>
    </div>
  )
}
