import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap transition-all duration-200 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-terracotta-500 text-cream-50 hover:bg-terracotta-600 active:bg-terracotta-700 shadow-warm hover:shadow-warm-lg",
        secondary:
          "bg-umber-900 text-cream-50 hover:bg-umber-700 shadow-warm",
        ghost:
          "bg-transparent text-umber-900 hover:bg-umber-900/8",
        outline:
          "bg-transparent text-umber-900 border border-umber-900/25 hover:border-umber-900/50 hover:bg-umber-900/4",
        danger:
          "bg-transparent text-danger hover:bg-danger/10 border border-danger/30",
      },
      size: {
        sm: "h-9 px-3 text-sm rounded-md",
        md: "h-11 px-5 text-sm rounded-lg",
        lg: "h-14 px-8 text-base rounded-lg tracking-tight",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { buttonVariants };
