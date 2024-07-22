import { Route } from 'react-router-dom'

import { FinancialEducation } from './FinancialEducation'

export function FinancialEducationRoutes() {
  return [
    <Route
      key="financial-education"
      path="/financial-education"
      element={<FinancialEducation />}
    />,
  ]
}
