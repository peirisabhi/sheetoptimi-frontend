import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { OptimizationResult } from '@/types/panel'
import { Card, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'

interface CutLayoutCanvasProps {
  result: OptimizationResult
  sheetWidth: number
  sheetHeight: number
  edgeMargin: number
}

const SVG_MAX_W = 700
const SVG_MAX_H = 400

export function CutLayoutCanvas({ result, sheetWidth, sheetHeight, edgeMargin }: CutLayoutCanvasProps) {
  const [sheetIdx, setSheetIdx] = useState(0)
  const sheet = result.sheets[sheetIdx]
  if (!sheet) return null

  const scale = Math.min(SVG_MAX_W / sheetWidth, SVG_MAX_H / sheetHeight)
  const svgW = sheetWidth * scale
  const svgH = sheetHeight * scale

  return (
    <Card padding="none">
      <div className="flex items-center justify-between p-5 pb-3">
        <div>
          <CardTitle>Cut Layout — Sheet {sheetIdx + 1} of {result.sheetsRequired}</CardTitle>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant={sheet.efficiency >= 85 ? 'success' : sheet.efficiency >= 70 ? 'warning' : 'danger'}>
              {sheet.efficiency.toFixed(1)}% efficient
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="secondary"
            disabled={sheetIdx === 0}
            onClick={() => setSheetIdx((i) => i - 1)}
            aria-label="Previous sheet"
          >
            <ChevronLeft size={16} />
          </Button>
          <span className="text-sm text-[var(--text-muted)]">{sheetIdx + 1} / {result.sheetsRequired}</span>
          <Button
            size="icon"
            variant="secondary"
            disabled={sheetIdx === result.sheetsRequired - 1}
            onClick={() => setSheetIdx((i) => i + 1)}
            aria-label="Next sheet"
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto px-5 pb-5">
        <svg
          width={svgW}
          height={svgH}
          viewBox={`0 0 ${svgW} ${svgH}`}
          style={{ minWidth: Math.min(svgW, 300), maxWidth: '100%' }}
          className="rounded-lg border border-[var(--border)]"
        >
          {/* Sheet background */}
          <rect x={0} y={0} width={svgW} height={svgH} fill="#f8fafc" rx={4} />

          {/* Edge margin indicator */}
          <rect
            x={edgeMargin * scale}
            y={edgeMargin * scale}
            width={(sheetWidth - 2 * edgeMargin) * scale}
            height={(sheetHeight - 2 * edgeMargin) * scale}
            fill="none"
            stroke="#e2e8f0"
            strokeDasharray="4 2"
            strokeWidth={1}
          />

          {/* Placed panels */}
          {sheet.placements.map((p, i) => {
            const x = p.x * scale
            const y = p.y * scale
            const w = p.width * scale
            const h = p.height * scale
            return (
              <g key={`${p.panelId}-${i}`}>
                <rect
                  x={x}
                  y={y}
                  width={w}
                  height={h}
                  fill={p.color}
                  fillOpacity={0.25}
                  stroke={p.color}
                  strokeWidth={1.5}
                  rx={2}
                />
                {/* Label (only if panel is large enough) */}
                {w > 40 && h > 20 && (
                  <>
                    <text
                      x={x + w / 2}
                      y={y + h / 2 - 5}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={Math.max(8, Math.min(11, w / 8))}
                      fill={p.color}
                      fontWeight="600"
                      style={{ pointerEvents: 'none', userSelect: 'none' }}
                    >
                      {p.label}
                    </text>
                    <text
                      x={x + w / 2}
                      y={y + h / 2 + 9}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={Math.max(7, Math.min(9, w / 10))}
                      fill={p.color}
                      fillOpacity={0.7}
                      style={{ pointerEvents: 'none', userSelect: 'none' }}
                    >
                      {p.width}×{p.height}
                    </text>
                  </>
                )}
              </g>
            )
          })}

          {/* Dimension labels */}
          <text x={svgW / 2} y={svgH - 4} textAnchor="middle" fontSize={9} fill="#94a3b8">{sheetWidth}mm</text>
          <text x={4} y={svgH / 2} textAnchor="middle" fontSize={9} fill="#94a3b8" transform={`rotate(-90,6,${svgH / 2})`}>{sheetHeight}mm</text>
        </svg>
      </div>

      {/* Efficiency bar */}
      <div className="px-5 pb-4">
        <ProgressBar value={sheet.efficiency} showLabel size="md" />
        <p className="text-xs text-[var(--text-muted)] mt-1">
          {sheet.placements.length} panels placed · waste: {(sheet.wasteArea / 1_000_000).toFixed(3)} m²
        </p>
      </div>
    </Card>
  )
}
