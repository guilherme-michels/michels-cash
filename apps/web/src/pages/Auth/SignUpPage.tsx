import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { FormInput } from '@/components/form-input'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/context/AuthContext'

import { Button } from '../../components/ui/button'
import { SignUp } from './api/auth.service'
import { SignUpData, signUpSchema } from './schemas/signUpSchema'

export function SignUpPage() {
  const { reset, handleSubmit, control } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  })

  const { toast } = useToast()
  const { signIn } = useAuth()

  const queryClient = useQueryClient()

  const { mutateAsync: register } = useMutation({
    mutationFn: async (data: SignUpData) => {
      return SignUp(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['register'] })
    },
  })

  const onSubmit = async (data: SignUpData): Promise<void> => {
    try {
      const response = await register(data)
      signIn({ token: response.token, user: response.user })

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
        <span className="mt-1 text-lg text-zinc-300">Testando.</span>
        <Button className="mt-12 bg-white bg-opacity-15 hover:bg-white/20 ">
          Saiba mais
        </Button>
      </div>

      <div className="flex size-full flex-col items-center justify-center">
        <div className="mb-6 flex w-full flex-col px-[20%]">
          <span className="text-mesLightBlue text-3xl">Olá,</span>
          <strong className="text-mesDarkBlue text-5xl">Bem vindo!</strong>
        </div>

        <strong className="mb-4 text-sm text-zinc-700">
          MichelsCash, o banco que te leva pra frente!
        </strong>

        <form
          className="flex w-full flex-col gap-4 px-[20%]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormInput
            control={control}
            name="name"
            label="Nome"
            required
            placeholder="Informe o email"
          />

          <FormInput
            control={control}
            name="email"
            label="E-mail"
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

          {/* 
          <Input
            name="Confirmar senha"
            placeholder="Confirmar senha"
            type="password"
            label="Confirmar senha"
          /> */}

          <div className="flex w-full flex-col items-center justify-center gap-4">
            <Button className="h-12 w-full text-base" type="submit">
              Criar conta
            </Button>

            <div className="flex items-center justify-center gap-2">
              <span className="text-sm text-zinc-500">Já possui conta?</span>

              <Link
                to="/"
                className="text-sm text-blue-500 transition-all hover:text-blue-400"
              >
                Conectar-se
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
