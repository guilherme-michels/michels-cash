import { Routes as ReactRoutes } from 'react-router-dom'

import { AccountRoutes } from './pages/Account/_account.routes'
import { AuthRoutes } from './pages/Auth/_auth.routes'
import { DashboardRoutes } from './pages/Dashboard/_dashboard.routes'
import { FinancialEducationRoutes } from './pages/FinancialEducation/_financialEducation.routes'
import { HomeRoutes } from './pages/Home/_home.routes'
import { InvestmentRoutes } from './pages/Investment/_investment.routes'
import { SettingsRoutes } from './pages/Settings/_settings.routes'
import { TransactionRoutes } from './pages/Transaction/_transaction.routes'

export function Routes(): JSX.Element {
  return (
    <ReactRoutes>
      {[
        ...AuthRoutes(),
        ...HomeRoutes(),
        ...FinancialEducationRoutes(),
        ...TransactionRoutes(),
        ...InvestmentRoutes(),
        ...AccountRoutes(),
        ...DashboardRoutes(),

        ...SettingsRoutes(),
      ]}
    </ReactRoutes>
  )
}
