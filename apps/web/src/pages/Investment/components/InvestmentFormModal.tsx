import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { FormInput } from '@/components/form-input'
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
import { useToast } from '@/components/ui/use-toast'

import { createInvestment, getInvestment } from '../api/investment.service'
import { InvestmentData, investmentSchema } from '../schemas/investmentSchema'

interface InvestmentFormModalProps {
  isOpened: boolean
  onClose: () => void
  investmentId?: string
}

export function InvestmentFormModal({
  isOpened,
  onClose,
  investmentId,
}: InvestmentFormModalProps) {
  const { reset, handleSubmit, control } = useForm<InvestmentData>({
    resolver: zodResolver(investmentSchema),
  })

  const { toast } = useToast()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!isOpened) return

    async function fetchInvestment() {
      try {
        if (investmentId) {
          const investment = await getInvestment(investmentId)
          console.log(investment)
        } else {
          reset()
        }
      } catch (error) {
        toast({ title: 'Failed to fetch investment', status: 'error' })
      }
    }

    fetchInvestment()
  }, [isOpened, investmentId, reset, toast])

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
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>Adicionar Investimento</DialogTitle>
          <DialogDescription>
            Adicione um novo plano de investimento
          </DialogDescription>
        </DialogHeader>
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
