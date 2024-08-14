import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

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
import { useToast } from '@/components/ui/use-toast'

import { getInvestmentGroups } from '../api/investmentGroup.service'
import { createInvestmentPlan } from '../api/investmentPlan.service'
import { InvestmentGroupData } from '../schemas/investmentGroupSchema'
import {
  InvestmentPlanData,
  investmentPlanSchema,
} from '../schemas/investmentPlanSchema'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'
import { riskLevel } from '@/interfaces/riskLevel'

interface InvestmentPlanFormModalProps {
  isOpened: boolean
  onClose: () => void
}

export function InvestmentPlanFormModal({
  isOpened,
  onClose,
}: InvestmentPlanFormModalProps) {
  const [selectedRisk, setSelectedRisk] = useState<riskLevel | null>(null)

  const { reset, handleSubmit, control, setValue } =
    useForm<InvestmentPlanData>({
      resolver: zodResolver(investmentPlanSchema),
      defaultValues: {
        interestRate: 0,
      },
    })

  const handleRiskSelect = (risk: riskLevel) => {
    setSelectedRisk(risk)
    setValue('riskLevel', risk)
  }

  const { toast } = useToast()
  const queryClient = useQueryClient()

  const { data: investmentGroupsData, isLoading: isLoadingGroups } = useQuery({
    queryKey: ['investmentGroups'],
    queryFn: () => getInvestmentGroups({}),
    enabled: isOpened,
  })

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
      <DialogContent className="max-w-6xl">
        <DialogHeader>
          <DialogTitle>Adicionar plano de investimento</DialogTitle>
          <DialogDescription>
            Preencha as informações abaixo para adicionar um novo plano de
            investimento.
          </DialogDescription>
        </DialogHeader>

        <form
          className="flex w-full flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid w-full grid-cols-2 gap-4">
            <div className="col-span-2 flex w-full items-center">
              <FormInput
                control={control}
                name="name"
                label="Nome"
                required
                placeholder="Informe o nome"
              />

              <div className="ml-4 mt-6 flex items-center gap-4">
                <Badge
                  className={`cursor-pointer bg-green-700 hover:bg-green-600 ${selectedRisk === 'LOW' ? 'opacity-100' : 'opacity-50'}`}
                  onClick={() => handleRiskSelect('LOW')}
                >
                  Conservador
                </Badge>
                <Badge
                  className={`cursor-pointer bg-yellow-600 hover:bg-yellow-500 ${selectedRisk === 'MEDIUM' ? 'opacity-100' : 'opacity-50'}`}
                  onClick={() => handleRiskSelect('MEDIUM')}
                >
                  Moderado
                </Badge>
                <Badge
                  className={`cursor-pointer bg-red-700 hover:bg-red-600 ${selectedRisk === 'HIGH' ? 'opacity-100' : 'opacity-50'}`}
                  onClick={() => handleRiskSelect('HIGH')}
                >
                  Arriscado
                </Badge>
              </div>
            </div>

            <div className="col-span-2 h-full">
              <Textarea
                control={control}
                name="description"
                label="Descrição"
                required
                placeholder="Informe a descrição"
              />
            </div>

            <FormSelect
              options={
                investmentGroupsData?.investmentGroups?.map(
                  (group: InvestmentGroupData) => ({
                    value: group.id!,
                    name: group.name,
                  })
                ) || null
              }
              control={control}
              name="investmentGroupId"
              label="Grupo de investimento"
              required
              isLoading={isLoadingGroups}
            />

            <FormInput
              control={control}
              name="minimumInvestmentAmount"
              label="Investimento mínimo"
              type="number"
              placeholder="Informe o valor mínimo"
              required
            />

            <div className="flex size-full items-center gap-2">
              <Switch className="mt-6" />
              <FormInput
                control={control}
                name="maximumInvestmentAmount"
                label="Investimento máximo"
                type="number"
                placeholder="Informe o valor máximo"
                required
              />
            </div>

            <FormInput
              control={control}
              name="duration"
              label="Duração (em meses)"
              type="number"
              placeholder="Informe a duração"
              required
            />

            <FormInput
              control={control}
              name="interestRate"
              label="Taxa de juros"
              type="number"
              placeholder="Informe a taxa de juros"
              required
            />

            <FormInput
              control={control}
              name="liquidity"
              label="Liquidez"
              type="date"
              placeholder="Informe a data de liquidez"
              required
            />

            <div className="flex size-full items-center gap-2">
              <Switch className="mt-6" />
              <FormSelect
                options={[
                  { value: '0', name: 'Perder ganhos' },
                  { value: '1', name: 'Nenhuma penalidade' },
                ]}
                control={control}
                name="penaltyForEarlyWithdrawal"
                label="Penalidade por retirada antecipada"
                required
              />
            </div>

            <FormInput
              control={control}
              name="maturityDate"
              label="Data de vencimento"
              type="date"
              placeholder="Informe a data de vencimento"
              required
            />
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
