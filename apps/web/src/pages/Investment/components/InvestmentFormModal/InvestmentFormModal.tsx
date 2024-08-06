import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { FormInput } from '@/components/form-input'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'

import { createInvestment } from '../../api/investment.service'
import { getInvestmentPlan } from '../../api/investmentPlan.service'
import { InvestmentPlanData } from '../../schemas/investmentPlanSchema'
import {
  InvestmentData,
  investmentSchema,
} from '../../schemas/investmentSchema'
import { InvestmentDetails } from './InvestmentDetails'

interface InvestmentFormModalProps {
  isOpened: boolean
  onClose: () => void
  investmentPlanId?: string
}

export function InvestmentFormModal({
  isOpened,
  onClose,
  investmentPlanId,
}: InvestmentFormModalProps) {
  const { reset, handleSubmit, control } = useForm<InvestmentData>({
    resolver: zodResolver(investmentSchema),
  })

  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [investmentPlan, setInvestmentPlan] =
    useState<InvestmentPlanData | null>(null)

  useEffect(() => {
    if (!isOpened) return

    async function fetchInvestmentPlan() {
      try {
        if (investmentPlanId) {
          const investment = await getInvestmentPlan(investmentPlanId)
          setInvestmentPlan(investment.investmentPlan)
        } else {
          reset()
        }
      } catch (error) {
        toast({ title: 'Failed to fetch investment', status: 'error' })
      }
    }

    fetchInvestmentPlan()
  }, [isOpened, investmentPlanId, reset, toast])

  const { mutateAsync: addInvestment } = useMutation({
    mutationFn: async (data: InvestmentData) => {
      return createInvestment(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investment'] })
    },
  })

  const onSubmit = async (data: InvestmentData): Promise<void> => {
    try {
      await addInvestment(data)
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
      <DialogContent className="max-w-7xl">
        <DialogHeader>
          <DialogTitle>Adicionar Investimento</DialogTitle>
          <DialogDescription>Adicione um novo investimento</DialogDescription>
        </DialogHeader>

        {investmentPlan && (
          <InvestmentDetails investmentPlan={investmentPlan} />
        )}

        <form
          className="flex w-full flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid w-full grid-cols-2 gap-4">
            <div className="flex w-full flex-col gap-4">
              <FormInput
                control={control}
                name="amount"
                label="Quantia"
                required
                type="number"
                step={0.5}
                placeholder="Informe a quantia"
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
