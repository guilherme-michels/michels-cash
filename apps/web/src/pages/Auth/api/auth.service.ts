import { api } from '../../../index'
import { SignInData } from '../schemas/signInSchema'
import { SignUpData } from '../schemas/signUpSchema'

export function SignIn(data: SignInData): Promise<{
  token: string
  user: { name: string; email: string }
}> {
  return api
    .post<{
      token: string
      user: { name: string; email: string }
    }>('/sessions/password', data)
    .then((res) => res.data)
}

export function SignUp(
  data: SignUpData
): Promise<{ token: string; user: { name: string; email: string } }> {
  return api
    .post<{
      token: string
      user: { name: string; email: string }
    }>('/users', data)
    .then((res) => res.data)
}

export function getProfile(): Promise<{
  user: { name: string; email: string }
}> {
  return api
    .get<{ user: { name: string; email: string } }>('/profile')
    .then((res) => res.data)
}
