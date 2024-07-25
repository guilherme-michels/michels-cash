import './index.css'

import { QueryClientProvider } from '@tanstack/react-query'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import { BrowserRouter } from 'react-router-dom'

import { Toaster } from './components/ui/toaster'
import { TooltipProvider } from './components/ui/tooltip'
import { AuthProvider } from './context/AuthContext'
import { queryClient } from './lib/react-query'
import { Routes } from './routes'

dayjs.locale({
  ...ptBr,
  weekStart: 1,
})

export function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Routes />
            <Toaster />
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}
