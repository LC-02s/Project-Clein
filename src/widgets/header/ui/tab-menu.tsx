'use client'

import { SITE_MAP } from '@/entities/site'
import TabLink from './tab-link'

export default function TabMenu() {
  return (
    <nav className="scrollbar-hidden absolute inset-x-0 bottom-0 inline-flex max-w-full items-center justify-start overflow-x-auto xl:pointer-events-none xl:top-0 xl:pl-56">
      <ul className="pointer-events-auto flex h-full items-center justify-start px-3 sm:space-x-1 md:space-x-3 md:px-6">
        {SITE_MAP.map((page) => (
          <TabLink key={page.segment} {...page} />
        ))}
      </ul>
    </nav>
  )
}
