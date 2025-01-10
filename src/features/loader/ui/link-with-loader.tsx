'use client'

import Link from 'next/link'
import { useLoaderSwitch } from '../lib'

const LinkWithLoader = (({ href, onClick, children, ...props }) => {
  const { on } = useLoaderSwitch()

  return (
    <Link
      href={href}
      onClick={(e) => {
        on(() => e.preventDefault())
        onClick?.(e)
      }}
      {...props}
    >
      {children}
    </Link>
  )
}) as typeof Link

export default LinkWithLoader
