import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib'

export const buttonVariants = cva(
  'relative flex select-none items-center justify-center whitespace-nowrap font-medium',
  {
    variants: {
      variant: {
        filled: '',
        default:
          'dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:active:bg-zinc-700 dark:disabled:!bg-zinc-800',
        light:
          'dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-600 dark:disabled:!bg-zinc-700',
        subtle:
          'hover:bg-zinc-100 active:bg-zinc-100 disabled:!bg-transparent dark:hover:bg-zinc-700 dark:active:bg-zinc-700',
        none: '',
      },
      color: { gray: '', info: '', warn: '', none: '' },
      size: { xs: '', sm: '', md: '', lg: '', none: '' },
      square: { true: '', false: '' },
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
        variant: ['default', 'light'],
        color: ['gray', 'info', 'warn'],
        class:
          'border border-zinc-200 bg-white hover:bg-zinc-100 active:bg-zinc-100 disabled:!bg-white dark:border-zinc-600',
      },
      {
        variant: ['default', 'light', 'subtle'],
        color: 'gray',
        class: 'text-zinc-800 disabled:text-zinc-400 dark:text-zinc-50 dark:disabled:text-zinc-500',
      },
      {
        variant: ['default', 'light', 'subtle'],
        color: 'info',
        class:
          'text-indigo-600 disabled:text-indigo-400 dark:text-indigo-300 dark:disabled:text-indigo-500',
      },
      {
        variant: ['default', 'light', 'subtle'],
        color: 'warn',
        class:
          'text-rose-600 disabled:text-rose-400 dark:text-rose-300 dark:disabled:text-rose-500',
      },
      {
        variant: 'filled',
        color: 'gray',
        class:
          'bg-zinc-600 text-white hover:bg-zinc-800 active:bg-zinc-800 disabled:!bg-zinc-300 disabled:text-zinc-50 dark:bg-zinc-50 dark:text-zinc-800 dark:hover:bg-zinc-300 dark:active:bg-zinc-300 dark:disabled:!bg-zinc-700 dark:disabled:text-zinc-500',
      },
      {
        variant: 'filled',
        color: 'info',
        class:
          'bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-700 disabled:!bg-indigo-300 dark:hover:bg-indigo-500 dark:active:bg-indigo-500 dark:disabled:!bg-indigo-900 dark:disabled:text-indigo-500',
      },
      {
        variant: 'filled',
        color: 'warn',
        class:
          'bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-700 disabled:!bg-rose-300 dark:hover:bg-rose-500 dark:active:bg-rose-500 dark:disabled:!bg-rose-900 dark:disabled:text-rose-500',
      },
      { size: 'xs', square: false, class: 'h-8 px-2 py-1 text-sm' },
      { size: 'sm', square: false, class: 'h-9 px-3 py-1 text-sm' },
      { size: 'md', square: false, class: 'h-10 px-3 py-2 text-base' },
      { size: 'lg', square: false, class: 'h-12 px-4 py-2 text-lg' },
      { size: 'xs', square: true, class: 'size-8 p-1' },
      { size: 'sm', square: true, class: 'size-9 p-1' },
      { size: 'md', square: true, class: 'size-10 p-1' },
      { size: 'lg', square: true, class: 'size-12 p-1' },
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

export function Button({
  variant,
  color,
  size,
  round,
  square,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        buttonVariants({ variant, color, size, round, square }),
        'disabled:cursor-not-allowed',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
