import { cn } from '../../lib'

export const PageIconWrapper: React.FC<React.JSX.IntrinsicElements['div']> = ({
  className,
  children,
  ...props
}) => (
  <div
    className={cn(
      'mx-auto size-36 rounded-full border border-zinc-200 bg-zinc-50 p-8 sm:size-48 sm:p-12 dark:border-zinc-600 dark:bg-zinc-800',
      className,
    )}
    {...props}
  >
    {children}
  </div>
)
