import { cva, type VariantProps } from 'class-variance-authority'

import { cn, createPolymorphicComponent } from '../../lib'

export const badgeVariants = cva(
  'relative flex items-center justify-center whitespace-nowrap border border-gray-200 font-medium dark:border-gray-600',
  {
    variants: {
      variant: {
        default: 'bg-white dark:bg-gray-800',
        light: 'bg-gray-50 dark:bg-gray-700',
      },
      color: {
        gray: 'text-gray-800 dark:text-gray-50',
        info: 'text-blue-700 dark:text-blue-300',
        success: 'text-green-700 dark:text-green-300',
        caution: 'text-yellow-700 dark:text-yellow-300',
        warn: 'text-red-700 dark:text-red-300',
      },
      size: {
        xs: 'h-5 px-2 text-xs md:h-6',
        sm: 'h-6 px-2 py-1 text-xs md:h-7 md:text-sm',
        md: 'h-7 px-2 py-1 text-sm md:h-8 md:text-base',
        lg: 'h-8 px-3 py-1 text-sm md:h-9 md:text-base',
      },
      round: {
        xs: 'rounded',
        sm: 'rounded-lg',
        md: 'rounded-xl',
        lg: 'rounded-2xl',
        xl: 'rounded-3xl',
        full: 'rounded-full',
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

export const Badge = createPolymorphicComponent<
  BadgeVariantsProps,
  React.JSX.IntrinsicElements['span']
>(
  ({
    variant,
    color,
    size,
    round,
    className,
    children,
    component: Component = 'span',
    ...props
  }) => (
    <Component className={cn(badgeVariants({ variant, color, size, round }), className)} {...props}>
      {children}
    </Component>
  ),
)
