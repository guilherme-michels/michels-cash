import * as React from "react";
import { cn } from "../../lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  required?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, label, required, ...props }, ref) => {
    return (
      <div className="relative flex justify-center flex-col w-full">
        {label && (
          <div className="text-xs px-1 !text-zinc-950 mb-1">
            {label}
            {required && <span className="ml-1">*</span>}
            {error && (
              <span className="text-red-600 text-xs mt-1 ml-2">{error}</span>
            )}
          </div>
        )}

        <input
          type={type}
          className={cn(
            "flex h-10 w-full border-[1px] rounded-md bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            error ? "border-red-600" : "border-zinc-300",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
