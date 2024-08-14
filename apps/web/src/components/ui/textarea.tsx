import * as React from 'react'

import { cn } from '../../lib/utils'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="relative flex w-full flex-col justify-center">
        {label && (
          <div className="mb-1 px-1 text-xs !text-zinc-950">
            {label}

            {error && (
              <span className="ml-2 mt-1 text-xs text-red-600">{error}</span>
            )}
          </div>
        )}

        <textarea
          className={cn(
            'flex h-[70px] w-full rounded-md border-[1px] border-zinc-300 bg-background px-3 py-2 text-sm  placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
