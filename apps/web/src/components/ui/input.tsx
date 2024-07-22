import * as React from 'react'

import { cn } from '../../lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
  required?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, label, required, ...props }, ref) => {
    return (
      <div className="relative flex w-full flex-col justify-center">
        {label && (
          <div className="mb-2 px-1 text-sm !text-zinc-950">{label}</div>
        )}

        <input
          type={type}
          className={cn(
            'flex h-10 w-full border-b-[2px] bg-transparent  px-3 py-2 text-sm ring-offset-background file:border-0 file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            error ? 'border-red-600' : 'border-zinc-300',
            className
          )}
          ref={ref}
          {...props}
        />

        {error && (
          <span className="mt-2 px-1 text-xs text-red-600">{error}</span>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
