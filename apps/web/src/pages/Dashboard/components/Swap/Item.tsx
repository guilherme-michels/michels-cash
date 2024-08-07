export function DepositsAndWithdrawals() {
  return (
    <div
      data-swapy-item="deposits-and-withdrawals"
      className="h-full rounded-lg bg-white p-4 shadow-lg shadow-zinc-500"
    >
      teste
    </div>
  )
}

export function InvestmentsIcome() {
  return (
    <div
      data-swapy-item="investments-icome"
      className="h-full rounded-lg bg-white p-4 shadow-lg shadow-zinc-500"
    >
      teste
    </div>
  )
}

export function D() {
  return (
    <div
      data-swapy-item="d"
      className="h-full rounded-lg bg-white p-4 shadow-lg shadow-zinc-500"
    >
      teste
    </div>
  )
}

export function E() {
  return (
    <div
      data-swapy-item="e"
      className="h-full rounded-lg bg-white p-4 shadow-lg shadow-zinc-500"
    >
      teste
    </div>
  )
}

export type ItemId =
  | 'deposits-and-withdrawals'
  | 'investments-icome'
  | 'd'
  | 'e'

export function getItemById(itemId: ItemId) {
  switch (itemId) {
    case 'deposits-and-withdrawals':
      return <DepositsAndWithdrawals />
    case 'investments-icome':
      return <InvestmentsIcome />
    case 'd':
      return <D />
    case 'e':
      return <E />
    default:
      return null
  }
}
