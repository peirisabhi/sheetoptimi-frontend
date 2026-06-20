import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface BrandingState {
  appName: string
  appTagline: string
  logoUrl: string | null
  primaryColor: string
  primaryColorLight: string
  sidebarStyle: 'dark' | 'light' | 'brand'
  companyName: string
  companyAddress: string
  companyPhone: string
  companyEmail: string
  companyWebsite: string
  currency: string
  setAppName: (v: string) => void
  setAppTagline: (v: string) => void
  setLogoUrl: (v: string | null) => void
  setPrimaryColor: (hex: string) => void
  setSidebarStyle: (v: 'dark' | 'light' | 'brand') => void
  setCompany: (fields: Partial<Pick<BrandingState,
    'companyName' | 'companyAddress' | 'companyPhone' | 'companyEmail' | 'companyWebsite' | 'currency'
  >>) => void
}

function applyPrimaryColor(hex: string) {
  document.documentElement.style.setProperty('--color-primary', hex)
  // Compute a light tint (naive: just lighten via opacity is not possible in CSS vars, so use a fixed list)
  const lightMap: Record<string, string> = {
    '#2563eb': '#dbeafe',
    '#7c3aed': '#ede9fe',
    '#db2777': '#fce7f3',
    '#16a34a': '#dcfce7',
    '#d97706': '#fef3c7',
    '#dc2626': '#fee2e2',
    '#0891b2': '#cffafe',
    '#0f172a': '#f1f5f9',
  }
  const light = lightMap[hex.toLowerCase()] ?? '#dbeafe'
  document.documentElement.style.setProperty('--color-primary-light', light)
}

export const useBrandingStore = create<BrandingState>()(
  persist(
    (set) => ({
      appName: 'SheetOptimi',
      appTagline: 'Sheet Material Optimizer',
      logoUrl: null,
      primaryColor: '#2563eb',
      primaryColorLight: '#dbeafe',
      sidebarStyle: 'dark',
      companyName: 'My Company Ltd',
      companyAddress: '123 Main Street, City',
      companyPhone: '+1 555 000 0000',
      companyEmail: 'info@company.com',
      companyWebsite: 'https://company.com',
      currency: 'USD',
      setAppName: (v) => set({ appName: v }),
      setAppTagline: (v) => set({ appTagline: v }),
      setLogoUrl: (v) => set({ logoUrl: v }),
      setPrimaryColor: (hex) => {
        applyPrimaryColor(hex)
        set({ primaryColor: hex })
      },
      setSidebarStyle: (v) => set({ sidebarStyle: v }),
      setCompany: (fields) => set(fields),
    }),
    {
      name: 'branding-store',
      onRehydrateStorage: () => (state) => {
        if (state?.primaryColor) applyPrimaryColor(state.primaryColor)
      },
    }
  )
)
