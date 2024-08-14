import { Search } from 'lucide-react'
import { useState } from 'react'

import { Input } from './ui/input'

interface SearchableProps {
  placeholder?: string
  className?: string
  onSearch?: (query: string) => void
}

export function Searchable({
  placeholder = 'Pesquisar...',
  className = '',
  onSearch,
}: SearchableProps) {
  const [query, setQuery] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setQuery(newValue)
    if (onSearch) {
      onSearch(newValue)
    }
  }

  return (
    <div className={`relative min-w-[300px] lg:min-w-[500px] ${className}`}>
      <span className="absolute inset-y-0 left-0 z-10 flex items-center px-2">
        <Search className="text-zinc-500" />
      </span>
      <Input
        className="rounded-xl border-[1px] border-zinc-300 bg-zinc-50 pl-10"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
      />
    </div>
  )
}
