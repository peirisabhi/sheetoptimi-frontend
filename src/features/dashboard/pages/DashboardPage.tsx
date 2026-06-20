import { FolderKanban, Package, TrendingUp, Archive, FileText, Leaf } from 'lucide-react'
import { MetricCard } from '../components/MetricCard'
import { UsageChart } from '../components/UsageChart'
import { MaterialDonut } from '../components/MaterialDonut'
import { RecentProjectsTable } from '../components/RecentProjectsTable'
import { PendingApprovalsList } from '../components/PendingApprovalsList'
import { ActivityTimeline } from '../components/ActivityTimeline'

export function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricCard
          title="Active Projects"
          value={6}
          icon={<FolderKanban size={18} style={{ color: 'var(--color-primary)' }} />}
          trend={{ value: 12, label: 'vs last month' }}
        />
        <MetricCard
          title="Sheets in Stock"
          value={105}
          icon={<Package size={18} className="text-teal-600" />}
          iconBg="bg-teal-100"
          subtitle="Across 3 sites"
        />
        <MetricCard
          title="Avg Efficiency"
          value="91.2%"
          icon={<TrendingUp size={18} className="text-green-600" />}
          iconBg="bg-green-100"
          trend={{ value: 4, label: 'vs last month' }}
        />
        <MetricCard
          title="Offcuts Available"
          value={3}
          icon={<Archive size={18} className="text-orange-600" />}
          iconBg="bg-orange-100"
          subtitle="Ready to reuse"
        />
        <MetricCard
          title="Pending Quotations"
          value={1}
          icon={<FileText size={18} className="text-purple-600" />}
          iconBg="bg-purple-100"
          subtitle="Awaiting approval"
        />
        <MetricCard
          title="Material Saved"
          value="2.4 t"
          icon={<Leaf size={18} className="text-emerald-600" />}
          iconBg="bg-emerald-100"
          trend={{ value: 8, label: 'vs last month' }}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <UsageChart />
        </div>
        <MaterialDonut />
      </div>

      {/* Table + side panels */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <RecentProjectsTable />
        </div>
        <div className="space-y-4">
          <PendingApprovalsList />
          <ActivityTimeline />
        </div>
      </div>
    </div>
  )
}
