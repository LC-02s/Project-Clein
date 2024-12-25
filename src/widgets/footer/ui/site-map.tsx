'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SITE_MAP } from '@/entities/site'

export default function SiteMap() {
  const pathname = usePathname()

  return (
    <ul className="flex flex-wrap items-center justify-center md:space-x-1">
      {SITE_MAP.map(({ href, segment, title }) => (
        <li key={segment} className="p-0.5">
          <Link
            href={href}
            title={`${title} 페이지 바로가기`}
            className="p-1 text-zinc-500 hover:text-indigo-600 hover:underline active:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-300 dark:active:text-indigo-300"
            onClick={(e) => {
              if (pathname === segment) e.preventDefault()
            }}
          >
            {title}
          </Link>
        </li>
      ))}
    </ul>
  )
}
