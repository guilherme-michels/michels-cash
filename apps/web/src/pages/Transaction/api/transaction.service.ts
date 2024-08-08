import { pageOptions } from '@/interfaces/pageOptions'
import { TransactionData } from '@/pages/Transaction/schemas/transactionSchema'

export function getFakeTransactions(): Promise<{
  message: string
  transaction: TransactionData[]
  pageOptions: pageOptions
}> {
  const transaction = [{ id: '1', name: 'Particular' }]

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: 'sucesso',
        transaction,
        pageOptions: {
          lastPage: 1,
          page: 1,
        },
      })
    }, 500)
  })
}
