import { Route } from 'react-router-dom'

import { Account } from './Account'

export function AccountRoutes() {
  return [<Route key="account" path="/my-account" element={<Account />} />]
}
