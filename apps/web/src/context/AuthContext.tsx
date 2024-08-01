import type { PropsWithChildren } from 'react'
import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// import { HttpError } from '@/utils/http'

interface Auth {
  isAuthenticated: boolean
}
interface User {
  email: string
  name: string
}

type SignInResponse = {
  token: string
  user: {
    email: string
    name: string
  }
}

interface AuthContextProps {
  auth: Auth
  user: User | null | undefined
  signIn: (response: SignInResponse) => void
  signOut: () => void
}

const TOKEN = 'michelscash_token'
const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export function AuthProvider({ children }: PropsWithChildren<unknown>) {
  const [user, setUser] = useState<User | null | undefined>()
  // const [error, setError] = useState<HttpError>()

  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !(localStorage.getItem(TOKEN) == null)
  )
  const navigate = useNavigate()

  const signOut = (): void => {
    localStorage.removeItem(TOKEN)
    setIsAuthenticated(false)
    setUser(null)
    navigate('/')
  }

  const signIn = (response: SignInResponse): void => {
    localStorage.setItem(TOKEN, response.token)
    setUser(response.user)
    setIsAuthenticated(true)
  }

  const auth: Auth = { isAuthenticated }

  return (
    <AuthContext.Provider value={{ auth, signIn, signOut, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext)
  if (context == null) {
    throw new Error('You must use useAuth within an AuthProvider')
  }
  return context
}
