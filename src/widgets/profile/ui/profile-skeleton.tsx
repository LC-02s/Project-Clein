'use client'

import { useEffect, useState } from 'react'
import { type PropsWithClassName, cn } from '@/shared/lib'
import { Container } from '@/shared/ui'

export const ProfileSkeleton: React.FC<PropsWithClassName> = ({ className }) => {
  const [isHydrated, setHydrated] = useState(false)

  useEffect(() => setHydrated(true), [])

  if (isHydrated) {
    return null
  }

  return (
    <Container
      className={cn('flex h-[28rem] flex-col items-center justify-between border p-5', className)}
    >
      <div className="flex w-full flex-col items-center">
        <div className="flex size-40 items-center justify-center rounded-full border border-zinc-200 bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-700" />
        <div className="mt-4 h-7 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="mt-6 h-5 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="mt-3 h-5 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="mt-3 h-5 w-2/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
      </div>
      <div className="mt-auto flex w-full flex-col items-center">
        <div className="mt-3 h-5 w-4/5 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="mt-3 h-5 w-2/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
      </div>
    </Container>
  )
}
