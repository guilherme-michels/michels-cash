import { Route } from 'react-router-dom'

import { CalendarPage } from './CalendarPage'

export function CalendarRoutes() {
  return [<Route key="calendar" path="/calendar" element={<CalendarPage />} />]
}
