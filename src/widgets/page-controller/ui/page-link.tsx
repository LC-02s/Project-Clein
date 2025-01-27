import type Link from 'next/link'
import { LinkWithLoader } from '@/features/loader'

export interface PageLinkProps extends React.ComponentProps<typeof Link> {
  disabled?: boolean
}

export const PageLink: React.FC<PageLinkProps> = ({ href, disabled, children, ...props }) => {
  if (disabled) {
    return (
      <button type="button" title={props.title} className={props.className} disabled>
        {children}
      </button>
    )
  }

  return (
    <LinkWithLoader href={href} {...props}>
      {children}
    </LinkWithLoader>
  )
}
