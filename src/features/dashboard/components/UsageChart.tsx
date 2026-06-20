import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer
} from 'recharts'
import { mockUsageChartData } from '@/lib/api/mockData'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'

export function UsageChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Usage & Efficiency</CardTitle>
        <span className="text-xs text-[var(--text-muted)]">Last 6 months</span>
      </CardHeader>
      <ResponsiveContainer width="100%" height={220}>
        <ComposedChart data={mockUsageChartData} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
          <YAxis yAxisId="left" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} domain={[70, 100]} />
          <Tooltip
            contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 12, fontSize: 13 }}
            labelStyle={{ fontWeight: 600 }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar yAxisId="left" dataKey="sheets" name="Sheets Used" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
          <Line yAxisId="right" type="monotone" dataKey="efficiency" name="Efficiency %" stroke="#16a34a" strokeWidth={2} dot={{ r: 4 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  )
}
