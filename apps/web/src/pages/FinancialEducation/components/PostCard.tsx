import { ArrowRight, User } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Card, CardContent, CardFooter } from '@/components/ui/card'

interface PostCardProps {
  url: string
}

export function PostCard({ url }: PostCardProps) {
  return (
    <Card className="flex-1 cursor-pointer pt-6 transition-all hover:bg-zinc-100">
      <CardContent className="flex size-full items-center gap-4">
        <div className="h-[140px] w-[180px] rounded bg-black" />

        <div className="flex w-full flex-col">
          <div className="flex w-full items-center justify-between">
            <div className="mb-2 flex items-center gap-1 text-zinc-700">
              <User size={14} />
              <span className="text-xs"> Guilherme Michels</span>
            </div>

            <span className="text-xs text-zinc-700">22/04/24</span>
          </div>

          <strong className="text-lg">
            Estratégia de investimentos: aprenda o que é, os tipos e como montar
          </strong>

          <span className="text-sm text-zinc-600">
            Uma estratégia de investimentos é um plano deliberado e bem pensado
            que define como você vai alocar seu dinheiro em diferentes ativos
            financeiros visando alcançar metas de vida específicas. Ter uma
            estratégia é fundamental antes de investir, sobretudo para escolher
            os ativos corretos, mais rentáveis e compatíveis com seu nível de
            risco e metas financeiras.
          </span>

          <div className="flex justify-end">
            <div className="relative mt-2 flex w-auto items-center justify-end gap-2 pb-1 text-sm font-bold text-emerald-800 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full">
              Ver mais
              <ArrowRight size={16} strokeWidth={3} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
