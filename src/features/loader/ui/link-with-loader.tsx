'use client'

import Link from 'next/link'
import { useLoaderSwitch } from '../lib'

export const LinkWithLoader: typeof Link = (({ href, onClick, children, ...props }) => {
  const { on } = useLoaderSwitch()

  return (
    <Link
      href={href}
      onClick={(e) => {
        if (href === `${window.location.pathname}${window.location.search}`) {
          return e.preventDefault()
        }

        on(() => e.preventDefault())
        onClick?.(e)
      }}
      {...props}
    >
      {children}
    </Link>
  )
}) as typeof Link
