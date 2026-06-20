/**
 * DXF Upload Zone
 *
 * INTEGRATION POINT: DXF parsing is stubbed here.
 * The expected interface for a real DXF parser is:
 *   parseDxfPanels(file: File): Promise<Panel[]>
 * Each Panel must have: { id, label, width, height, quantity }
 * where width/height are in mm (parsed from DXF drawing units).
 *
 * Possible implementations:
 *   - Client-side: `dxf-parser` npm package (parses ENTITIES section, extract INSERT/LINE blocks)
 *   - Backend: POST /api/v1/dxf/parse → returns Panel[]
 */
import { useCallback } from 'react'
import { Upload } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Panel } from '@/types/panel'

interface DxfUploadZoneProps {
  onPanelsParsed: (panels: Panel[]) => void
}

export function DxfUploadZone({ onPanelsParsed }: DxfUploadZoneProps) {
  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return
    const file = files[0]
    if (!file.name.endsWith('.dxf')) {
      alert('Please upload a .dxf file')
      return
    }

    // TODO: Replace stub with real DXF parser
    // const parsed = await parseDxfPanels(file)
    // onPanelsParsed(parsed)

    // Stub: return a sample set of panels so the UI is demonstrable
    const stubPanels: Panel[] = [
      { id: `dxf-1-${Date.now()}`, label: 'DXF-Panel-A', width: 800, height: 400, quantity: 2 },
      { id: `dxf-2-${Date.now()}`, label: 'DXF-Panel-B', width: 600, height: 600, quantity: 3 },
      { id: `dxf-3-${Date.now()}`, label: 'DXF-Panel-C', width: 1200, height: 300, quantity: 1 },
    ]
    alert(`DXF parsing is stubbed. Loaded ${stubPanels.length} example panels from "${file.name}". Wire a real parser here.`)
    onPanelsParsed(stubPanels)
  }, [onPanelsParsed])

  return (
    <label
      className={cn(
        'flex flex-col items-center justify-center gap-3 p-8 rounded-xl border-2 border-dashed border-[var(--border)] cursor-pointer',
        'hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-light)] transition-colors'
      )}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files) }}
    >
      <Upload size={28} className="text-[var(--text-muted)]" />
      <div className="text-center">
        <p className="text-sm font-medium text-[var(--text-primary)]">Drop DXF file here</p>
        <p className="text-xs text-[var(--text-muted)] mt-1">or click to browse · .dxf files only</p>
      </div>
      <input type="file" accept=".dxf" className="sr-only" onChange={(e) => handleFiles(e.target.files)} />
      <p className="text-[10px] text-[var(--text-muted)] bg-yellow-50 border border-yellow-200 rounded-md px-2 py-1 text-center">
        ⚠️ DXF parsing is stubbed — see DxfUploadZone.tsx for integration notes
      </p>
    </label>
  )
}
