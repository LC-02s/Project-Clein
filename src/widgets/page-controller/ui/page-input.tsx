'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  type PaginationParamsKey,
  type PropsWithClassName,
  createSearchParamsToURL,
  cn,
  DEFAULT_PAGE,
  PAGINATION_PARAMS,
  useRouter,
} from '@/shared/lib'
import { TextInput } from '@/shared/ui'

export interface PageInputProps extends PropsWithClassName {
  value: number
  max: number
  baseURL: string
}

export const PageInput: React.FC<PageInputProps> = ({ value, max, baseURL, className }) => {
  const { push } = useRouter()

  const [page, setPage] = useState(value)
  const onSubmit = useCallback(() => {
    if (DEFAULT_PAGE <= page && page <= max) {
      push(createSearchParamsToURL<PaginationParamsKey>(baseURL)([PAGINATION_PARAMS.PAGE, page]))
    }
  }, [page, max, baseURL, push])

  useEffect(() => setPage(value), [value])

  return (
    <p
      className={cn(
        'flex items-center space-x-2 text-sm text-gray-500 xs:text-base dark:text-gray-400',
        className,
      )}
    >
      <span className="whitespace-nowrap text-sm md:text-base">페이지</span>
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
        className="w-20 md:text-base"
        withoutBackground
      />
      <span className="whitespace-nowrap text-sm md:text-base">/ {max}</span>
    </p>
  )
}
