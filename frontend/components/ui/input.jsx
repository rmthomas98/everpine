import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-[36px] w-full rounded-md border border-input bg-transparent px-3 py-1 text-[13px] shadow-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground outline-none focus-visible:ring focus-visible:border-foreground/50 dark:focus-visible:border-foreground/50 dark:read-only:focus-visible:border-input focus-visible:ring-ring/10 dark:focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50 read-only:focus-visible:ring-0 read-only:focus-visible:border-input",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
