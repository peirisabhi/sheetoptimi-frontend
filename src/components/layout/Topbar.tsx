import { useLocation, useNavigate } from 'react-router-dom'
import { Menu, Sun, Moon, Bell, Plus, Search, LogOut, User, Settings } from 'lucide-react'
import { useUIStore } from '@/stores/uiStore'
import { useAuthStore } from '@/features/auth/store/authStore'
import { useDisclosure } from '@/hooks/useDisclosure'
import { Avatar } from '@/components/ui/Avatar'
import { Dropdown } from '@/components/ui/Dropdown'

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/projects': 'Projects',
  '/optimizer': 'Optimizer',
  '/quotations': 'Quotations',
  '/stock': 'Stock',
  '/offcuts': 'Offcuts',
  '/stock-movements': 'Stock In/Out',
  '/sites': 'Sites',
  '/approvals': 'Approvals',
  '/clients': 'Clients',
  '/reports': 'Reports',
  '/roles': 'Roles & Permissions',
  '/settings': 'Settings',
}

export function Topbar() {
  const { toggleSidebar, setMobileSidebarOpen, theme, toggleTheme } = useUIStore()
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const userMenu = useDisclosure()

  const title = Object.entries(pageTitles).find(([k]) =>
    location.pathname === k || location.pathname.startsWith(k + '/')
  )?.[1] ?? 'SheetOptimi'

  const userMenuItems = [
    { label: 'Profile', icon: <User size={14} />, onClick: () => {} },
    { label: 'Settings', icon: <Settings size={14} />, onClick: () => navigate('/settings') },
    { label: 'Sign Out', icon: <LogOut size={14} />, onClick: () => { logout(); navigate('/login') }, danger: true, divider: true },
  ]

  return (
    <header className="h-16 flex items-center px-4 gap-3 border-b border-[var(--border)] bg-[var(--bg-surface)] flex-shrink-0">
      {/* Mobile hamburger */}
      <button
        className="lg:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] transition-colors"
        onClick={() => setMobileSidebarOpen(true)}
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Desktop collapse toggle */}
      <button
        className="hidden lg:flex p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] transition-colors"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <Menu size={20} />
      </button>

      {/* Page title */}
      <h1 className="text-base font-semibold text-[var(--text-primary)] hidden sm:block">{title}</h1>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-surface-2)] text-[var(--text-muted)] w-56 text-sm">
        <Search size={14} />
        <span>Search…</span>
        <kbd className="ml-auto text-xs bg-[var(--border)] px-1 rounded">⌘K</kbd>
      </div>

      {/* + New */}
      <button
        className="hidden sm:flex items-center gap-1.5 px-3 h-8 rounded-lg text-sm font-medium text-white transition-colors hover:opacity-90"
        style={{ backgroundColor: 'var(--color-primary)' }}
        aria-label="New item"
      >
        <Plus size={15} />
        New
      </button>

      {/* Theme toggle */}
      <button
        className="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] transition-colors"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      {/* Notifications */}
      <button className="relative p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] transition-colors" aria-label="Notifications">
        <Bell size={18} />
        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
      </button>

      {/* User menu */}
      <Dropdown
        trigger={
          <button
            onClick={userMenu.toggle}
            className="flex items-center gap-2 rounded-lg p-1 hover:bg-[var(--bg-surface-2)] transition-colors"
            aria-label="User menu"
            aria-expanded={userMenu.isOpen}
          >
            <Avatar name={user?.name ?? 'User'} src={user?.avatarUrl} size="sm" />
            <span className="hidden md:block text-sm font-medium text-[var(--text-primary)] max-w-28 truncate">
              {user?.name ?? 'User'}
            </span>
          </button>
        }
        items={userMenuItems}
        isOpen={userMenu.isOpen}
        onClose={userMenu.close}
      />
    </header>
  )
}
