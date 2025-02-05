import { cn } from '../../lib'

export const PageIconWrapper: React.FC<React.JSX.IntrinsicElements['div']> = ({
  className,
  children,
  ...props
}) => (
  <div
    className={cn(
      'mx-auto size-36 rounded-full border border-gray-200 bg-gray-50 p-8 md:size-48 md:p-12 dark:border-gray-600 dark:bg-gray-800',
      className,
    )}
    {...props}
  >
    {children}
  </div>
)
