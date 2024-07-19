import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFormattedDateAndGreeting() {
  const currentDate = new Date()
  const dayOfWeek = currentDate
    .toLocaleString('pt-BR', { weekday: 'long' })
    .replace(/^\w/, (c) => c.toUpperCase())
  const dayOfMonth = currentDate.getDate()
  const monthName = currentDate.toLocaleString('pt-BR', { month: 'long' })
  const hours = currentDate.getHours()

  let greeting

  if (hours >= 5 && hours < 12) {
    greeting = 'Bom dia'
  } else if (hours >= 12 && hours < 18) {
    greeting = 'Boa tarde'
  } else {
    greeting = 'Boa noite'
  }

  const formattedDate = `${dayOfWeek}, ${dayOfMonth} de ${monthName}`

  return { formattedDate, greeting }
}
