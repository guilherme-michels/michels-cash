import { useEffect, useState } from 'react'

import { cn } from '../lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

interface MultiselectProps {
  options: {
    value: string
    name: string
  }[]
  label: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  defaultValue?: string[]
  value?: string[]
  onChange: (value: string[]) => void
  error?: string | null
}

export function Multiselect({
  options,
  label,
  placeholder,
  required,
  disabled,
  defaultValue,
  value,
  onChange,
  error,
}: MultiselectProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    defaultValue || []
  )

  useEffect(() => {
    if (defaultValue) {
      setSelectedOptions(defaultValue)
    }
  }, [defaultValue])

  useEffect(() => {
    if (value) {
      setSelectedOptions(value)
    }
  }, [value])

  const handleOptionChange = (value: string) => {
    const newSelectedOptions = selectedOptions.includes(value)
      ? selectedOptions.filter((option) => option !== value)
      : [...selectedOptions, value]
    setSelectedOptions(newSelectedOptions)
    onChange(newSelectedOptions)
  }

  return (
    <div className={'flex w-full flex-col'}>
      {label && (
        <div className="text-zinc px-2 text-xs">
          {label}
          {required && <span className="ml-1">*</span>}
          {error && <span className="-600 ml-2 mt-1 text-xs">{error}</span>}
        </div>
      )}

      <Select
        onValueChange={handleOptionChange}
        disabled={disabled || options.length === 0}
        value={selectedOptions.join(', ')}
      >
        <SelectTrigger
          className={cn('mt-1 w-full text-xs ', error && 'border-red')}
        >
          <SelectValue
            placeholder={
              options.length === 0
                ? 'Não existe nenhum dado cadastrado'
                : placeholder || 'Selecione uma opção'
            }
          />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="cursor-pointer text-xs hover:bg-zinc-100"
            >
              {selectedOptions.includes(option.value) && '✓ '}
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
