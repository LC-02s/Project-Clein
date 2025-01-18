'use client'

import Link from 'next/link'
import { cn, createScrollToSection } from '@/shared/lib'
import { ExternalLink } from '@/shared/ui'

interface LinkTextProps {
  href: string
  className?: string
}

export default function LinkText({
  href,
  className,
  children,
}: React.PropsWithChildren<LinkTextProps>) {
  const isExternal = href.startsWith('http')

  if (isExternal) {
    return (
      <ExternalLink
        href={href}
        title={typeof children === 'string' ? children : ''}
        className={cn(
          'font-medium text-indigo-600 hover:underline dark:text-indigo-300',
          className,
        )}
      >
        {children}
      </ExternalLink>
    )
  }

  return (
    <Link
      href={href}
      title={`페이지 이동${typeof children === 'string' ? `: ${children}` : ''}`}
      className={cn('font-medium text-indigo-600 hover:underline dark:text-indigo-300', className)}
      onClick={createScrollToSection(href)}
    >
      {children}
    </Link>
  )
}
