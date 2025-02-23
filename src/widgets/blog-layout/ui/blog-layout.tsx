/* eslint-disable @next/next/no-img-element */

'use client'

import { NICKNAME } from '@/shared/config'
import { type PropsWithClassName, cn, useBreakpoint } from '@/shared/lib'

export interface BlogLayoutProps extends React.PropsWithChildren<PropsWithClassName> {
  profile: React.ReactNode
  profileFallback: React.FC<PropsWithClassName>
  keywords: React.ReactNode
}

export const BlogLayout: React.FC<BlogLayoutProps> = ({
  profile,
  profileFallback: ProfileFallback,
  keywords,
  className,
  children,
}) => {
  const matches2XL = useBreakpoint('2xl')
  const matchesXL = useBreakpoint('xl')

  if (!matchesXL) {
    return (
      <div className="space-y-12 px-3 py-12 xs:px-5 md:px-10">
        {children}
        {profile}
      </div>
    )
  }

  if (!matches2XL) {
    return (
      <div
        className={cn(
          'relative flex items-stretch justify-center px-3 py-12 xs:px-5 md:px-10',
          className,
        )}
      >
        <div className="mx-0 flex max-w-screen-xl flex-1 flex-col justify-between px-0 xl:pr-8 2xl:px-5 3xl:px-10">
          {children}
        </div>
        <div className="sticky top-28 hidden h-fit w-72 flex-col items-stretch space-y-6 xl:flex 2xl:space-y-0">
          {profile}
          <h2 className="sr-only">키워드 별 분류</h2>
          {keywords}
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'relative flex items-stretch justify-center px-3 py-12 xs:px-5 md:px-10',
        className,
      )}
    >
      <div className="sticky top-28 hidden h-fit w-72 flex-col space-y-4 pt-8 2xl:flex">
        {profile}
        <img
          src="https://mazassumnida.wtf/api/v2/generate_badge?boj=chanlee1007"
          alt={`${NICKNAME}'s Solved.ac State`}
          loading="lazy"
          style={{ aspectRatio: 2 }}
        />
      </div>
      <div className="mx-0 flex max-w-screen-xl flex-1 flex-col justify-between px-0 xl:pr-8 2xl:px-5 3xl:px-10">
        {children}
      </div>
      <div className="sticky top-28 hidden h-fit w-72 flex-col items-stretch space-y-6 xl:flex 2xl:space-y-0">
        <ProfileFallback className="hidden lg:flex 2xl:hidden" />
        <h2 className="sr-only">키워드 별 분류</h2>
        {keywords}
      </div>
    </div>
  )
}
