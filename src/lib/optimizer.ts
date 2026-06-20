/**
 * Client-side guillotine-cut bin-packing algorithm for sheet material optimization.
 *
 * Algorithm: First-Fit Decreasing (FFD) with guillotine-cut placement.
 * Each sheet is modelled as a set of free rectangles (guillotine split).
 * Panels are sorted largest-area-first, then placed into the first fitting
 * free rectangle, optionally rotated to fit.
 *
 * Integration points:
 * - DXF parsing: stub in DxfUploadZone.tsx; a real parser (e.g. dxf-parser npm pkg
 *   or a FastAPI endpoint) should return Panel[] matching the Panel type.
 * - Export: OptimizationResults.tsx has export buttons; wire to a PDF generation
 *   backend endpoint or a client-side canvas-to-PDF lib.
 */

import type { Panel, PlacedPanel, CutSheet, OptimizationResult } from '@/types/panel'
import { PANEL_COLORS } from './constants'

export interface OptimizerConfig {
  sheetWidth: number   // mm
  sheetHeight: number  // mm
  kerf: number         // mm – blade/cut width
  edgeMargin: number   // mm – margin around sheet border
}

interface FreeRect {
  x: number
  y: number
  w: number
  h: number
}

function splitFreeRect(free: FreeRect, placed: { x: number; y: number; w: number; h: number }, kerf: number): FreeRect[] {
  const result: FreeRect[] = []
  // Right piece
  if (free.w - placed.w - kerf > 0) {
    result.push({ x: placed.x + placed.w + kerf, y: free.y, w: free.w - placed.w - kerf, h: free.h })
  }
  // Top piece
  if (free.h - placed.h - kerf > 0) {
    result.push({ x: free.x, y: placed.y + placed.h + kerf, w: placed.w, h: free.h - placed.h - kerf })
  }
  return result
}

function fits(fw: number, fh: number, pw: number, ph: number): boolean {
  return pw <= fw && ph <= fh
}

export function runOptimization(panels: Panel[], config: OptimizerConfig): OptimizationResult {
  const { sheetWidth, sheetHeight, kerf, edgeMargin } = config
  const innerW = sheetWidth - 2 * edgeMargin
  const innerH = sheetHeight - 2 * edgeMargin

  // Expand panels by quantity, sort largest area first (FFD)
  const expanded: (Panel & { colorIdx: number })[] = []
  panels.forEach((p, pi) => {
    for (let i = 0; i < p.quantity; i++) {
      expanded.push({ ...p, id: `${p.id}-${i}`, colorIdx: pi % PANEL_COLORS.length })
    }
  })
  expanded.sort((a, b) => b.width * b.height - a.width * a.height)

  const cutSheets: CutSheet[] = []

  function newSheet(): FreeRect[] {
    return [{ x: edgeMargin, y: edgeMargin, w: innerW, h: innerH }]
  }

  const sheetFreeRects: FreeRect[][] = [newSheet()]
  const sheetPlacements: PlacedPanel[][] = [[]]

  for (const panel of expanded) {
    let placed = false

    for (let si = 0; si < sheetFreeRects.length; si++) {
      const freeRects = sheetFreeRects[si]
      let bestRectIdx = -1
      let bestRotated = false
      let bestArea = Infinity

      for (let fi = 0; fi < freeRects.length; fi++) {
        const fr = freeRects[fi]
        // Try normal orientation
        if (fits(fr.w, fr.h, panel.width, panel.height)) {
          const area = fr.w * fr.h
          if (area < bestArea) { bestArea = area; bestRectIdx = fi; bestRotated = false }
        }
        // Try rotated
        if (panel.width !== panel.height && fits(fr.w, fr.h, panel.height, panel.width)) {
          const area = fr.w * fr.h
          if (area < bestArea) { bestArea = area; bestRectIdx = fi; bestRotated = true }
        }
      }

      if (bestRectIdx >= 0) {
        const fr = freeRects[bestRectIdx]
        const pw = bestRotated ? panel.height : panel.width
        const ph = bestRotated ? panel.width : panel.height
        sheetPlacements[si].push({
          panelId: panel.id,
          label: `${panel.label}${bestRotated ? ' (R)' : ''}`,
          x: fr.x,
          y: fr.y,
          width: pw,
          height: ph,
          rotated: bestRotated,
          color: PANEL_COLORS[panel.colorIdx],
        })
        const newFree = splitFreeRect(fr, { x: fr.x, y: fr.y, w: pw, h: ph }, kerf)
        freeRects.splice(bestRectIdx, 1, ...newFree)
        placed = true
        break
      }
    }

    if (!placed) {
      // Open a new sheet
      const newFreeRects = newSheet()
      const pw = panel.width <= innerW && panel.height <= innerH ? panel.width : panel.height
      const ph = panel.width <= innerW && panel.height <= innerH ? panel.height : panel.width
      const fr = newFreeRects[0]
      sheetPlacements.push([{
        panelId: panel.id,
        label: panel.label,
        x: fr.x,
        y: fr.y,
        width: pw,
        height: ph,
        rotated: false,
        color: PANEL_COLORS[panel.colorIdx],
      }])
      const newFree = splitFreeRect(fr, { x: fr.x, y: fr.y, w: pw, h: ph }, kerf)
      newFreeRects.splice(0, 1, ...newFree)
      sheetFreeRects.push(newFreeRects)
    }
  }

  const sheetArea = sheetWidth * sheetHeight

  for (let si = 0; si < sheetPlacements.length; si++) {
    const placements = sheetPlacements[si]
    const usedArea = placements.reduce((s, p) => s + p.width * p.height, 0)
    const efficiency = (usedArea / sheetArea) * 100
    cutSheets.push({
      sheetIndex: si,
      placements,
      efficiency,
      wasteArea: sheetArea - usedArea,
    })
  }

  const totalUsed = cutSheets.reduce((s, sh) => s + sh.placements.reduce((a, p) => a + p.width * p.height, 0), 0)
  const totalArea = cutSheets.length * sheetArea

  return {
    sheetsRequired: cutSheets.length,
    totalEfficiency: totalArea > 0 ? (totalUsed / totalArea) * 100 : 0,
    totalWasteArea: totalArea - totalUsed,
    totalUsedArea: totalUsed,
    offcutsGenerated: cutSheets.length,
    sheets: cutSheets,
    runAt: new Date().toISOString(),
  }
}
