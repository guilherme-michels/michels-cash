import { PageOptions } from '@/interfaces/pageOptions'

import { InvestmentData } from './schemas/investmentSchema'

export function getFakeInvestments(name: string): Promise<{
  message: string
  investment: InvestmentData
  pageOptions: PageOptions
}> {
  const investment = {
    id: '1',
    name: 'LCI',
    description:
      'A Letra de Crédito Imobiliário é um investimento de renda fixa lastreado em uma carteira de empréstimos relacionados ao setor imobiliário.',
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: 'sucesso',
        investment,
        pageOptions: {
          lastPage: 1,
          page: 1,
        },
      })
    }, 500)
  })
}
