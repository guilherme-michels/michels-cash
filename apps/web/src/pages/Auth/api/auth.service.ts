import { api } from '../../../index'

import { SignInData } from '../schemas/signInSchema'
import { SignUpData } from '../schemas/signUpSchema'

export function SignIn(data: SignInData): Promise<{
  token: string
}> {
  return api
    .post<{ token: string }>('/sessions/password', data)
    .then((res) => res.data)
}

export function SignUp(data: SignUpData): Promise<{ token: string }> {
  return api.post<{ token: string }>('/users', data).then((res) => res.data)
}
