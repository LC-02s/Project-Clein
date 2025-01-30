'use client'

import { useEffect, useRef } from 'react'
import { useBreakpoint } from '@/shared/lib'
import { Button, Icon } from '@/shared/ui'
import { useRemoteOpenState } from '../lib'

export interface KeywordsDrawerTriggerProps {
  active?: boolean
}

export const KeywordsDrawerTrigger: React.FC<KeywordsDrawerTriggerProps> = ({
  active: isActive,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const { isOpen, toggle, setEffect } = useRemoteOpenState()
  const matchesXL = useBreakpoint('xl')

  useEffect(() => {
    setEffect(matchesXL ? null : () => buttonRef.current?.focus())
  }, [setEffect, matchesXL])

  if (matchesXL) {
    return null
  }

  return (
    <Button
      ref={buttonRef}
      color={isActive ? 'info' : undefined}
      title={`키워드 별 분류 메뉴 ${isOpen ? '닫기' : '열기'}`}
      className="xl:hidden"
      onClick={toggle}
    >
      <Icon.TagOutline className="mr-2" />
      <span className="pr-1.5">분류</span>
    </Button>
  )
}
