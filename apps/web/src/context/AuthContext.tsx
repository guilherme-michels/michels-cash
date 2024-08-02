import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'

import { getProfile } from '@/pages/Auth/api/auth.service'

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
  authenticate: () => Promise<void>
}

const TOKEN = 'michelscash_token'
const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export function AuthProvider({ children }: PropsWithChildren<unknown>) {
  const [user, setUser] = useState<User | null | undefined>()
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem(TOKEN) !== null
  )
  const navigate = useNavigate()

  const signOut = useCallback((): void => {
    localStorage.removeItem(TOKEN)
    setIsAuthenticated(false)
    setUser(null)
    navigate('/')
  }, [navigate])

  const signIn = (response: SignInResponse): void => {
    localStorage.setItem(TOKEN, response.token)
    setUser(response.user)
    setIsAuthenticated(true)
  }

  const authenticate = useCallback(async () => {
    const token = localStorage.getItem(TOKEN)

    if (!token) {
      setUser(null)
      return
    }

    try {
      const response = await getProfile()
      setUser({ email: response.user.email, name: response.user.name })
    } catch (error) {
      console.error(error)
      signOut()
    }
  }, [signOut])

  useEffect(() => {
    authenticate()
  }, [authenticate])

  const auth: Auth = { isAuthenticated }

  return (
    <AuthContext.Provider value={{ auth, signIn, signOut, user, authenticate }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('You must use useAuth within an AuthProvider')
  }
  return context
}
