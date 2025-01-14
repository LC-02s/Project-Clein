'use client'

import Link from 'next/link'
import { cn, createScrollToSection } from '@/shared/lib'

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
  const title = typeof children === 'string' ? `: ${children}` : ''

  if (isExternal) {
    return (
      <a
        href={href}
        title={`새창 이동${title}`}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'font-medium text-indigo-600 hover:underline dark:text-indigo-300',
          className,
        )}
      >
        {children}
      </a>
    )
  }

  return (
    <Link
      href={href}
      title={`페이지 이동${title}`}
      className={cn('font-medium text-indigo-600 hover:underline dark:text-indigo-300', className)}
      onClick={createScrollToSection(href)}
    >
      {children}
    </Link>
  )
}
