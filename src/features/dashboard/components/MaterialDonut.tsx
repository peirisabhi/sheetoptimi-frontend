import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { mockMaterialDonutData } from '@/lib/api/mockData'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'

export function MaterialDonut() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Material Breakdown</CardTitle>
        <span className="text-xs text-[var(--text-muted)]">By sheet count</span>
      </CardHeader>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={mockMaterialDonutData}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={2}
            dataKey="value"
          >
            {mockMaterialDonutData.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 12, fontSize: 13 }}
            formatter={(v: number) => [`${v} sheets`, '']}
          />
          <Legend
            formatter={(value) => <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{value}</span>}
            iconType="circle"
            iconSize={8}
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  )
}
