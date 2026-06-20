import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Scissors } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { useBrandingStore } from '@/stores/brandingStore'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
})

type FormValues = z.infer<typeof schema>

export function LoginPage() {
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)
  const { appName, appTagline, logoUrl, primaryColor } = useBrandingStore()
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: 'alex@company.com', password: 'password123' },
  })

  async function onSubmit(data: FormValues) {
    setLoading(true)
    setApiError('')
    await new Promise((r) => setTimeout(r, 700)) // simulate API
    // Mock auth: accept any email/password
    if (data.password.length >= 6) {
      login({
        id: 'u1',
        name: 'Alex Johnson',
        email: data.email,
        role: 'Super Admin',
        siteId: 's1',
        isActive: true,
        createdAt: '2024-01-01',
        token: 'mock-jwt-token',
      })
      navigate('/dashboard')
    } else {
      setApiError('Invalid credentials. Try password123.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex bg-[var(--bg)]">
      {/* Left panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
              {logoUrl
                ? <img src={logoUrl} alt="logo" className="w-7 h-7 object-contain" />
                : <Scissors size={20} className="text-white" />
              }
            </div>
            <div>
              <p className="font-bold text-lg text-[var(--text-primary)] leading-tight">{appName}</p>
              <p className="text-xs text-[var(--text-muted)]">{appTagline}</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">Welcome back</h2>
          <p className="text-[var(--text-secondary)] text-sm mb-8">Sign in to your workspace</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <Input
              label="Email address"
              type="email"
              autoComplete="email"
              placeholder="alex@company.com"
              error={errors.email?.message}
              {...register('email')}
            />
            <Input
              label="Password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register('password')}
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-[var(--text-secondary)] cursor-pointer">
                <input type="checkbox" className="rounded" {...register('rememberMe')} />
                Remember me
              </label>
              <button type="button" className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>
                Forgot password?
              </button>
            </div>

            {apiError && (
              <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{apiError}</p>
            )}

            <Button type="submit" className="w-full" size="lg" loading={loading}>
              Sign in
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-[var(--text-muted)]">
            Demo: use any email + password (6+ chars)
          </p>
        </div>
      </div>

      {/* Right decorative panel — hidden on mobile */}
      <div
        className="hidden lg:flex flex-1 flex-col items-center justify-center p-12 text-white"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="max-w-md text-center space-y-4">
          <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6">
            <Scissors size={40} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold">{appName}</h2>
          <p className="text-lg text-white/80">{appTagline}</p>
          <div className="grid grid-cols-3 gap-4 mt-8 text-center">
            {[
              { label: 'Efficiency', value: '93%' },
              { label: 'Waste Saved', value: '2.4 t' },
              { label: 'Projects', value: '1,200+' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 rounded-xl p-4">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-white/70 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
