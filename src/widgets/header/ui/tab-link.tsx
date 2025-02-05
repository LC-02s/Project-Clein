'use client'

import { usePathname } from 'next/navigation'
import { LinkWithLoader } from '@/features/loader'
import type { Page as TabLinkProps } from '@/shared/config'
import { buttonVariants } from '@/shared/ui'
import { TabUnderline } from './tab-underline'

export const TabLink: React.FC<TabLinkProps> = ({ href, segment, title, icon: Icon }) => {
  const pathname = usePathname()
  const isActive = pathname.startsWith(segment)

  return (
    <li className="relative flex items-center justify-center pb-3 pt-1 xl:h-full xl:pt-3">
      <LinkWithLoader
        href={href}
        className={buttonVariants({ variant: 'subtle' })}
        title={`${title} 페이지 바로가기`}
        onClick={(e) => {
          e.currentTarget.scrollIntoView({
            block: 'nearest',
            inline: 'center',
            behavior: 'smooth',
          })
        }}
      >
        <Icon className="text-gray-500 dark:text-gray-400" />
        <span className="ml-2 pr-1">{title}</span>
      </LinkWithLoader>
      {isActive && <TabUnderline />}
    </li>
  )
}
