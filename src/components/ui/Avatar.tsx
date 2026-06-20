import { cn } from '@/lib/utils'

interface AvatarProps {
  name: string
  src?: string | null
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

function getInitials(name: string): string {
  return name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
}

function getColor(name: string): string {
  const colors = ['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-teal-500', 'bg-orange-500', 'bg-indigo-500']
  const idx = name.charCodeAt(0) % colors.length
  return colors[idx]
}

const sizeClasses = { sm: 'h-7 w-7 text-xs', md: 'h-9 w-9 text-sm', lg: 'h-12 w-12 text-base' }

export function Avatar({ name, src, size = 'md', className }: AvatarProps) {
  return (
    <div className={cn('rounded-full flex items-center justify-center font-semibold text-white flex-shrink-0', sizeClasses[size], !src && getColor(name), className)}>
      {src ? <img src={src} alt={name} className="w-full h-full rounded-full object-cover" /> : getInitials(name)}
    </div>
  )
}
