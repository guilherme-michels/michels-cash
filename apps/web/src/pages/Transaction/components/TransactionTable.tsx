import { useQuery } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { DataTable } from '@/components/ui/data-table'
import { TransactionData } from '@/pages/Transaction/schemas/transactionSchema'

import { getFakeTransactions } from '../api/transaction.service'

export function TransactionTable() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionData | null>(null)

  const pageIndex = Number(searchParams.get('page')) || 1
  const [totalPages, setTotalPages] = useState<number | null>(null)

  const { data: transactionData, isLoading } = useQuery({
    queryKey: ['transaction', { page: pageIndex, limit: 10 }],
    queryFn: () => getFakeTransactions(),
  })

  useEffect(() => {
    if (transactionData) {
      setTotalPages(transactionData.pageOptions.lastPage || 1)
    }
  }, [transactionData])

  const handlePageChange = (newPageIndex: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', newPageIndex.toString())
    setSearchParams(params)
  }

  const columns: ColumnDef<TransactionData>[] = [
    {
      accessorKey: 'name',
      header: 'Tipo',
      cell: (info) => <div>a</div>,
    },
    {
      accessorKey: 'value',
      header: 'Valor',
      cell: (info) => <div>a</div>,
    },
    {
      id: 'actions',
      header: 'Ações',
      cell: ({ row }) => (
        <div>
          <button onClick={() => setSelectedTransaction(row.original)}>
            Ações
          </button>
        </div>
      ),
    },
  ]

  if (isLoading) return <div>Carregando...</div>

  return (
    <DataTable
      columns={columns}
      data={transactionData?.transaction || []}
      dateFilter={false}
      pageIndex={pageIndex}
      totalPages={totalPages || 1}
      onPageChange={handlePageChange}
      canFilterColumns={false}
      columnToSearch="name"
      getRowProps={(row) => ({
        onClick: () => setSelectedTransaction(row),
        style: {
          cursor: 'pointer',
          backgroundColor:
            selectedTransaction?.id === row.id ? '#f0f0f0' : 'white',
        },
      })}
    />
  )
}
