import { PageOptions } from '@interfaces/PageOptions'

import { TransactionData } from '@/pages/Transaction/schemas/transactionSchema'

export function getFakeWithdraws(): Promise<{
  message: string
  withdraws: TransactionData[]
  pageOptions: PageOptions
}> {
  const withdraws = [{ id: '1', name: 'Particular' }]

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: 'sucesso',
        withdraws,
        pageOptions: {
          lastPage: 1,
          page: 1,
        },
      })
    }, 500)
  })
}
