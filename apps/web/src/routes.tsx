import { Routes as ReactRoutes } from 'react-router-dom'

import { AuthRoutes } from './pages/Auth/auth.routes'
import { CalendarRoutes } from './pages/Calendar/calendar.routes'
import { HomeRoutes } from './pages/Home/home.routes'

export function Routes(): JSX.Element {
  return (
    <ReactRoutes>
      {[...AuthRoutes(), ...HomeRoutes(), ...CalendarRoutes()]}
    </ReactRoutes>
  )
}
