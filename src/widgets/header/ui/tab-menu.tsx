'use client'

import { SITE_MAP } from '@/entities/page'
import TabLink from './tab-link'

export default function TabMenu() {
  return (
    <nav className="scrollbar-hidden pointer-events-none flex max-w-full items-center justify-start overflow-x-auto md:pr-40 xl:absolute xl:inset-0 xl:inline-flex xl:justify-center">
      <ul className="pointer-events-auto flex h-full items-center justify-center px-3 sm:space-x-1 md:space-x-3 md:px-5">
        {SITE_MAP.map((page) => (
          <TabLink key={page.segment} {...page} />
        ))}
      </ul>
    </nav>
  )
}
