import { useState, useCallback, type ReactNode } from 'react'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

interface Toast {
  id: string
  type: ToastType
  message: string
}

const icons: Record<ToastType, ReactNode> = {
  success: <CheckCircle size={16} className="text-green-600" />,
  error: <XCircle size={16} className="text-red-600" />,
  warning: <AlertCircle size={16} className="text-yellow-600" />,
  info: <Info size={16} className="text-blue-600" />,
}

const bgClasses: Record<ToastType, string> = {
  success: 'border-green-200 bg-green-50',
  error: 'border-red-200 bg-red-50',
  warning: 'border-yellow-200 bg-yellow-50',
  info: 'border-blue-200 bg-blue-50',
}

interface ToastItemProps extends Toast { onClose: (id: string) => void }

function ToastItem({ id, type, message, onClose }: ToastItemProps) {
  return (
    <div className={cn('flex items-start gap-3 p-3 rounded-xl border shadow-md max-w-sm fade-in', bgClasses[type])}>
      <span className="mt-0.5 flex-shrink-0">{icons[type]}</span>
      <p className="flex-1 text-sm text-[var(--text-primary)]">{message}</p>
      <button onClick={() => onClose(id)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] flex-shrink-0" aria-label="Dismiss">
        <X size={14} />
      </button>
    </div>
  )
}

export function ToastContainer({ toasts, onClose }: { toasts: Toast[]; onClose: (id: string) => void }) {
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto">
          <ToastItem {...t} onClose={onClose} />
        </div>
      ))}
    </div>
  )
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])
  const toast = useCallback((type: ToastType, message: string) => {
    const id = `toast-${Date.now()}`
    setToasts((prev) => [...prev, { id, type, message }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000)
  }, [])
  const dismiss = useCallback((id: string) => setToasts((prev) => prev.filter((t) => t.id !== id)), [])
  return { toasts, toast, dismiss }
}
