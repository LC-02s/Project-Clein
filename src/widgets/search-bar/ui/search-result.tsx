'use client'

import { LinkWithLoader } from '@/features/loader'
import type { SearchPostItem } from '@/entities/post'
import type { SearchProjectItem } from '@/entities/project'
import { BLOG_PATH, PROJECT_PATH } from '@/shared/config'
import { cn } from '@/shared/lib'
import { Button, buttonVariants, FallbackRender, Icon } from '@/shared/ui'
import { type SearchBarProps } from './search-bar'

export interface SearchResultProps extends SearchBarProps {
  projects: SearchProjectItem[] | undefined
  posts: SearchPostItem[] | undefined
  isLoading: boolean
  isFetchingNextPage: boolean
  hasNextPage: boolean
  fetchNextPage: () => void
}

export const SearchResult: React.FC<SearchResultProps> = ({
  projects,
  posts,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  onClose,
}) => {
  const isEmptyProjects = !projects || projects.length <= 0
  const isEmptyPosts = !posts || posts.length <= 0

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <Icon.RotateSpinner className="size-7 text-gray-500 dark:text-gray-400" />
      </div>
    )
  }

  if (isEmptyProjects && isEmptyPosts) {
    return (
      <p className="break-keep p-6 pb-8 text-center font-medium text-gray-500 dark:text-gray-400">
        검색 결과가 없어요 ㅠ
      </p>
    )
  }

  return (
    <div className="max-h-[48vh] space-y-2 overflow-y-auto p-2 pb-5 pl-3">
      <FallbackRender render={isEmptyProjects}>
        <h3 className="flex items-center px-2 pt-2 text-sm md:text-base">
          <Icon.RocketEmoji className="mr-3" />
          관련 프로젝트
        </h3>
        <ul className="ml-4 space-y-1 border-l border-gray-200 px-2 pt-2 dark:border-gray-600">
          {projects?.map(({ id, name }) => (
            <li key={id}>
              <LinkWithLoader
                href={`${PROJECT_PATH}/${id}`}
                title={`프로젝트 소개 바로가기: ${name}`}
                className={cn(
                  buttonVariants({ variant: 'subtle' }),
                  'justify-start pl-10 text-left focus:bg-gray-100 md:h-12 dark:focus:bg-gray-700',
                )}
                onClick={onClose}
              >
                <Icon.CodeOutline className="absolute inset-y-0 left-3 my-auto text-lg text-gray-500 dark:text-gray-400" />
                <span className="block truncate">{name}</span>
              </LinkWithLoader>
            </li>
          ))}
        </ul>
      </FallbackRender>
      <FallbackRender render={isEmptyPosts}>
        <h3 className="flex items-center px-2 pt-2 text-sm md:text-base">
          <Icon.PageEmoji className="mr-3" />
          관련 포스트
        </h3>
        <ul className="ml-4 space-y-1 border-l border-gray-200 px-2 pt-2 dark:border-gray-600">
          {posts?.map(({ id, title }) => (
            <li key={id}>
              <LinkWithLoader
                href={`${BLOG_PATH}/${id}`}
                title={`포스트 바로가기: ${title}`}
                className={cn(
                  buttonVariants({ variant: 'subtle' }),
                  'justify-start pl-10 text-left focus:bg-gray-100 md:h-12 dark:focus:bg-gray-700',
                )}
                onClick={onClose}
              >
                <Icon.DocumentTitleOutline className="absolute inset-y-0 left-3 my-auto text-lg text-gray-500 dark:text-gray-400" />
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
              <Icon.RotateSpinner className="size-6 text-gray-500 dark:text-gray-400" />
            </li>
          )}
        </ul>
      </FallbackRender>
    </div>
  )
}
