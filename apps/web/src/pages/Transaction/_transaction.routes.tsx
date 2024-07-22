import { Route } from 'react-router-dom'

import { Transaction } from './Transaction'

export function TransactionRoutes() {
  return [
    <Route key="transaction" path="/transactions" element={<Transaction />} />,
  ]
}
