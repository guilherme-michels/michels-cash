import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { FormInput } from '@/components/form-input'
import { FormSelect } from '@/components/form-select'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Slider } from '@/components/ui/slider'
import { useToast } from '@/components/ui/use-toast'

import { getInvestmentGroups } from '../api/investmentGroup.service'
import { createInvestmentPlan } from '../api/investmentPlan.service'
import { InvestmentGroupData } from '../schemas/investmentGroupSchema'
import {
  InvestmentPlanData,
  investmentPlanSchema,
} from '../schemas/investmentPlanSchema'

interface InvestmentPlanFormModalProps {
  isOpened: boolean
  onClose: () => void
}

export function InvestmentPlanFormModal({
  isOpened,
  onClose,
}: InvestmentPlanFormModalProps) {
  const { reset, handleSubmit, control } = useForm<InvestmentPlanData>({
    resolver: zodResolver(investmentPlanSchema),
    defaultValues: {
      interestRate: 0, // Initialize with a default value
    },
  })

  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [investmentGroups, setInvestmentGroups] = useState<
    { value: string; name: string }[]
  >([])

  useEffect(() => {
    if (!isOpened) return

    async function fetchInvestmentGroups() {
      try {
        const { investmentGroups } = await getInvestmentGroups()
        const formattedGroups = investmentGroups.map(
          (group: InvestmentGroupData) => ({
            value: group.id!,
            name: group.name,
          })
        )
        setInvestmentGroups(formattedGroups)
      } catch (error) {
        toast({ title: 'Failed to fetch investment groups', status: 'error' })
      }
    }

    fetchInvestmentGroups()
  }, [isOpened, toast])

  const { mutateAsync: addInvestmentPlan } = useMutation({
    mutationFn: async (data: InvestmentPlanData) => {
      return createInvestmentPlan(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investmentPlans'] })
    },
  })

  const onSubmit = async (data: InvestmentPlanData): Promise<void> => {
    try {
      await addInvestmentPlan(data)
      reset()
      onClose()
    } catch (err: any) {
      toast({
        title: err?.response?.data?.message || 'An error occurred',
        status: 'error',
      })
    }
  }

  return (
    <Dialog open={isOpened} onOpenChange={onClose}>
      <DialogClose onClick={onClose} />
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>Adicionar</DialogTitle>
          <DialogDescription>
            Adicione um novo plano de investimento
          </DialogDescription>
        </DialogHeader>

        <form
          className="flex w-full flex-col gap-4 p-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid w-full grid-cols-2 gap-4">
            <div className="flex w-full flex-col gap-4">
              <FormInput
                control={control}
                name="name"
                label="Nome"
                required
                placeholder="Informe o nome"
              />

              <FormInput
                control={control}
                name="description"
                label="Descrição"
                required
                placeholder="Informe a descrição"
              />
            </div>

            <div className="flex w-full flex-col gap-4">
              <FormSelect
                options={investmentGroups}
                control={control}
                name="investmentGroupId"
                label="Grupo de investimento"
                required
              />

              <div className="mb-4 px-1 text-sm !text-zinc-950">Taxa</div>
              <Controller
                name="interestRate"
                control={control}
                render={({ field }) => (
                  <Slider
                    value={[field.value || 0]}
                    onValueChange={(value) => field.onChange(value[0] || 0)}
                    min={0}
                    max={100}
                    step={0.1}
                  />
                )}
              />
            </div>
          </div>

          <DialogFooter>
            <Button className="h-12 text-base" type="button" onClick={onClose}>
              Cancelar
            </Button>

            <Button
              className="h-12 bg-emerald-800 text-base hover:bg-emerald-700"
              type="submit"
            >
              Adicionar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
