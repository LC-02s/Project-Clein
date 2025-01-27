'use client'

import { useIsomorphicLayoutEffect } from 'motion/react'
import { useState } from 'react'
import { useOverlay, useWindowEvent } from '@/shared/lib'
import { Badge, Button, Icon } from '@/shared/ui'
import { SEARCH_HOTKEY } from '../config'
import { SearchBar } from './search-bar'
import { SearchBarContainer } from './search-bar-container'

export const SearchBarTrigger: React.FC = () => {
  const { startedAt, open } = useOverlay<HTMLButtonElement>()
  const [isOpen, setOpen] = useState(false)
  const withClose = (onClose: () => void) => () => {
    onClose()
    setOpen(false)
  }

  const [isMacOS, setMacOS] = useState(true)

  useIsomorphicLayoutEffect(() => {
    setMacOS(window.navigator.userAgent.toLowerCase().includes('mac'))
  }, [])

  useWindowEvent('keydown', (e) => {
    if (!isOpen && (isMacOS ? e.metaKey : e.altKey) && e.key === SEARCH_HOTKEY.toLowerCase()) {
      e.preventDefault()
      e.stopPropagation()
      startedAt.current?.click()
    }
  })

  return (
    <Button
      ref={startedAt}
      title="통합 검색"
      variant="light"
      className="group md:w-auto md:justify-between md:bg-zinc-50 md:pl-2.5 md:pr-2 md:dark:bg-zinc-800 md:dark:hover:bg-zinc-700"
      square
      onClick={() => {
        open(({ isOpen, close }) => (
          <SearchBarContainer open={isOpen} onClose={withClose(close)}>
            <SearchBar onClose={withClose(close)} />
          </SearchBarContainer>
        ))
        setOpen(true)
      }}
      disabled={isOpen}
    >
      <Icon.MagnifierOutline className="text-lg md:text-base md:text-zinc-500 md:dark:text-zinc-400" />
      <span className="ml-3 hidden whitespace-nowrap text-zinc-500 md:block dark:text-zinc-400">
        검색어를 입력해주세요
      </span>
      <Badge
        size="xs"
        round="xs"
        className="ml-16 hidden bg-white md:flex dark:group-hover:border-zinc-500 dark:group-hover:bg-zinc-600"
      >
        {`⌘${SEARCH_HOTKEY}`}
      </Badge>
    </Button>
  )
}
