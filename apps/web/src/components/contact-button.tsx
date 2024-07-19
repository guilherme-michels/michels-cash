import clsx from 'clsx'

import mailIcon from '../assets/mail-icon.png'
import phoneIcon from '../assets/phone-icon.png'
import zapIcon from '../assets/whatsapp-icon.png'
import { Button } from './ui/button'

interface ContactButtonProps {
  type: 'email' | 'phone' | 'whatsapp'
}

const buttonStyles: Record<string, string> = {
  email:
    'border border-blue-500 bg-blue-100 text-blue-700 hover:bg-blue-200 flex items-center space-x-2',
  phone:
    'border border-green-500 bg-green-100 text-green-700 hover:bg-green-200 flex items-center space-x-2',
  whatsapp:
    'border border-green-700 bg-green-100 text-green-900 hover:bg-green-200 flex items-center space-x-2',
}

const buttonTexts: Record<string, string> = {
  email: 'Email',
  phone: 'Telefone',
  whatsapp: 'WhatsApp',
}

const buttonIcons: Record<string, string> = {
  email: mailIcon,
  phone: phoneIcon,
  whatsapp: zapIcon,
}

export function ContactButton({ type }: ContactButtonProps) {
  const buttonStyle = buttonStyles[type]
  const buttonText = buttonTexts[type]
  const buttonIcon = buttonIcons[type]

  return (
    <Button className={clsx(buttonStyle)}>
      <img src={buttonIcon} alt={`${type} icon`} className="h-4 w-4" />
      <span>{buttonText}</span>
    </Button>
  )
}
