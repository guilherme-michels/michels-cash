import type { PropsWithChildren } from 'react'
import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// import { HttpError } from '@/utils/http'

interface Auth {
  isAuthenticated: boolean
}
interface User {
  id: number
  email: string
  name: string
}

interface signInResponse {
  token: string
  // user: User
}

interface AuthContextProps {
  auth: Auth
  user: User | null | undefined
  signIn: (loginResponse: signInResponse) => void
  signOut: () => void
}

const TOKEN = 'CBtoken'
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

  const signIn = (loginResponse: signInResponse): void => {
    localStorage.setItem(TOKEN, loginResponse.token)
    // setUser(loginResponse.user)
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
