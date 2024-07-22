import { PageOptions } from '@interfaces/PageOptions'

import { DepositData } from './depositSchema'

export function getFakeDeposits(): Promise<{
  message: string
  deposits: DepositData[]
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
