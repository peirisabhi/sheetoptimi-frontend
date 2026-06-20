import { NavLink } from 'react-router-dom'
import { LayoutDashboard, FolderKanban, Scissors, CheckSquare, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/stores/uiStore'

const items = [
  { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={22} /> },
  { label: 'Projects', href: '/projects', icon: <FolderKanban size={22} /> },
  { label: 'Optimizer', href: '/optimizer', icon: <Scissors size={22} /> },
  { label: 'Approvals', href: '/approvals', icon: <CheckSquare size={22} /> },
]

export function MobileNav() {
  const { setMobileSidebarOpen } = useUIStore()

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-[var(--bg-surface)] border-t border-[var(--border)] safe-area-inset-bottom">
      <div className="flex items-center justify-around px-2 py-1">
        {items.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl text-[10px] font-medium transition-colors min-w-12',
                isActive
                  ? 'text-[var(--color-primary)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
              )
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
        <button
          className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl text-[10px] font-medium text-[var(--text-muted)] hover:text-[var(--text-secondary)] min-w-12"
          onClick={() => setMobileSidebarOpen(true)}
          aria-label="More navigation"
        >
          <MoreHorizontal size={22} />
          More
        </button>
      </div>
    </nav>
  )
}
