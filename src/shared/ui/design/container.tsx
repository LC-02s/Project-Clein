import { cva, type VariantProps } from 'class-variance-authority'

import { cn, createPolymorphicComponent } from '../../lib'

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
    },
  },
  compoundVariants: [
    {
      variant: 'default',
      layer: 'top',
      class: 'border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-800',
    },
    {
      variant: 'default',
      layer: 'middle',
      class: 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800',
    },
    {
      variant: 'default',
      layer: 'bottom',
      class: 'border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-900',
    },
    {
      variant: 'image',
      layer: 'top',
      class:
        'overflow-hidden border border-gray-200 bg-gray-200 dark:border-gray-600 dark:bg-gray-700',
    },
    {
      variant: 'image',
      layer: ['middle', 'bottom'],
      class:
        'overflow-hidden border border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800',
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

export const Container = createPolymorphicComponent<
  ContainerVariantsProps,
  React.JSX.IntrinsicElements['div']
>(({ variant, layer, round, className, children, component: Component = 'div', ...props }) => (
  <Component className={cn(containerVariants({ variant, layer, round }), className)} {...props}>
    {children}
  </Component>
))
