import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib'

export const textInputVariants = cva(
  'relative flex w-full items-center justify-start rounded-lg border border-zinc-200 font-normal text-zinc-800 outline-none read-only:!border-zinc-200 disabled:!border-zinc-200 disabled:text-zinc-500 dark:border-zinc-600 dark:text-zinc-50 dark:read-only:!border-zinc-600 dark:disabled:!border-zinc-600 dark:disabled:text-zinc-400',
  {
    variants: {
      variant: {
        default: ' focus:border-indigo-500 dark:focus:border-indigo-400',
        warn: 'focus:border-rose-500 dark:focus:border-rose-400',
        none: '',
      },
      size: {
        xs: 'h-8 px-2 py-1 text-sm',
        sm: 'h-9 px-2 py-1 text-sm',
        md: 'h-10 px-3 py-2 text-base',
        lg: 'h-12 px-4 py-2 text-lg',
        none: '',
      },
      withoutBackground: {
        true: 'bg-white dark:bg-zinc-800 placeholder:dark:text-zinc-400',
        false:
          'bg-zinc-100 placeholder:text-zinc-500 focus:bg-white dark:bg-zinc-700 dark:focus:bg-zinc-800',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      withoutBackground: false,
    },
  },
)

export type TextInputVariantProps = VariantProps<typeof textInputVariants>

export function TextInput({
  variant,
  size,
  withoutBackground,
  className,
  ...props
}: Omit<React.JSX.IntrinsicElements['input'], 'size'> & TextInputVariantProps) {
  return (
    <input
      type="text"
      autoComplete="off"
      className={cn(textInputVariants({ variant, size, withoutBackground }), className)}
      {...props}
    />
  )
}
