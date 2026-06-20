export interface Panel {
  id: string
  label: string
  width: number   // mm
  height: number  // mm
  quantity: number
  material?: string
  thickness?: number
  notes?: string
}

export interface Sheet {
  id: string
  width: number
  height: number
  material: string
  thickness: number
}

export interface PlacedPanel {
  panelId: string
  label: string
  x: number
  y: number
  width: number
  height: number
  rotated: boolean
  color: string
}

export interface CutSheet {
  sheetIndex: number
  placements: PlacedPanel[]
  efficiency: number
  wasteArea: number
}

export interface OptimizationResult {
  sheetsRequired: number
  totalEfficiency: number
  totalWasteArea: number
  totalUsedArea: number
  offcutsGenerated: number
  sheets: CutSheet[]
  runAt: string
}
