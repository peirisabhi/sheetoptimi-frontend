import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { Card, CardTitle } from '@/components/ui/Card'
import { MATERIALS, THICKNESSES } from '@/lib/constants'

const schema = z.object({
  material: z.string().min(1, 'Required'),
  thickness: z.coerce.number().positive(),
  sheetWidth: z.coerce.number().min(100, 'Min 100mm'),
  sheetHeight: z.coerce.number().min(100, 'Min 100mm'),
  kerf: z.coerce.number().min(0),
  edgeMargin: z.coerce.number().min(0),
})

export type SheetConfig = z.infer<typeof schema>

interface SheetConfigFormProps {
  onSubmit: (config: SheetConfig) => void
  defaultValues?: Partial<SheetConfig>
}

export function SheetConfigForm({ onSubmit, defaultValues }: SheetConfigFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<SheetConfig>({
    resolver: zodResolver(schema),
    defaultValues: {
      material: 'MDF',
      thickness: 18,
      sheetWidth: 2440,
      sheetHeight: 1220,
      kerf: 3,
      edgeMargin: 5,
      ...defaultValues,
    },
  })

  return (
    <Card>
      <CardTitle className="mb-4">Sheet Configuration</CardTitle>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <Select
          label="Material"
          options={MATERIALS.map((m) => ({ value: m, label: m }))}
          error={errors.material?.message}
          {...register('material')}
        />
        <Select
          label="Thickness (mm)"
          options={THICKNESSES.map((t) => ({ value: String(t), label: `${t}mm` }))}
          error={errors.thickness?.message}
          {...register('thickness')}
        />
        <Input label="Sheet Width (mm)" type="number" error={errors.sheetWidth?.message} {...register('sheetWidth')} />
        <Input label="Sheet Height (mm)" type="number" error={errors.sheetHeight?.message} {...register('sheetHeight')} />
        <Input label="Kerf / Blade Width (mm)" type="number" step="0.5" error={errors.kerf?.message} {...register('kerf')} />
        <Input label="Edge Margin (mm)" type="number" error={errors.edgeMargin?.message} {...register('edgeMargin')} />
        <div className="col-span-full">
          <Button type="submit" variant="outline" size="sm">Apply Config</Button>
        </div>
      </form>
    </Card>
  )
}
