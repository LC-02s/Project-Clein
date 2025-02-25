'use client'

import { Button, LinkWithLoader } from '@/shared/ui'

export interface SortLinkProps extends React.PropsWithChildren {
  href: string
  title: string
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

export const SortLink: React.FC<SortLinkProps> = ({ href, title, disabled, onClick, children }) => {
  if (disabled) {
    return (
      <Button variant="subtle" className="w-full md:h-9" title={title} disabled>
        {children}
      </Button>
    )
  }

  return (
    <Button
      href={href}
      title={title}
      variant="subtle"
      className="w-full md:h-9"
      onClick={onClick}
      scroll={false}
      component={LinkWithLoader}
    >
      {children}
    </Button>
  )
}
