import { Route } from 'react-router-dom'

import { SignInPage } from './SignInPage'
import { SignUpPage } from './SignUpPage'

export function AuthRoutes() {
  return [
    <Route key="signIn" path="/sign-in" element={<SignInPage />} />,
    <Route key="signUp" path="/sign-up" element={<SignUpPage />} />,
  ]
}
