'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRef } from 'react'
import type { Page as TabLinkProps } from '@/entities/page'
import { buttonVariants } from '@/shared/ui'
import TabUnderline from './tab-underline'

export default function TabLink({ href, segment, title, icon: Icon }: TabLinkProps) {
  const pathname = usePathname()
  const isActive = pathname.startsWith(segment)

  const linkRef = useRef<HTMLAnchorElement | null>(null)

  return (
    <li className="relative flex h-full items-center justify-center py-2">
      <Link
        ref={linkRef}
        href={href}
        className={buttonVariants({ variant: 'subtle' })}
        title={`${title} 페이지 바로가기`}
        onClick={(e) => {
          const linkEl = linkRef.current

          if (pathname === segment) {
            e.preventDefault()
          }

          linkEl?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
        }}
      >
        <Icon className="text-lg text-zinc-500 dark:text-zinc-400" />
        <span className="ml-2 pr-1">{title}</span>
      </Link>
      {isActive && <TabUnderline />}
    </li>
  )
}
