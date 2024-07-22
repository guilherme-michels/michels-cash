import { Route } from 'react-router-dom'

import { Settings } from './Settings'

export function SettingsRoutes() {
  return [<Route key="settings" path="/settings" element={<Settings />} />]
}
