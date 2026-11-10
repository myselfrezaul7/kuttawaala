import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold ring-offset-background transition-[transform,opacity,background-color,border-color,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border active:scale-[0.98]",
    {
        variants: {
            variant: {
                default: "bg-primary/95 text-primary-foreground border-primary/30 shadow-[0_4px_20px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.2)] hover:bg-primary hover:shadow-[0_4px_24px_rgba(249,115,22,0.15),inset_0_1px_0_rgba(255,255,255,0.3)] hover:-translate-y-0.5 active:translate-y-0",
                destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:-translate-y-0.5 active:translate-y-0",
                outline: "bg-white/70 dark:bg-zinc-900/70 border-border/60 dark:border-zinc-700/60 text-foreground shadow-[0_2px_10px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,0.6)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-primary/30 hover:-translate-y-0.5 active:translate-y-0",
                secondary: "bg-secondary/90 text-secondary-foreground border-secondary/50 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:bg-secondary hover:-translate-y-0.5 active:translate-y-0",
                ghost: "border-transparent hover:bg-primary/10 hover:text-primary",
                link: "border-transparent text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-6 py-2",
                sm: "h-9 px-4",
                lg: "h-12 px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
