'use client'

import { type PropsWithClassName, cn, createScrollToSection } from '@/shared/lib'
import { ExternalLink, LinkWithLoader } from '@/shared/ui'

export interface LinkTextProps extends React.PropsWithChildren<PropsWithClassName> {
  href: string
  title?: string
}

export const LinkText: React.FC<LinkTextProps> = ({ href, title = '', className, children }) => {
  const classNames = cn('font-medium text-blue-700 hover:underline dark:text-blue-300', className)
  const content = typeof children === 'string' ? children : ''

  if (href.startsWith('http')) {
    return (
      <ExternalLink href={href} title={title || content} className={classNames}>
        {children}
      </ExternalLink>
    )
  }

  if (href.startsWith('#')) {
    return (
      <a
        href={href}
        title={`영역 이동${title ? `: ${title}` : content && `: ${content}`}`}
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
      title={`페이지 이동${title ? `: ${title}` : content && `: ${content}`}`}
      className={classNames}
    >
      {children}
    </LinkWithLoader>
  )
}
