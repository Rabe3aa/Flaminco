import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "secondary"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
          "bg-brand-primary text-brand-bg hover:bg-brand-primary/80": variant === "default",
          "text-brand-neutral border border-brand-neutral/20": variant === "outline",
          "bg-brand-neutral/10 text-brand-neutral hover:bg-brand-neutral/20": variant === "secondary",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
