import { useState } from 'react'
import { Plus, Trash2, Check, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Table, Thead, Tbody, Th, Td, Tr } from '@/components/ui/Table'
import type { Panel } from '@/types/panel'
import { PANEL_COLORS } from '@/lib/constants'

const schema = z.object({
  label: z.string().min(1, 'Required'),
  width: z.coerce.number().min(1, 'Min 1mm'),
  height: z.coerce.number().min(1, 'Min 1mm'),
  quantity: z.coerce.number().int().min(1),
  notes: z.string().optional(),
})

type PanelForm = z.infer<typeof schema>

interface PanelListTableProps {
  panels: Panel[]
  onChange: (panels: Panel[]) => void
}

export function PanelListTable({ panels, onChange }: PanelListTableProps) {
  const [showAdd, setShowAdd] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<PanelForm>({
    resolver: zodResolver(schema),
    defaultValues: { label: '', width: 600, height: 400, quantity: 1 },
  })

  function addPanel(data: PanelForm) {
    const newPanel: Panel = {
      id: `panel-${Date.now()}`,
      ...data,
    }
    onChange([...panels, newPanel])
    reset()
    setShowAdd(false)
  }

  function removePanel(id: string) {
    onChange(panels.filter((p) => p.id !== id))
  }

  const totalPanels = panels.reduce((s, p) => s + p.quantity, 0)

  return (
    <Card padding="none">
      <div className="flex items-center justify-between p-5 pb-0">
        <div>
          <CardTitle>Panel List</CardTitle>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">{panels.length} types · {totalPanels} total panels</p>
        </div>
        <Button size="sm" onClick={() => setShowAdd((v) => !v)}>
          <Plus size={14} />
          Add Panel
        </Button>
      </div>

      {showAdd && (
        <div className="m-4 p-4 rounded-xl border border-dashed border-[var(--border)] bg-[var(--bg-surface-2)]">
          <p className="text-sm font-medium mb-3 text-[var(--text-primary)]">New Panel</p>
          <form onSubmit={handleSubmit(addPanel)} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Input label="Label" placeholder="Panel A" error={errors.label?.message} {...register('label')} />
            <Input label="Width (mm)" type="number" error={errors.width?.message} {...register('width')} />
            <Input label="Height (mm)" type="number" error={errors.height?.message} {...register('height')} />
            <Input label="Qty" type="number" error={errors.quantity?.message} {...register('quantity')} />
            <div className="col-span-full flex gap-2">
              <Button type="submit" size="sm"><Check size={13} />Add</Button>
              <Button type="button" size="sm" variant="ghost" onClick={() => setShowAdd(false)}><X size={13} />Cancel</Button>
            </div>
          </form>
        </div>
      )}

      {panels.length === 0 ? (
        <p className="text-sm text-[var(--text-muted)] p-8 text-center">No panels yet. Add panels above or upload a DXF.</p>
      ) : (
        <Table className="mt-2">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Label</Th>
              <Th>Width</Th>
              <Th>Height</Th>
              <Th>Qty</Th>
              <Th>Area</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {panels.map((p, idx) => (
              <Tr key={p.id}>
                <Td>
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: PANEL_COLORS[idx % PANEL_COLORS.length] }} />
                </Td>
                <Td className="font-medium">{p.label}</Td>
                <Td>{p.width} mm</Td>
                <Td>{p.height} mm</Td>
                <Td>{p.quantity}</Td>
                <Td className="text-[var(--text-muted)] text-xs">
                  {((p.width * p.height * p.quantity) / 1_000_000).toFixed(3)} m²
                </Td>
                <Td>
                  <button
                    className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                    onClick={() => removePanel(p.id)}
                    aria-label="Remove panel"
                  >
                    <Trash2 size={14} />
                  </button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Card>
  )
}
