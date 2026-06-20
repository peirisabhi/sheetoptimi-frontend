import { useState } from 'react'
import { Tabs, TabContent } from '@/components/ui/Tabs'
import { Card, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Toggle } from '@/components/ui/Toggle'
import { useBrandingStore } from '@/stores/brandingStore'
import { PageHeader } from '@/components/layout/PageHeader'

const COLOR_SWATCHES = [
  { hex: '#2563eb', label: 'Blue' },
  { hex: '#7c3aed', label: 'Purple' },
  { hex: '#db2777', label: 'Pink' },
  { hex: '#16a34a', label: 'Green' },
  { hex: '#d97706', label: 'Amber' },
  { hex: '#dc2626', label: 'Red' },
  { hex: '#0891b2', label: 'Cyan' },
  { hex: '#0f172a', label: 'Dark' },
]

const TABS = [
  { id: 'branding', label: 'Branding' },
  { id: 'company', label: 'Company' },
  { id: 'defaults', label: 'Defaults' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'users', label: 'Users' },
  { id: 'security', label: 'Security' },
]

function BrandingSettings() {
  const { appName, appTagline, primaryColor, setPrimaryColor, setAppName, setAppTagline, setLogoUrl, logoUrl } = useBrandingStore()
  const [name, setName] = useState(appName)
  const [tagline, setTagline] = useState(appTagline)

  return (
    <div className="space-y-6 max-w-2xl">
      <Card>
        <CardTitle className="mb-4">App Identity</CardTitle>
        <div className="space-y-4">
          <Input label="App Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="App Tagline" value={tagline} onChange={(e) => setTagline(e.target.value)} />
          <div>
            <label className="text-sm font-medium text-[var(--text-primary)] block mb-2">Logo</label>
            <div className="flex items-center gap-3">
              {logoUrl && <img src={logoUrl} alt="logo" className="h-10 w-10 rounded-xl object-contain border border-[var(--border)]" />}
              <label className="cursor-pointer px-3 py-1.5 rounded-lg border border-[var(--border)] text-sm hover:bg-[var(--bg-surface-2)] transition-colors">
                Upload Logo
                <input type="file" accept="image/*" className="sr-only" onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    const url = URL.createObjectURL(file)
                    setLogoUrl(url)
                  }
                }} />
              </label>
              {logoUrl && <button className="text-sm text-red-500 hover:underline" onClick={() => setLogoUrl(null)}>Remove</button>}
            </div>
          </div>
          <Button size="sm" onClick={() => { setAppName(name); setAppTagline(tagline) }}>Save Changes</Button>
        </div>
      </Card>

      <Card>
        <CardTitle className="mb-4">Brand Color</CardTitle>
        <div className="flex flex-wrap gap-3">
          {COLOR_SWATCHES.map((s) => (
            <button
              key={s.hex}
              onClick={() => setPrimaryColor(s.hex)}
              title={s.label}
              className="relative w-10 h-10 rounded-xl border-2 transition-all"
              style={{
                backgroundColor: s.hex,
                borderColor: primaryColor === s.hex ? 'white' : 'transparent',
                boxShadow: primaryColor === s.hex ? `0 0 0 3px ${s.hex}` : 'none',
              }}
            />
          ))}
        </div>
        <div className="flex items-center gap-3 mt-4">
          <input
            type="color"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            className="h-9 w-16 rounded-lg cursor-pointer border border-[var(--border)]"
          />
          <span className="text-sm text-[var(--text-muted)]">Custom color</span>
        </div>
      </Card>
    </div>
  )
}

function CompanySettings() {
  const { companyName, companyAddress, companyPhone, companyEmail, companyWebsite, currency, setCompany } = useBrandingStore()
  return (
    <div className="space-y-4 max-w-2xl">
      <Card>
        <CardTitle className="mb-4">Company Information</CardTitle>
        <div className="space-y-4">
          <Input label="Company Name" defaultValue={companyName} onBlur={(e) => setCompany({ companyName: e.target.value })} />
          <Input label="Address" defaultValue={companyAddress} onBlur={(e) => setCompany({ companyAddress: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Phone" defaultValue={companyPhone} onBlur={(e) => setCompany({ companyPhone: e.target.value })} />
            <Input label="Email" defaultValue={companyEmail} onBlur={(e) => setCompany({ companyEmail: e.target.value })} />
          </div>
          <Input label="Website" defaultValue={companyWebsite} onBlur={(e) => setCompany({ companyWebsite: e.target.value })} />
          <Input label="Currency" defaultValue={currency} onBlur={(e) => setCompany({ currency: e.target.value })} hint="ISO currency code e.g. USD, AUD, EUR" />
        </div>
      </Card>
    </div>
  )
}

function DefaultsSettings() {
  return (
    <div className="space-y-4 max-w-2xl">
      <Card>
        <CardTitle className="mb-4">Default Sheet Configuration</CardTitle>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Default Sheet Width (mm)" defaultValue="2440" type="number" />
          <Input label="Default Sheet Height (mm)" defaultValue="1220" type="number" />
          <Input label="Default Kerf (mm)" defaultValue="3" type="number" step="0.5" />
          <Input label="Default Edge Margin (mm)" defaultValue="5" type="number" />
          <Input label="Low Stock Threshold" defaultValue="10" type="number" />
        </div>
        <Button size="sm" className="mt-4">Save Defaults</Button>
      </Card>
    </div>
  )
}

function NotificationsSettings() {
  const [notifs, setNotifs] = useState({
    lowStock: true, approvalRequired: true, projectComplete: false, weeklyReport: true,
  })
  return (
    <div className="max-w-2xl">
      <Card>
        <CardTitle className="mb-4">Notification Preferences</CardTitle>
        <div className="space-y-4">
          <Toggle label="Low stock alerts" description="Notify when stock falls below threshold" checked={notifs.lowStock} onChange={(v) => setNotifs((n) => ({ ...n, lowStock: v }))} />
          <Toggle label="Approval required" description="Notify when a quotation needs approval" checked={notifs.approvalRequired} onChange={(v) => setNotifs((n) => ({ ...n, approvalRequired: v }))} />
          <Toggle label="Project completed" description="Notify when a project is marked complete" checked={notifs.projectComplete} onChange={(v) => setNotifs((n) => ({ ...n, projectComplete: v }))} />
          <Toggle label="Weekly summary report" description="Receive a weekly efficiency digest" checked={notifs.weeklyReport} onChange={(v) => setNotifs((n) => ({ ...n, weeklyReport: v }))} />
        </div>
      </Card>
    </div>
  )
}

function SecuritySettings() {
  return (
    <div className="max-w-2xl space-y-4">
      <Card>
        <CardTitle className="mb-4">Security</CardTitle>
        <div className="space-y-4">
          <Toggle label="Two-factor authentication" description="Require 2FA for all users" checked={false} onChange={() => {}} />
          <Toggle label="Session timeout" description="Auto-logout after 30 minutes of inactivity" checked={true} onChange={() => {}} />
          <div className="pt-2 border-t border-[var(--border)]">
            <p className="text-sm font-medium mb-2">Change Password</p>
            <div className="space-y-3">
              <Input label="Current Password" type="password" />
              <Input label="New Password" type="password" />
              <Input label="Confirm New Password" type="password" />
              <Button size="sm">Update Password</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

const tabContent: Record<string, React.ReactNode> = {
  branding: <BrandingSettings />,
  company: <CompanySettings />,
  defaults: <DefaultsSettings />,
  notifications: <NotificationsSettings />,
  users: <p className="text-[var(--text-muted)] text-sm pt-4">User management — invite users, set roles. (Implementation uses the Users mock data.)</p>,
  security: <SecuritySettings />,
}

export function SettingsPage() {
  const [tab, setTab] = useState('branding')
  return (
    <div className="space-y-5">
      <PageHeader title="Settings" subtitle="Configure your SheetOptimi workspace" />
      <Tabs tabs={TABS} active={tab} onChange={setTab} />
      <TabContent>{tabContent[tab]}</TabContent>
    </div>
  )
}
