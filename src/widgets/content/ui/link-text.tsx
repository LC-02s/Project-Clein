'use client'

import { type PropsWithClassName, cn, createScrollToSection } from '@/shared/lib'
import { ExternalLink, LinkWithLoader } from '@/shared/ui'

export interface LinkTextProps extends React.PropsWithChildren<PropsWithClassName> {
  href: string
}

export const LinkText: React.FC<LinkTextProps> = ({ href, className, children }) => {
  const isExternal = href.startsWith('http')
  const isHash = href.startsWith('#')
  const classNames = cn('font-medium text-blue-700 hover:underline dark:text-blue-300', className)

  if (isExternal) {
    return (
      <ExternalLink
        href={href}
        title={typeof children === 'string' ? children : ''}
        className={classNames}
      >
        {children}
      </ExternalLink>
    )
  }

  if (isHash) {
    return (
      <a
        href={href}
        title={`영역 이동${typeof children === 'string' ? `: ${children}` : ''}`}
        className={classNames}
        onClick={createScrollToSection(href)}
      >
        {children}
      </a>
    )
  }

  return (
    <LinkWithLoader
      href={href}
      title={`페이지 이동${typeof children === 'string' ? `: ${children}` : ''}`}
      className={classNames}
    >
      {children}
    </LinkWithLoader>
  )
}
