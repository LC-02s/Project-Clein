'use client'

import Link from 'next/link'
import { type PropsWithClassName, cn, createScrollToSection } from '@/shared/lib'
import { ExternalLink } from '@/shared/ui'

export interface LinkTextProps extends React.PropsWithChildren<PropsWithClassName> {
  href: string
}

export const LinkText: React.FC<LinkTextProps> = ({ href, className, children }) => {
  const isExternal = href.startsWith('http')

  if (isExternal) {
    return (
      <ExternalLink
        href={href}
        title={typeof children === 'string' ? children : ''}
        className={cn('font-medium text-blue-700 hover:underline dark:text-blue-300', className)}
      >
        {children}
      </ExternalLink>
    )
  }

  return (
    <Link
      href={href}
      title={`${href.startsWith('#') ? '영역 이동' : '페이지 바로가기'}${typeof children === 'string' ? `: ${children}` : ''}`}
      className={cn('font-medium text-blue-700 hover:underline dark:text-blue-300', className)}
      onClick={createScrollToSection(href)}
    >
      {children}
    </Link>
  )
}
