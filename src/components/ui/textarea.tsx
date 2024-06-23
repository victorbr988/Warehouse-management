import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex h-28 w-full rounded-md border border-vm-200 px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-vm-800/50 focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-vm-800 dark:bg-vm-900 bg-vm-100 dark:placeholder:text-vm-200/50 dark:text-vm-200 text-vm-800 focus-visible:ring-vm-200 dark:focus-visible:ring-vm-800",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
