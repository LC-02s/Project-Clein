'use client'

import { type VariantProps, cva } from 'class-variance-authority'
import { useState } from 'react'

import { cn } from '../../lib'

export const textInputVariants = cva(
  'relative flex w-full items-center justify-start rounded-lg border border-gray-200 font-normal text-gray-800 outline-none read-only:!border-gray-200 disabled:!border-gray-200 disabled:text-gray-500 dark:border-gray-600 dark:text-gray-50 dark:read-only:!border-gray-600 dark:disabled:!border-gray-600 dark:disabled:text-gray-400',
  {
    variants: {
      variant: {
        default: ' focus:border-blue-500 dark:focus:border-blue-400',
        warn: 'focus:border-red-500 dark:focus:border-red-400',
      },
      size: {
        xs: 'h-7 px-2 py-1 text-sm md:h-8',
        sm: 'h-8 px-2 py-1 text-sm md:h-9',
        md: 'h-9 px-3 py-1 text-base md:h-10',
        lg: 'h-10 px-4 py-2 text-base md:h-12',
      },
      withoutBackground: {
        true: 'bg-white dark:bg-gray-800 placeholder:dark:text-gray-400',
        false:
          'bg-gray-100 placeholder:text-gray-500 focus:bg-white dark:bg-gray-700 dark:focus:bg-gray-800',
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

export type TextInputProps = Omit<React.JSX.IntrinsicElements['input'], 'size'> &
  TextInputVariantProps

export const TextInput: React.FC<TextInputProps> = ({
  variant,
  size,
  withoutBackground,
  className,
  onCompositionStart,
  onCompositionEnd,
  onKeyDown,
  ...props
}) => {
  const [isComposing, setIsComposing] = useState(false)

  return (
    <input
      type="text"
      autoComplete="off"
      className={cn(textInputVariants({ variant, size, withoutBackground }), className)}
      onCompositionStart={(e) => {
        setIsComposing(true)
        onCompositionStart?.(e)
      }}
      onCompositionEnd={(e) => {
        setIsComposing(false)
        onCompositionEnd?.(e)
      }}
      onKeyDown={(e) => {
        if (!isComposing) onKeyDown?.(e)
      }}
      {...props}
    />
  )
}
