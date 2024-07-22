import { Route } from 'react-router-dom'

import { Dashboard } from './Dashboard'

export function DashboardRoutes() {
  return [<Route key="dashboard" path="/dashboard" element={<Dashboard />} />]
}
