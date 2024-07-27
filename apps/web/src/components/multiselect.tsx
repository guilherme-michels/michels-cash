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
  disabled?: boolean
  defaultValue?: string
  value?: string
  onChange: (value: string) => void
  error?: string | null
}

export function Multiselect({
  options,
  label,
  placeholder,
  disabled,
  defaultValue,
  value,
  onChange,
  error,
}: MultiselectProps) {
  const [selectedOptions, setSelectedOptions] = useState<string>(
    defaultValue || ''
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
    let newSelectedOptions: string[] = selectedOptions
      ? selectedOptions.split(', ')
      : []

    if (newSelectedOptions.includes(value)) {
      newSelectedOptions = newSelectedOptions.filter(
        (option) => option !== value
      )
    } else {
      newSelectedOptions.push(value)
    }

    const newSelectedOptionsString = newSelectedOptions.join(', ')
    setSelectedOptions(newSelectedOptionsString)
    onChange(newSelectedOptionsString)
  }

  return (
    <div className="relative flex w-full flex-col justify-center">
      {label && <div className="mb-1 px-1 text-sm !text-zinc-950">{label}</div>}

      <Select
        onValueChange={handleOptionChange}
        disabled={disabled || options.length === 0}
        value={selectedOptions}
      >
        <SelectTrigger
          className={cn(
            'mt-1 w-full text-sm focus:border-emerald-800',
            error && 'border-red'
          )}
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
              {selectedOptions.split(', ').includes(option.value)}
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error && <span className="mt-2 px-1 text-xs text-red-600">{error}</span>}
    </div>
  )
}
