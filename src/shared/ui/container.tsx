import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib'

export const containerVariants = cva('', {
  variants: {
    variant: {
      default: '',
      image: '',
    },
    layer: { top: '', middle: '', bottom: '' },
    round: {
      xs: 'rounded',
      sm: 'rounded-lg',
      md: 'rounded-xl',
      lg: 'rounded-2xl',
      xl: 'rounded-3xl',
      full: 'rounded-full',
      none: '',
    },
  },
  compoundVariants: [
    {
      variant: 'default',
      layer: 'top',
      class: 'border-zinc-200 bg-white dark:border-zinc-600 dark:bg-zinc-800',
    },
    {
      variant: 'default',
      layer: 'middle',
      class: 'border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800',
    },
    {
      variant: 'default',
      layer: 'bottom',
      class: 'border-zinc-100 bg-white dark:border-zinc-700 dark:bg-zinc-900',
    },
    {
      variant: 'image',
      layer: 'top',
      class:
        'overflow-hidden border border-zinc-200 bg-zinc-200 dark:border-zinc-600 dark:bg-zinc-700',
    },
    {
      variant: 'image',
      layer: ['middle', 'bottom'],
      class:
        'overflow-hidden border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800',
    },
  ],
  defaultVariants: {
    variant: 'default',
    round: 'sm',
    layer: 'top',
  },
})

export type ContainerVariantsProps = VariantProps<typeof containerVariants>

export type ContainerProps = React.JSX.IntrinsicElements['div'] & ContainerVariantsProps

export function Container({
  variant,
  layer,
  round,
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div className={cn(containerVariants({ variant, layer, round }), className)} {...props}>
      {children}
    </div>
  )
}
