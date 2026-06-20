import { useState } from 'react'
import { Play, RotateCcw } from 'lucide-react'
import { SheetConfigForm, type SheetConfig } from '../components/SheetConfigForm'
import { PanelListTable } from '../components/PanelListTable'
import { DxfUploadZone } from '../components/DxfUploadZone'
import { CutLayoutCanvas } from '../components/CutLayoutCanvas'
import { OptimizationResults } from '../components/OptimizationResults'
import { Button } from '@/components/ui/Button'
import { PageHeader } from '@/components/layout/PageHeader'
import { runOptimization } from '@/lib/optimizer'
import type { Panel, OptimizationResult } from '@/types/panel'

const DEFAULT_PANELS: Panel[] = [
  { id: 'p-demo-1', label: 'Side Panel', width: 800, height: 600, quantity: 4 },
  { id: 'p-demo-2', label: 'Shelf', width: 750, height: 350, quantity: 6 },
  { id: 'p-demo-3', label: 'Back Panel', width: 750, height: 600, quantity: 2 },
  { id: 'p-demo-4', label: 'Door', width: 380, height: 580, quantity: 4 },
  { id: 'p-demo-5', label: 'Base', width: 780, height: 50, quantity: 2 },
]

export function OptimizerPage() {
  const [panels, setPanels] = useState<Panel[]>(DEFAULT_PANELS)
  const [config, setConfig] = useState<SheetConfig>({
    material: 'MDF',
    thickness: 18,
    sheetWidth: 2440,
    sheetHeight: 1220,
    kerf: 3,
    edgeMargin: 5,
  })
  const [result, setResult] = useState<OptimizationResult | null>(null)
  const [running, setRunning] = useState(false)

  function handleConfigSubmit(data: SheetConfig) {
    setConfig(data)
    setResult(null)
  }

  async function handleRunOptimization() {
    if (panels.length === 0) return
    setRunning(true)
    // Simulate async (in practice could be a heavy computation or backend call)
    await new Promise((r) => setTimeout(r, 600))
    const res = runOptimization(panels, {
      sheetWidth: config.sheetWidth,
      sheetHeight: config.sheetHeight,
      kerf: config.kerf,
      edgeMargin: config.edgeMargin,
    })
    setResult(res)
    setRunning(false)
  }

  function handleReset() {
    setResult(null)
    setPanels(DEFAULT_PANELS)
  }

  const totalPanelArea = panels.reduce((s, p) => s + p.width * p.height * p.quantity, 0)

  return (
    <div className="space-y-5">
      <PageHeader
        title="Sheet Optimizer"
        subtitle="Configure your sheet and panels, then run the cut optimization"
        actions={
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={handleReset}>
              <RotateCcw size={14} />
              Reset
            </Button>
            <Button
              size="md"
              onClick={handleRunOptimization}
              loading={running}
              disabled={panels.length === 0}
            >
              <Play size={14} />
              Run Optimization
            </Button>
          </div>
        }
      />

      {/* Config + DXF import */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <SheetConfigForm onSubmit={handleConfigSubmit} defaultValues={config} />
        </div>
        <div className="flex flex-col gap-3">
          <DxfUploadZone onPanelsParsed={(newPanels) => setPanels((prev) => [...prev, ...newPanels])} />
          {panels.length > 0 && (
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface-2)] px-4 py-3 text-sm">
              <p className="font-medium text-[var(--text-primary)]">
                {config.material} · {config.thickness}mm
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Sheet: {config.sheetWidth}×{config.sheetHeight}mm · Kerf: {config.kerf}mm · Margin: {config.edgeMargin}mm
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Total panel area: {(totalPanelArea / 1_000_000).toFixed(3)} m²
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Panel list */}
      <PanelListTable panels={panels} onChange={setPanels} />

      {/* Run button (repeated for convenience below panel list) */}
      {!result && (
        <div className="flex justify-center pt-2">
          <Button
            size="lg"
            onClick={handleRunOptimization}
            loading={running}
            disabled={panels.length === 0}
          >
            <Play size={16} />
            Run Optimization
          </Button>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-4 fade-in">
          <OptimizationResults result={result} />
          <CutLayoutCanvas
            result={result}
            sheetWidth={config.sheetWidth}
            sheetHeight={config.sheetHeight}
            edgeMargin={config.edgeMargin}
          />
        </div>
      )}
    </div>
  )
}
