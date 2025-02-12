'use client'

import { type PropsWithClassName, cn, useCheckHydration } from '@/shared/lib'
import { Container } from '@/shared/ui'

export const ProfileSkeleton: React.FC<PropsWithClassName> = ({ className }) => {
  const isHydrated = useCheckHydration()

  if (isHydrated) {
    return null
  }

  return (
    <Container
      className={cn('flex h-[29rem] flex-col items-center justify-between border p-5', className)}
    >
      <div className="flex w-full flex-col items-center">
        <div className="flex size-40 items-center justify-center rounded-full border border-gray-200 bg-gray-100 dark:border-gray-600 dark:bg-gray-700" />
        <div className="mt-4 h-7 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="mt-6 h-5 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="mt-3 h-5 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="mt-3 h-5 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="mt-auto flex w-full flex-col items-center">
        <div className="mt-3 h-5 w-4/5 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="mt-3 h-5 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      </div>
    </Container>
  )
}
