import { cn } from '@/shared/lib'

export default function PageIconWrapper({
  className,
  children,
  ...props
}: React.JSX.IntrinsicElements['div']) {
  return (
    <div
      className={cn(
        'mx-auto size-36 rounded-full border border-zinc-200 bg-zinc-100 p-8 sm:size-48 sm:p-12 dark:border-zinc-600 dark:bg-zinc-800',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
