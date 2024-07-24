import { InvestmentList } from './InvestmentList'

const investmentsData: { [key: string]: { name: string; details: string }[] } =
  {
    LCI: [
      { name: 'Investment 1', details: 'Details about investment 1' },
      { name: 'Investment 2', details: 'Details about investment 2' },
      { name: 'Investment 3', details: 'Details about investment 3' },
      { name: 'Investment 1', details: 'Details about investment 1' },
      { name: 'Investment 2', details: 'Details about investment 2' },
      { name: 'Investment 3', details: 'Details about investment 3' },
      { name: 'Investment 1', details: 'Details about investment 1' },
      { name: 'Investment 2', details: 'Details about investment 2' },
    ],

    LCA: [
      { name: 'Investment 1', details: 'Details about investment 1' },
      { name: 'Investment 2', details: 'Details about investment 2' },
      { name: 'Investment 3', details: 'Details about investment 3' },
      { name: 'Investment 1', details: 'Details about investment 1' },
      { name: 'Investment 2', details: 'Details about investment 2' },
      { name: 'Investment 3', details: 'Details about investment 3' },
      { name: 'Investment 1', details: 'Details about investment 1' },
      { name: 'Investment 2', details: 'Details about investment 2' },
    ],

    LBC: [
      { name: 'Investment 1', details: 'Details about investment 1' },
      { name: 'Investment 2', details: 'Details about investment 2' },
      { name: 'Investment 3', details: 'Details about investment 3' },
      { name: 'Investment 1', details: 'Details about investment 1' },
      { name: 'Investment 2', details: 'Details about investment 2' },
      { name: 'Investment 3', details: 'Details about investment 3' },
      { name: 'Investment 1', details: 'Details about investment 1' },
      { name: 'Investment 2', details: 'Details about investment 2' },
    ],

    LDC: [
      { name: 'Investment 1', details: 'Details about investment 1' },
      { name: 'Investment 2', details: 'Details about investment 2' },
      { name: 'Investment 3', details: 'Details about investment 3' },
      { name: 'Investment 1', details: 'Details about investment 1' },
      { name: 'Investment 2', details: 'Details about investment 2' },
      { name: 'Investment 3', details: 'Details about investment 3' },
      { name: 'Investment 1', details: 'Details about investment 1' },
      { name: 'Investment 2', details: 'Details about investment 2' },
    ],
  }

export function Investments() {
  return (
    <div className="mb-20 max-h-[70vh] overflow-y-auto overflow-x-hidden">
      {Object.keys(investmentsData).map((key) => (
        <InvestmentList
          key={key}
          title={key}
          investments={investmentsData[key]}
        />
      ))}
    </div>
  )
}
