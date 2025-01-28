'use client'

import { LinkWithLoader } from '@/features/loader'
import type { PostItem } from '@/entities/post'
import { BLOG_PATH } from '@/shared/config'
import { cn } from '@/shared/lib'
import { Button, buttonVariants, Icon } from '@/shared/ui'
import { type SearchBarProps } from './search-bar'

export interface SearchResultProps extends SearchBarProps {
  data: PostItem[] | undefined
  isLoading: boolean
  isFetchingNextPage: boolean
  hasNextPage: boolean
  fetchNextPage: () => void
}

export const SearchResult: React.FC<SearchResultProps> = ({
  data,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  onClose,
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <Icon.RotateSpinner className="size-7 text-zinc-500 dark:text-zinc-400" />
      </div>
    )
  }

  if (data && data.length <= 0) {
    return (
      <p className="break-keep p-6 pb-8 text-center font-medium text-zinc-500 dark:text-zinc-400">
        검색 결과가 없어요 ㅠ
      </p>
    )
  }

  return (
    <ul className="max-h-[48vh] space-y-2 overflow-y-auto p-2 pb-4 md:pb-2">
      {data?.map(({ id, title }) => (
        <li key={id}>
          <LinkWithLoader
            href={`${BLOG_PATH}/${id}`}
            title={`포스트 바로가기: ${title}`}
            className={cn(
              buttonVariants({ variant: 'subtle' }),
              'justify-start pl-10 text-left focus:bg-zinc-100 md:h-12 dark:focus:bg-zinc-700',
            )}
            onClick={onClose}
          >
            <Icon.PageEmoji className="absolute inset-y-0 left-3 my-auto text-lg" />
            <span className="block truncate">{title}</span>
          </LinkWithLoader>
        </li>
      ))}
      {hasNextPage && (
        <li className="flex items-center justify-center p-3">
          <Button color="info" className="pl-4 pr-5" onClick={fetchNextPage}>
            +&nbsp;&nbsp;검색 결과 더 보기
          </Button>
        </li>
      )}
      {isFetchingNextPage && (
        <li className="flex items-center justify-center p-4">
          <Icon.RotateSpinner className="size-6 text-zinc-500 dark:text-zinc-400" />
        </li>
      )}
    </ul>
  )
}
