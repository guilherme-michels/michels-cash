import { Route, Routes as ReactRoutes } from 'react-router-dom'

import { useAuth } from './context/AuthContext'
import { AccountRoutes } from './pages/Account/_account.routes'
import { AuthRoutes } from './pages/Auth/_auth.routes'
import { DashboardRoutes } from './pages/Dashboard/_dashboard.routes'
import { FinancialEducationRoutes } from './pages/FinancialEducation/_financialEducation.routes'
import { HomeRoutes } from './pages/Home/_home.routes'
import { InvestmentRoutes } from './pages/Investment/_investment.routes'
import { SettingsRoutes } from './pages/Settings/_settings.routes'
import { TransactionRoutes } from './pages/Transaction/_transaction.routes'

export function AppRoutes(): JSX.Element {
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

        <Route key="error" path="*" element={<ErrorBoundary />} />,
      ]}
    </ReactRoutes>
  )
}

function ErrorBoundary() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 bg-background">
      Essa pagina nem existe
    </div>
  )
}

function UnauthRoutes() {
  return (
    <ReactRoutes>
      {[
        ...AuthRoutes(),
        <Route key="error" path="*" element={<ErrorBoundary />} />,
      ]}
    </ReactRoutes>
  )
}

export function Routes() {
  const { auth } = useAuth()

  if (!auth) {
    return <UnauthRoutes />
  } else {
    return <AppRoutes />
  }
}
