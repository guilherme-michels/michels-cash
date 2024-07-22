import { Link } from 'react-router-dom'

import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'

export function SignUpPage() {
  return (
    <div className="grid size-full grid-cols-1 lg:grid-cols-2">
      <div className="hidden size-full flex-col items-center justify-center bg-black md:flex">
        <strong className="text-4xl font-semibold text-zinc-50">
          Testando
        </strong>
        <span className="mt-1 text-lg text-zinc-300">Testando.</span>
        <Button className="mt-12 bg-white bg-opacity-15 hover:bg-white/20 ">
          Saiba mais
        </Button>
      </div>

      <div className="flex size-full flex-col items-center justify-center">
        <div className="mb-6 flex w-1/2 flex-col">
          <span className="text-mesLightBlue text-3xl">Olá,</span>
          <strong className="text-mesDarkBlue text-5xl">Bem vindo!</strong>
        </div>

        <strong className="mb-4 text-sm text-zinc-700">Frase de efeito</strong>

        <form className="flex w-1/2 flex-col gap-4">
          <Input name="Nome" placeholder="Usuário" label="Usuário" />
          <Input name="Email" placeholder="Email" label="E-mail" />
          <Input
            name="Senha"
            placeholder="Senha"
            type="password"
            label="Senha"
          />
          <Input
            name="Confirmar senha"
            placeholder="Confirmar senha"
            type="password"
            label="Confirmar senha"
          />

          <div className="flex w-full flex-col items-center justify-center gap-4">
            <Button className="h-12 w-full text-base">Criar conta</Button>

            <div className="flex items-center justify-center gap-2">
              <span className="text-sm text-zinc-500">Já possui conta?</span>

              <Link
                to="/sign-in"
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
