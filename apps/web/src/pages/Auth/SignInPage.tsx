import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { FormInput } from '../../components/form-input'
import { Button } from '../../components/ui/button'
import { useToast } from '../../components/ui/use-toast'
import { useAuth } from '../../context/AuthContext'
import { SignIn } from './api/auth.service'
import { SignInData, signInSchema } from './schemas/signInSchema'

export function SignInPage() {
  const { reset, handleSubmit, control } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  })

  const { toast } = useToast()
  const { signIn } = useAuth()

  const queryClient = useQueryClient()

  const { mutateAsync: login } = useMutation({
    mutationFn: async (data: SignInData) => {
      return SignIn(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['login'] })
    },
  })

  const onSubmit = async (data: SignInData): Promise<void> => {
    try {
      const response = await login(data)

      signIn({ token: response.token, user: response.user })

      toast({ title: 'Login bem sucedido', status: 'success' })

      reset()
    } catch (err: any) {
      toast({ title: err.response.data.message, status: 'error' })
    }
  }

  return (
    <div className="grid size-full grid-cols-1 lg:grid-cols-2">
      <div className="hidden size-full flex-col items-center justify-center bg-emerald-800 md:flex">
        <strong className="text-4xl font-semibold text-zinc-50">
          MichelsCash
        </strong>
        <span className="mt-1 text-lg text-zinc-300">Teste</span>
        <Button className="mt-12 bg-white bg-opacity-15 hover:bg-white/20 ">
          Saiba mais
        </Button>
      </div>
      <div className="flex size-full flex-col items-center justify-center">
        <div className="mb-6 flex w-full flex-col px-[20%]">
          <span className="text-mesLightBlue text-3xl">Olá,</span>
          <strong className="text-mesDarkBlue text-5xl">Bem vindo!</strong>
        </div>
        <form
          className="flex w-full flex-col gap-4 px-[20%]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormInput
            control={control}
            name="email"
            label="Email"
            required
            placeholder="Informe o email"
          />
          <FormInput
            control={control}
            name="password"
            label="Senha"
            required
            placeholder="Informe a senha"
            type="password"
          />

          <div className="flex w-full flex-col items-center justify-center gap-4">
            <Button type="submit" className="h-12 w-full text-base">
              Entrar
            </Button>

            <div className="flex items-center justify-center gap-2">
              <span className="text-sm text-zinc-500">
                Ainda não possui conta?
              </span>
              <Link
                to="/sign-up"
                className="text-sm text-blue-500 transition-all hover:text-blue-400"
              >
                Cadastrar-se
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
