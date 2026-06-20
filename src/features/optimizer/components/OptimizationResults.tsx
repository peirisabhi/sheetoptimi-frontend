/**
 * OptimizationResults
 *
 * INTEGRATION POINT — Export buttons:
 * - "Export PDF" → POST /api/v1/optimizer/export/pdf with OptimizationResult payload
 * - "Save Offcuts" → POST /api/v1/offcuts with generated offcut records
 */
import { Download, Save, Layers, TrendingUp, Trash2, Package } from 'lucide-react'
import type { OptimizationResult } from '@/types/panel'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { formatArea, formatPercent } from '@/lib/utils'

interface OptimizationResultsProps {
  result: OptimizationResult
  onExportPdf?: () => void
  onSaveOffcuts?: () => void
}

function StatBlock({ label, value, icon, sub }: { label: string; value: string; icon: React.ReactNode; sub?: string }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-[var(--bg-surface-2)]">
      <div className="p-2 rounded-lg bg-[var(--bg-surface)]">{icon}</div>
      <div>
        <p className="text-xl font-bold text-[var(--text-primary)]">{value}</p>
        <p className="text-xs font-medium text-[var(--text-secondary)]">{label}</p>
        {sub && <p className="text-xs text-[var(--text-muted)]">{sub}</p>}
      </div>
    </div>
  )
}

export function OptimizationResults({ result }: OptimizationResultsProps) {
  const efficiency = result.totalEfficiency
  const effBadge = efficiency >= 85 ? 'success' : efficiency >= 70 ? 'warning' : 'danger'

  return (
    <Card>
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="text-base font-semibold text-[var(--text-primary)]">Optimization Results</h3>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">{new Date(result.runAt).toLocaleString()}</p>
        </div>
        <Badge variant={effBadge}>{formatPercent(efficiency)} efficiency</Badge>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <StatBlock
          label="Sheets Required"
          value={String(result.sheetsRequired)}
          icon={<Layers size={16} style={{ color: 'var(--color-primary)' }} />}
        />
        <StatBlock
          label="Total Efficiency"
          value={formatPercent(result.totalEfficiency)}
          icon={<TrendingUp size={16} className="text-green-600" />}
          sub="Material used vs total"
        />
        <StatBlock
          label="Total Waste"
          value={formatArea(result.totalWasteArea)}
          icon={<Trash2 size={16} className="text-red-500" />}
        />
        <StatBlock
          label="Offcuts Generated"
          value={String(result.offcutsGenerated)}
          icon={<Package size={16} className="text-orange-500" />}
          sub="Saveable remnant pieces"
        />
      </div>

      <div className="flex gap-3">
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            // INTEGRATION POINT: wire to PDF export endpoint
            alert('PDF export — integration point. Wire to /api/v1/optimizer/export/pdf')
          }}
        >
          <Download size={14} />
          Export PDF
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            // INTEGRATION POINT: wire to save offcuts endpoint
            alert('Save Offcuts — integration point. Wire to /api/v1/offcuts (POST)')
          }}
        >
          <Save size={14} />
          Save Offcuts
        </Button>
      </div>
    </Card>
  )
}
