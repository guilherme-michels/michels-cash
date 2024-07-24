import { useState } from 'react'

import { InvestmentDetailsCard } from './components/InvestmentDetailsCard'
import { InvestmentTypesTotalizerCard } from './components/InvestmentTypesTotalizerCard'

export function Investment() {
  const [investmentTypeSelected, setInvestmentTypeSelected] = useState<
    null | string
  >(null)

  return (
    <div className="grid-cols3 grid size-full gap-4 lg:grid-cols-5">
      <InvestmentTypesTotalizerCard
        onSelectInvestmentType={(value) => setInvestmentTypeSelected(value)}
      />

      {investmentTypeSelected && (
        <InvestmentDetailsCard name={investmentTypeSelected} />
      )}
    </div>
  )
}
