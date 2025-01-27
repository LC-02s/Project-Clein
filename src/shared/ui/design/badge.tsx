import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib'

export const badgeVariants = cva(
  'relative flex items-center justify-center whitespace-nowrap border border-zinc-200 font-medium dark:border-zinc-600',
  {
    variants: {
      variant: {
        default: 'bg-white dark:bg-zinc-800',
        light: 'bg-zinc-50 dark:bg-zinc-700',
        none: '',
      },
      color: {
        gray: 'text-zinc-800 dark:text-zinc-50',
        info: 'text-indigo-600 dark:text-indigo-300',
        success: 'text-emerald-600 dark:text-emerald-300',
        caution: 'text-amber-600 dark:text-amber-300',
        warn: 'text-rose-600 dark:text-rose-300',
        none: '',
      },
      size: {
        xs: 'h-6 px-2 text-xs',
        sm: 'h-7 px-2 py-1 text-sm',
        md: 'h-8 px-2 py-1 text-base',
        lg: 'h-9 px-3 py-1 text-base',
        none: '',
      },
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
    defaultVariants: {
      variant: 'light',
      color: 'gray',
      size: 'sm',
      round: 'sm',
    },
  },
)

export type BadgeVariantsProps = VariantProps<typeof badgeVariants>

export type BadgeProps = React.JSX.IntrinsicElements['span'] & BadgeVariantsProps

export const Badge: React.FC<BadgeProps> = ({
  variant,
  color,
  size,
  round,
  className,
  children,
  ...props
}) => (
  <span className={cn(badgeVariants({ variant, color, size, round }), className)} {...props}>
    {children}
  </span>
)
