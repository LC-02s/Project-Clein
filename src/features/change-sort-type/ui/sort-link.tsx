import Link from 'next/link'
import { cn } from '@/shared/lib'
import { Button, buttonVariants } from '@/shared/ui'

export interface SortLinkProps {
  href: string
  title: string
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  render?: typeof Link
}

export function SortLink({
  href,
  title,
  disabled,
  onClick,
  children,
  render: Component = Link,
}: React.PropsWithChildren<SortLinkProps>) {
  if (disabled) {
    return (
      <Button variant="subtle" className="w-full lg:h-9" title={title} disabled>
        {children}
      </Button>
    )
  }

  return (
    <Component
      href={href}
      title={title}
      className={cn(buttonVariants({ variant: 'subtle' }), 'lg:h-9')}
      onClick={onClick}
    >
      {children}
    </Component>
  )
}
