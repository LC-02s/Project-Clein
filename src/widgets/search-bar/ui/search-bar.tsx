'use client'

import { useEffect, useRef, useState } from 'react'
import { useSearchPost } from '@/entities/post'
import { useSearchProject } from '@/entities/project'
import { cn, useDebounce, useFocusLoop, useOutsideClick } from '@/shared/lib'
import { Badge, Button, Icon, TextInput } from '@/shared/ui'
import { SearchResult } from './search-result'

export interface SearchBarProps {
  onClose: () => void
}

export const SearchBar: React.FC<SearchBarProps> = ({ onClose }) => {
  const [query, setQuery] = useState('')
  const debounced = useDebounce(query)
  const hasQuery = !!query

  const project = useSearchProject(debounced)
  const projectResultList = project.data?.contents

  const post = useSearchPost(debounced)
  const postResultList = post.data?.pages

  const inputRef = useRef<HTMLInputElement>(null)
  const resetClassName = 'search-keyword-reset'
  const containerRef = useOutsideClick<HTMLDivElement>((e) => {
    if (!(e.target as HTMLElement | null)?.classList.contains(resetClassName)) onClose()
  })

  useFocusLoop({ ref: containerRef, deps: [hasQuery, project, post] })

  useEffect(() => {
    const containerEl = containerRef.current
    const anchorEls = containerEl?.querySelectorAll('a')
    const inputEl = inputRef.current

    const handleKeyDown = (e: KeyboardEvent, idx: number) => {
      if (e.key === 'ArrowUp') (idx === 0 ? inputEl : anchorEls?.[idx - 1])?.focus()
      if (e.key === 'ArrowDown')
        (idx === anchorEls!.length - 1 ? inputEl : anchorEls?.[idx + 1])?.focus()
    }
    const handleHover = (e: MouseEvent) => {
      anchorEls?.forEach((anchorEl) => anchorEl.blur())
      ;(e.currentTarget as HTMLAnchorElement | null)?.focus()
    }

    anchorEls?.forEach((anchorEl, idx) => {
      anchorEl.addEventListener('keydown', (e) => handleKeyDown(e, idx))
      anchorEl.addEventListener('mouseenter', handleHover)
    })

    return () => {
      anchorEls?.forEach((anchorEl, idx) => {
        anchorEl.removeEventListener('keydown', (e) => handleKeyDown(e, idx))
        anchorEl.removeEventListener('mouseenter', handleHover)
      })
    }
  }, [containerRef, postResultList, projectResultList])

  return (
    <div ref={containerRef}>
      <h2 className="sr-only">통합 검색</h2>
      <div className="relative p-4 md:p-2">
        <Icon.MagnifierOutline className="absolute inset-y-0 left-7 z-10 my-auto text-gray-500 md:left-6 md:text-lg dark:text-gray-400" />
        <TextInput
          ref={inputRef}
          type="search"
          placeholder="검색어를 입력해주세요"
          className="px-10 md:h-12 md:pl-12 md:pr-24"
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') containerRef.current?.querySelector('a')?.focus()
            if (e.key === 'ArrowUp') {
              const containerEl = containerRef.current
              const anchorEls = containerEl?.querySelectorAll('a')

              anchorEls?.[anchorEls.length - 1]?.focus()
            }
          }}
          withoutBackground
        />
        {hasQuery && (
          <Button
            title="검색어 초기화"
            className={cn('absolute inset-y-0 right-5 z-10 my-auto md:right-16', resetClassName)}
            variant="subtle"
            size="sm"
            round="full"
            square
            onClick={() => setQuery('')}
          >
            <Icon.XOutline className="pointer-events-none" />
          </Button>
        )}
        <Badge
          size="xs"
          round="xs"
          className="absolute inset-y-0 right-5 my-auto hidden md:inline-flex"
        >
          Esc
        </Badge>
      </div>
      {hasQuery && (
        <SearchResult
          projects={projectResultList}
          posts={postResultList}
          isLoading={project.isLoading || post.isLoading || debounced !== query}
          isFetchingNextPage={post.isFetchingNextPage}
          hasNextPage={!post.isFetchingNextPage && post.hasNextPage}
          fetchNextPage={post.fetchNextPage}
          onClose={onClose}
        />
      )}
    </div>
  )
}
