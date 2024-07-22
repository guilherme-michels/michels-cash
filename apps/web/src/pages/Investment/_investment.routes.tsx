import { Route } from 'react-router-dom'

import { Investment } from './Investment'

export function InvestmentRoutes() {
  return [
    <Route key="investment" path="/investments" element={<Investment />} />,
  ]
}
