import type Link from 'next/link'
import { LinkWithLoader } from '@/features/loader'

interface PageLinkProps extends React.ComponentProps<typeof Link> {
  disabled?: boolean
}

export default function PageLink({ href, disabled, children, ...props }: PageLinkProps) {
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
