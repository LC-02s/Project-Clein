import { cva, type VariantProps } from 'class-variance-authority'

import { cn, createPolymorphicComponent } from '../../lib'

export const buttonVariants = cva(
  'relative flex select-none items-center justify-center whitespace-nowrap font-medium',
  {
    variants: {
      variant: {
        filled: '',
        default:
          'dark:bg-gray-800 dark:hover:bg-gray-700 dark:active:bg-gray-700 dark:disabled:!bg-gray-800',
        light:
          'dark:bg-gray-700 dark:hover:bg-gray-600 dark:active:bg-gray-600 dark:disabled:!bg-gray-700',
        subtle:
          'hover:bg-gray-100 active:bg-gray-100 disabled:!bg-transparent dark:hover:bg-gray-700 dark:active:bg-gray-700',
      },
      color: { gray: '', info: '', warn: '' },
      size: { xs: '', sm: '', md: '', lg: '' },
      square: { true: '', false: '' },
      round: {
        xs: 'rounded',
        sm: 'rounded-lg',
        md: 'rounded-xl',
        lg: 'rounded-2xl',
        xl: 'rounded-3xl',
        full: 'rounded-full',
      },
    },
    compoundVariants: [
      {
        variant: ['default', 'light'],
        color: ['gray', 'info', 'warn'],
        class:
          'border border-gray-200 bg-white hover:bg-gray-100 active:bg-gray-100 disabled:!bg-white dark:border-gray-600',
      },
      {
        variant: ['default', 'light', 'subtle'],
        color: 'gray',
        class: 'text-gray-800 disabled:text-gray-400 dark:text-gray-50 dark:disabled:text-gray-500',
      },
      {
        variant: ['default', 'light', 'subtle'],
        color: 'info',
        class:
          'text-blue-700 disabled:text-blue-400 dark:text-blue-300 dark:disabled:text-blue-500',
      },
      {
        variant: ['default', 'light', 'subtle'],
        color: 'warn',
        class: 'text-red-700 disabled:text-red-400 dark:text-red-300 dark:disabled:text-red-500',
      },
      {
        variant: 'filled',
        color: 'gray',
        class:
          'bg-gray-600 text-white hover:bg-gray-800 active:bg-gray-800 disabled:!bg-gray-300 disabled:text-gray-50 dark:bg-gray-50 dark:text-gray-800 dark:hover:bg-gray-300 dark:active:bg-gray-300 dark:disabled:!bg-gray-700 dark:disabled:text-gray-500',
      },
      {
        variant: 'filled',
        color: 'info',
        class:
          'bg-blue-700 text-white hover:bg-blue-900 active:bg-blue-900 disabled:!bg-blue-200 dark:hover:bg-blue-500 dark:active:bg-blue-500 dark:disabled:!bg-blue-900 dark:disabled:text-blue-400',
      },
      {
        variant: 'filled',
        color: 'warn',
        class:
          'bg-red-700 text-white hover:bg-red-900 active:bg-red-900 disabled:!bg-red-200 dark:hover:bg-red-500 dark:active:bg-red-500 dark:disabled:!bg-red-900 dark:disabled:text-red-400',
      },
      { size: 'xs', square: false, class: 'h-7 px-2 py-1 text-sm md:h-8' },
      { size: 'sm', square: false, class: 'h-8 px-3 py-1 text-sm md:h-9' },
      { size: 'md', square: false, class: 'h-9 px-3 py-1 text-sm md:h-10 md:text-base' },
      { size: 'lg', square: false, class: 'h-10 px-4 py-1 text-base md:h-12 md:text-lg' },
      { size: 'xs', square: true, class: 'size-7 p-1 md:size-8' },
      { size: 'sm', square: true, class: 'size-8 p-1 md:size-9' },
      { size: 'md', square: true, class: 'size-9 p-1 md:size-10' },
      { size: 'lg', square: true, class: 'size-10 p-1 md:size-12' },
    ],
    defaultVariants: {
      variant: 'default',
      color: 'gray',
      size: 'md',
      round: 'sm',
      square: false,
    },
  },
)

export type ButtonVariantProps = VariantProps<typeof buttonVariants>

export type ButtonProps = React.JSX.IntrinsicElements['button'] & ButtonVariantProps

export const Button = createPolymorphicComponent<
  ButtonVariantProps,
  React.JSX.IntrinsicElements['button']
>(
  ({
    variant,
    color,
    size,
    round,
    square,
    className,
    children,
    component: Component = 'button',
    ...props
  }) => (
    <Component
      type={Component === 'button' ? 'button' : undefined}
      className={cn(
        buttonVariants({ variant, color, size, round, square }),
        'disabled:cursor-not-allowed',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  ),
)
