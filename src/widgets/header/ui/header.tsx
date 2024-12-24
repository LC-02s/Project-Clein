'use client'

import { MainLogo } from '@/entities/page'
import { useBreakpoint } from '@/shared/lib'
import TabMenu from './tab-menu'

export default function Header({ children }: React.PropsWithChildren) {
  const xl = useBreakpoint('xl', true)

  return (
    <header className="w-full pt-28 xl:pt-16">
      <div className="fixed inset-x-0 top-0 z-50 flex h-28 w-full flex-col items-start justify-end border-b border-zinc-200 bg-white xl:h-auto dark:border-zinc-700 dark:bg-zinc-800">
        <div className="mx-auto flex w-full items-center justify-between px-4 py-1 xl:h-16 xl:py-0">
          <h1 className="pl-3 md:pl-6">
            <MainLogo className="whitespace-nowrap text-lg xs:text-xl" />
          </h1>
          {!xl && <TabMenu />}
          <div className="flex items-center justify-end space-x-2 md:space-x-3">{children}</div>
        </div>
        {xl && <TabMenu />}
      </div>
    </header>
  )
}