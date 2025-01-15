'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useLoaderSwitch } from '@/features/loader'
import {
  type PaginationParamsKey,
  createSearchParamsToURL,
  cn,
  DEFAULT_PAGE,
  PAGINATION_PARAMS,
} from '@/shared/lib'
import { TextInput } from '@/shared/ui'

export interface PageInputProps {
  value: number
  max: number
  baseURL: string
  className?: string
}

export function PageInput({ value, max, baseURL, className }: PageInputProps) {
  const { push } = useRouter()
  const { on } = useLoaderSwitch()

  const [page, setPage] = useState(value)
  const onSubmit = useCallback(() => {
    if (DEFAULT_PAGE <= page && page <= max) {
      on()
      push(createSearchParamsToURL<PaginationParamsKey>(baseURL)([PAGINATION_PARAMS.PAGE, page]))
    }
  }, [page, max, baseURL, push, on])

  useEffect(() => setPage(value), [value])

  return (
    <p
      className={cn(
        'flex items-center space-x-2 text-sm text-zinc-500 xs:text-base dark:text-zinc-400',
        className,
      )}
    >
      <span className="whitespace-nowrap">페이지</span>
      <TextInput
        type="number"
        size="sm"
        value={page}
        onChange={(e) => {
          const num = +e.currentTarget.value

          if (Number.isSafeInteger(num) && 0 <= num) {
            setPage(num)
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSubmit()
        }}
        className="w-20 xs:text-base"
        withoutBackground
      />
      <span className="whitespace-nowrap">/ {max}</span>
    </p>
  )
}
