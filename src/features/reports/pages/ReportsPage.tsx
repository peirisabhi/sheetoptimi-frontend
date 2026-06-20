import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts'
import { mockUsageChartData, mockMaterialDonutData } from '@/lib/api/mockData'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'

const efficiencyTrendData = mockUsageChartData.map((d) => ({ ...d, target: 90 }))

const wasteData = [
  { material: 'MDF 18mm', waste: 12.4 },
  { material: 'Plywood 12mm', waste: 8.2 },
  { material: 'Particleboard', waste: 14.1 },
  { material: 'MDF 25mm', waste: 6.8 },
]

const costSavings = [
  { month: 'Jan', saved: 1200 },
  { month: 'Feb', saved: 1500 },
  { month: 'Mar', saved: 980 },
  { month: 'Apr', saved: 2100 },
  { month: 'May', saved: 1750 },
  { month: 'Jun', saved: 2400 },
]

export function ReportsPage() {
  return (
    <div className="space-y-5">
      <PageHeader title="Reports" subtitle="Analytics and efficiency insights" />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle>Efficiency Trend</CardTitle><span className="text-xs text-[var(--text-muted)]">Last 6 months vs 90% target</span></CardHeader>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={efficiencyTrendData} margin={{ left: -16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis domain={[70, 100]} tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 12, fontSize: 13 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="efficiency" name="Efficiency %" stroke="var(--color-primary)" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="target" name="Target" stroke="#e2e8f0" strokeDasharray="4 2" strokeWidth={1.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <CardHeader><CardTitle>Waste by Material</CardTitle><span className="text-xs text-[var(--text-muted)]">m² waste this month</span></CardHeader>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={wasteData} layout="vertical" margin={{ left: 60, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="material" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 12, fontSize: 13 }} formatter={(v: number) => [`${v} m²`]} />
              <Bar dataKey="waste" fill="#ef4444" radius={[0, 4, 4, 0]} fillOpacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <CardHeader><CardTitle>Cost Savings</CardTitle><span className="text-xs text-[var(--text-muted)]">USD — from optimized cutting</span></CardHeader>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={costSavings} margin={{ left: -16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 12, fontSize: 13 }} formatter={(v: number) => [`$${v}`]} />
              <Bar dataKey="saved" name="Saved ($)" fill="#16a34a" radius={[4, 4, 0, 0]} fillOpacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <CardHeader><CardTitle>Material Usage Split</CardTitle></CardHeader>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={mockMaterialDonutData} cx="50%" cy="50%" outerRadius={80} dataKey="value" paddingAngle={2}>
                {mockMaterialDonutData.map((e) => <Cell key={e.name} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 12, fontSize: 13 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} iconType="circle" iconSize={8} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}
