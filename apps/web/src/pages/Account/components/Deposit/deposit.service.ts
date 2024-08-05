import { PageOptions } from '@/interfaces/pageOptions'

import { TransactionData } from '@/pages/Transaction/schemas/transactionSchema'

export function getFakeDeposits(): Promise<{
  message: string
  deposits: TransactionData[]
  pageOptions: PageOptions
}> {
  const deposits = [{ id: '1', name: 'Particular' }]

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: 'sucesso',
        deposits,
        pageOptions: {
          lastPage: 1,
          page: 1,
        },
      })
    }, 500)
  })
}
