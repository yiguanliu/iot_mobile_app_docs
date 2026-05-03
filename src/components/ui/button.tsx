import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center font-mono font-bold tracking-wider uppercase whitespace-nowrap select-none active:scale-[0.97] transition-[background,color,box-shadow,border]',
  {
    variants: {
      variant: {
        primary:     'bg-primary text-bg-card border border-transparent',
        secondary:   'bg-bg-card text-primary border border-primary',
        ghost:       'bg-transparent text-secondary border border-transparent hover:bg-bg-card-dark',
        destructive: 'bg-accent text-white border border-transparent',
      },
      size: {
        sm: 'h-7 px-3 text-[10px]',
        md: 'h-10 px-5 text-[11px]',
        lg: 'h-12 px-6 text-[13px]',
      },
      shape: {
        pill:   'rounded-pill',
        square: 'rounded-tight',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md', shape: 'pill' },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp ref={ref} className={cn(buttonVariants({ variant, size, shape }), className)} {...props} />
  }
)
Button.displayName = 'Button'

export { buttonVariants }
