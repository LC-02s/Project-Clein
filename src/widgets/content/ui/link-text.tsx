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

  return (
    <Link
      href={href}
      title={
        typeof children === 'string'
          ? `${isExternal ? '새창' : '페이지 '}이동: ${children}`
          : undefined
      }
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={cn('font-medium text-indigo-600 hover:underline dark:text-indigo-400', className)}
      onClick={createScrollToSection(href)}
    >
      {children}
    </Link>
  )
}
