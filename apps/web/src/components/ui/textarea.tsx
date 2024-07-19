import * as React from "react";
import { cn } from "../../lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="relative flex justify-center flex-col w-full">
        {label && (
          <div className="text-xs px-1 !text-zinc-950 mb-1">
            {label}

            {error && (
              <span className="text-red-600 text-xs mt-1 ml-2">{error}</span>
            )}
          </div>
        )}

        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border-zinc-300 border-[1px] bg-background px-3 py-2 text-sm  placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
