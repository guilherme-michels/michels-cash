import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormDatePicker } from '@/components/form-datepicker'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const filterContentSchema = z.object({
  date: z.any(),
})

export type FilterContentData = z.infer<typeof filterContentSchema>

export function FinancialContentFilter() {
  const { control } = useForm<FilterContentData>({
    resolver: zodResolver(filterContentSchema),
  })

  return (
    <div className="col-span-3 flex flex-col gap-4 px-4 xl:col-span-1">
      <strong className="hidden xl:flex">Filtros de Conteúdos</strong>

      <div className="w-full">
        <span className="ml-2 text-sm">Ordem de visualização</span>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Mais recentes primeiro" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Mais recentes primeiro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full">
        <span className="ml-2 text-sm">Data de publicação</span>
        <FormDatePicker name="date" control={control} />
      </div>

      <div className="w-full">
        <span className="ml-2 text-sm">Área</span>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Renda fixa" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Renda fixa</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full">
        <span className="ml-2 text-sm">Tags</span>
        <Input
          className="rounded-md border-[1px] border-zinc-300 bg-white placeholder:text-black"
          placeholder="Selecione as tags..."
        />
      </div>
    </div>
  )
}
