import { Route } from 'react-router-dom'

import { FinancialEducation } from './FinancialEducation'
import { FinancialEducationPost } from './FinancialEducationPost'

export function FinancialEducationRoutes() {
  return [
    <Route
      key="financial-education"
      path="/financial-education"
      element={<FinancialEducation />}
    />,

    <Route
      key="financial-education-post"
      path="/financial-education/post/1"
      element={<FinancialEducationPost />}
    />,
  ]
}
