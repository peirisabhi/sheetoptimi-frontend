import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, FolderKanban, Scissors, FileText,
  Package, Archive, ArrowLeftRight,
  MapPin, CheckSquare, Users, BarChart3,
  Shield, Settings, ChevronRight, X
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/stores/uiStore'
import { useBrandingStore } from '@/stores/brandingStore'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

interface NavSection {
  title: string
  items: NavItem[]
}

const navSections: NavSection[] = [
  {
    title: 'Main',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={18} /> },
      { label: 'Projects', href: '/projects', icon: <FolderKanban size={18} /> },
      { label: 'Optimizer', href: '/optimizer', icon: <Scissors size={18} /> },
      { label: 'Quotations', href: '/quotations', icon: <FileText size={18} /> },
    ],
  },
  {
    title: 'Inventory',
    items: [
      { label: 'Stock', href: '/stock', icon: <Package size={18} /> },
      { label: 'Offcuts', href: '/offcuts', icon: <Archive size={18} /> },
      { label: 'Stock In/Out', href: '/stock-movements', icon: <ArrowLeftRight size={18} /> },
    ],
  },
  {
    title: 'Management',
    items: [
      { label: 'Sites', href: '/sites', icon: <MapPin size={18} /> },
      { label: 'Approvals', href: '/approvals', icon: <CheckSquare size={18} /> },
      { label: 'Clients', href: '/clients', icon: <Users size={18} /> },
    ],
  },
  {
    title: 'Analytics',
    items: [
      { label: 'Reports', href: '/reports', icon: <BarChart3 size={18} /> },
    ],
  },
  {
    title: 'System',
    items: [
      { label: 'Roles & Permissions', href: '/roles', icon: <Shield size={18} /> },
      { label: 'Settings', href: '/settings', icon: <Settings size={18} /> },
    ],
  },
]

interface SidebarProps {
  isMobile?: boolean
}

export function Sidebar({ isMobile }: SidebarProps) {
  const { sidebarCollapsed, setMobileSidebarOpen } = useUIStore()
  const { appName, logoUrl } = useBrandingStore()
  const location = useLocation()
  const collapsed = !isMobile && sidebarCollapsed

  function handleNavClick() {
    if (isMobile) setMobileSidebarOpen(false)
  }

  return (
    <aside
      className={cn(
        'flex flex-col h-full overflow-hidden transition-all duration-200',
        'bg-[var(--sidebar-bg)]',
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-white/10 flex-shrink-0">
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center">
          {logoUrl
            ? <img src={logoUrl} alt="logo" className="w-6 h-6 object-contain" />
            : <Scissors size={16} className="text-white" />
          }
        </div>
        {!collapsed && (
          <span className="font-bold text-white text-base leading-tight truncate">{appName}</span>
        )}
        {isMobile && (
          <button
            className="ml-auto p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10"
            onClick={() => setMobileSidebarOpen(false)}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-5">
        {navSections.map((section) => (
          <div key={section.title}>
            {!collapsed && (
              <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/30">
                {section.title}
              </p>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/')
                return (
                  <li key={item.href}>
                    <NavLink
                      to={item.href}
                      onClick={handleNavClick}
                      title={collapsed ? item.label : undefined}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-150 group',
                        isActive
                          ? 'bg-[var(--color-primary)] text-white font-medium'
                          : 'text-[var(--sidebar-text)] hover:bg-[var(--sidebar-hover-bg)] hover:text-white',
                        collapsed && 'justify-center px-2'
                      )}
                    >
                      <span className="flex-shrink-0">{item.icon}</span>
                      {!collapsed && <span className="truncate">{item.label}</span>}
                      {!collapsed && isActive && (
                        <ChevronRight size={14} className="ml-auto opacity-60" />
                      )}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
