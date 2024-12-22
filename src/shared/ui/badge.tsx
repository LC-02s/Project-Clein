import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib'

export const badgeVariants = cva(
  'relative flex items-center justify-center whitespace-nowrap font-medium',
  {
    variants: {
      color: {
        default:
          'border border-zinc-200 bg-zinc-100 text-zinc-600 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-300',
        info: 'border border-indigo-100 bg-indigo-50 text-indigo-600 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-300',
        success:
          'border border-emerald-100 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300',
        warn: 'border border-rose-100 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-300',
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
      color: 'default',
      size: 'sm',
      round: 'sm',
    },
  },
)

export type BadgeVariantsProps = VariantProps<typeof badgeVariants>

export type BadgeProps = React.JSX.IntrinsicElements['span'] & BadgeVariantsProps

export function Badge({ color, size, round, className, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ color, size, round }), className)} {...props}>
      {children}
    </span>
  )
}
