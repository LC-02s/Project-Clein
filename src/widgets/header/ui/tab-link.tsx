'use client'

import { usePathname } from 'next/navigation'
import type { Page as TabLinkProps } from '@/shared/config'
import { Button, LinkWithLoader } from '@/shared/ui'
import { TabUnderline } from './tab-underline'

export const TabLink: React.FC<TabLinkProps> = ({ href, segment, title, icon: Icon }) => {
  const pathname = usePathname()
  const isActive = pathname.startsWith(segment)

  return (
    <li className="relative flex items-center justify-center pb-3 pt-1 xl:h-full xl:pt-3">
      <Button
        href={href}
        variant="subtle"
        title={`${title} 페이지 바로가기`}
        onClick={(e) => {
          e.currentTarget.scrollIntoView({
            block: 'nearest',
            inline: 'center',
            behavior: 'smooth',
          })
        }}
        component={LinkWithLoader}
      >
        <Icon className="text-gray-500 dark:text-gray-400" />
        <span className="ml-2 pr-1">{title}</span>
      </Button>
      {isActive && <TabUnderline />}
    </li>
  )
}
