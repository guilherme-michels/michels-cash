import { useQuery } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { DataTable } from '@/components/ui/data-table'

import { getFakeDeposits } from '../deposit.service'
import { DepositData } from '../depositSchema'

export function DepositTable() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedDeposit, setSelectedDeposit] = useState<DepositData | null>(
    null
  )
  const [totalPages, setTotalPages] = useState<number | null>(1)
  const [pageIndex, setPageIndex] = useState<number>(1)

  const { data: depositData, refetch } = useQuery({
    queryKey: [
      'deposit',
      { page: Number(searchParams.get('page')) || 1, limit: 10 },
    ],
    queryFn: () => getFakeDeposits(),
  })

  useEffect(() => {
    if (depositData) {
      setTotalPages(depositData.pageOptions.lastPage!)
      const page = Number(searchParams.get('page')) || 1
      setPageIndex(page)
    }
  }, [depositData, searchParams])

  const handlePageChange = (newPageIndex: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', newPageIndex.toString())
    setSearchParams(params.toString())
  }

  const columns: ColumnDef<DepositData>[] = [
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
      data={depositData?.deposits || []}
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
