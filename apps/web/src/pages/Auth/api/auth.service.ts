import { api } from '../../..'
import { SignInData } from '../schemas/signInSchema'

export function SignIn(data: SignInData): Promise<{
  token: string
}> {
  return api
    .post<{ token: string }>('/sessions/password', data)
    .then((res) => res.data)
}
