import 'dayjs/locale/pt-br'

import dayjs from 'dayjs'
import { ChevronLeft, ChevronRight, User } from 'lucide-react'
import { useState } from 'react'

import { Button } from '../../../components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog'
import { Input } from '../../../components/ui/input'

interface AvailableTimesModalProps {
  isOpened: boolean
  onClose: () => void
  professionals: { value: string; name: string }[]
  availableTimes: {
    morning: string[]
    afternoon: string[]
  }
}

export function AvailableTimesModal({
  isOpened,
  onClose,
  availableTimes,
}: AvailableTimesModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

  const formatDate = (date: Date) => {
    return dayjs(date).locale('pt-br').format('dddd, D [de] MMMM [de] YYYY')
  }

  const handlePreviousDay = () => {
    if (selectedDate) {
      setSelectedDate(dayjs(selectedDate).subtract(1, 'day').toDate())
    }
  }

  const handleNextDay = () => {
    if (selectedDate) {
      setSelectedDate(dayjs(selectedDate).add(1, 'day').toDate())
    }
  }

  return (
    <Dialog open={isOpened} onOpenChange={onClose}>
      <DialogClose onClick={onClose} />
      <DialogContent className="flex max-w-4xl flex-col items-center justify-center">
        <DialogHeader>
          <DialogTitle className="flex flex-col text-xl font-bold">
            Horários Disponíveis
          </DialogTitle>
        </DialogHeader>

        <div className="relative mb-4 w-full">
          <span className="absolute inset-y-0 z-10 flex items-center px-2">
            <User className="text-zinc-500" />
          </span>
          <Input className="pl-10" placeholder="Selecione o profissional" />
        </div>

        <div className="mb-4 flex w-full items-center justify-center">
          <ChevronLeft
            className="cursor-pointer text-zinc-500"
            onClick={handlePreviousDay}
          />
          <span className="mx-4">
            {selectedDate ? formatDate(selectedDate) : ''}
          </span>
          <ChevronRight
            className="cursor-pointer text-zinc-500"
            onClick={handleNextDay}
          />
        </div>

        <div className="flex w-full gap-12">
          <div className="mb-4 flex flex-col">
            <h3 className="mb-2 text-lg font-semibold">Manhã</h3>
            <div className="flex flex-wrap gap-2">
              {availableTimes.morning.map((time) => (
                <Button
                  key={time}
                  className="border-darkerBlue text-darkerBlue border-[1px] !bg-zinc-50 transition-all hover:!bg-zinc-200"
                  type="button"
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="mb-2 text-lg font-semibold">Tarde</h3>
            <div className="flex flex-wrap gap-2">
              {availableTimes.afternoon.map((time) => (
                <Button
                  key={time}
                  className="border-darkerBlue text-darkerBlue border-[1px] !bg-zinc-50 transition-all hover:!bg-zinc-200"
                  type="button"
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
