import { useState } from 'react'

import { InvestmentDetailsCard } from './components/InvestmentDetailsCard'
import { InvestmentTypesTotalizerCard } from './components/InvestmentTypesTotalizerCard'

export function Investment() {
  const [investmentTypeSelected, setInvestmentTypeSelected] = useState<
    null | string
  >(null)

  return (
    <div className="grid size-full grid-cols-5 gap-4">
      <InvestmentTypesTotalizerCard
        onSelectInvestmentType={(value) => setInvestmentTypeSelected(value)}
      />

      {investmentTypeSelected && (
        <InvestmentDetailsCard name={investmentTypeSelected} />
      )}
    </div>
  )
}
