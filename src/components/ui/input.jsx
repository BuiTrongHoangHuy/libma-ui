import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, prefix, ...props }, ref) => {
  return (
    (<input
      prefix={prefix}
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-stone-950 placeholder:text-stone-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-stone-800 dark:bg-stone-950 dark:ring-offset-stone-950 dark:file:text-stone-50 dark:placeholder:text-stone-400 dark:focus-visible:ring-stone-300",
        className
      )}
      ref={ref}
      {...props} />)
  );
})
Input.displayName = "Input"

export { Input }
