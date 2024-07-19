import type { PropsWithChildren } from 'react'
import React, { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Auth {
  isAuthenticated: boolean
}

interface signInResponse {
  token: string
}

interface AuthContextProps {
  auth: Auth
  login: (loginResponse: signInResponse) => void
  logout: () => void
}

const TOKEN = 'CBtoken'
const AuthContext = createContext<AuthContextProps>({
  auth: { isAuthenticated: false },
  login: () => {},
  logout: () => {},
})

export const AuthProvider: React.FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !(localStorage.getItem(TOKEN) == null)
  )
  const navigate = useNavigate()

  const logout = (): void => {
    localStorage.removeItem(TOKEN)
    setIsAuthenticated(false)
    navigate('/')
  }

  const login = (loginResponse: signInResponse): void => {
    localStorage.setItem(TOKEN, loginResponse.token)

    setIsAuthenticated(true)
  }

  const auth: Auth = { isAuthenticated }

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
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
