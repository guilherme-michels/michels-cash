import { useQuery } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { formatDate } from 'date-fns'
import { useSearchParams } from 'react-router-dom'

import { DataTable } from '@/components/ui/data-table'
import { formatBRL } from '@/lib/utils'
import { getInvestmentsMovimentationByGroupId } from '@/pages/Investment/api/investment.service'
import { InvestmentMovimentationData } from '@/pages/Investment/schemas/investmentMovimentationSchema'

interface InvestmentMovimentationProps {
  groupId: string
}

export function InvestmentMovimentation({
  groupId,
}: InvestmentMovimentationProps) {
  const [searchParams] = useSearchParams()

  const rangeDays = searchParams.get('rangeDays') || '7'

  const { data: investmentMovimentationData } = useQuery({
    queryKey: ['investmentMovimentation', groupId, rangeDays],
    queryFn: () => getInvestmentsMovimentationByGroupId(groupId, rangeDays),
  })

  const columns: ColumnDef<InvestmentMovimentationData>[] = [
    {
      accessorKey: 'createdAt',
      header: 'Data',
      meta: 'Data',
      cell: ({ row }) => {
        return <div>{formatDate(row.original.createdAt, 'dd/MM/yyyy')}</div>
      },
    },
    {
      accessorKey: 'amount',
      header: 'Valor',
      meta: 'Valor',
      cell: ({ row }) => {
        return <div>{formatBRL(row.original.amount)}</div>
      },
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={investmentMovimentationData?.movimentations || []}
      dateFilter={false}
      isPaginated={false}
      canFilterColumns={false}
      columnToSearch="name"
    />
  )
}
