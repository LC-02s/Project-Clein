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
    <li className="relative flex items-center justify-center pb-3 pt-1 xl:h-full xl:pt-3">
      <Link
        ref={linkRef}
        href={href}
        className={buttonVariants({ variant: 'subtle', size: 'sm' })}
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
        <span className="ml-2 pr-1 text-base">{title}</span>
      </Link>
      {isActive && <TabUnderline />}
    </li>
  )
}
