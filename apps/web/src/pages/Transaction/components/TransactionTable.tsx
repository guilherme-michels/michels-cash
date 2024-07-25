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

  const [totalPages, setTotalPages] = useState<number | null>(1)
  const [pageIndex, setPageIndex] = useState<number>(1)

  const { data: transactionData, refetch } = useQuery({
    queryKey: [
      'transaction',
      { page: Number(searchParams.get('page')) || 1, limit: 10 },
    ],
    queryFn: () => getFakeTransactions(),
  })

  useEffect(() => {
    if (transactionData) {
      setTotalPages(transactionData.pageOptions.lastPage!)
      const page = Number(searchParams.get('page')) || 1
      setPageIndex(page)
    }
  }, [transactionData, searchParams])

  const handlePageChange = (newPageIndex: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', newPageIndex.toString())
    setSearchParams(params.toString())
  }

  const columns: ColumnDef<TransactionData>[] = [
    {
      header: 'Tipo',
      meta: 'Client',
      enableHiding: false,
      cell: () => {
        return <div>teste</div>
      },
    },
    {
      accessorKey: 'value',
      header: 'Valor',
      meta: 'Valor',
      enableHiding: false,
    },
    {
      id: 'actions',
      header: 'Ações',
      meta: 'Ações',
      cell: ({ row }) => {
        // const patient = row.original as DepositData
        return (
          <div>a</div>
          // <DropDownTable
          //   onDelete={() => {
          //     setSelectedDeposit(patient)
          //     setIsDeleteModalVisible(true)
          //   }}
          //   onEdit={() => {
          //     setSelectedDeposit(patient)
          //     setIsPatientFormModalVisible(true)
          //   }}
          // />
        )
      },
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={transactionData?.transaction || []}
      dateFilter={false}
      pageIndex={pageIndex}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      canFilterColumns={false}
      columnToSearch="name"
      // getRowProps={(row) => ({
      //   onClick: () => {
      //     onChangeSelectedInfo(row)
      //     setSelectedPatient(row)
      //   },
      //   style: {
      //     cursor: 'pointer',
      //     backgroundColor: selectedPatient?.id === row.id ? '#f0f0f0' : 'white',
      //   },
      // })}
    />
  )
}
