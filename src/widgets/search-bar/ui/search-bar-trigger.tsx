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
      title={`통합 검색 대화창 ${isOpen ? '닫기' : '열기'}`}
      variant="light"
      className="group md:w-auto md:justify-between md:bg-gray-50 md:pl-2.5 md:pr-2 md:dark:bg-gray-800 md:dark:hover:bg-gray-700"
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
      <Icon.MagnifierOutline className="text-base md:text-gray-500 md:dark:text-gray-400" />
      <span className="ml-3 hidden whitespace-nowrap text-gray-500 md:block dark:text-gray-400">
        검색어를 입력해주세요
      </span>
      <Badge
        size="xs"
        round="xs"
        className="ml-16 hidden bg-white md:flex dark:group-hover:border-gray-500 dark:group-hover:bg-gray-600"
      >
        {`⌘${SEARCH_HOTKEY}`}
      </Badge>
    </Button>
  )
}
