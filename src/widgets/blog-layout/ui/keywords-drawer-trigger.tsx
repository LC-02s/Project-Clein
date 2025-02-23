'use client'

import { useBreakpoint, useOverlay } from '@/shared/lib'
import { Button, Icon } from '@/shared/ui'
import { KeywordsDrawer } from './keywords-drawer'

export interface KeywordsDrawerTriggerProps {
  keywords: React.ReactNode
  active?: boolean
}

export const KeywordsDrawerTrigger: React.FC<KeywordsDrawerTriggerProps> = ({
  keywords,
  active: isActive,
}) => {
  const { startedAt, open } = useOverlay<HTMLButtonElement>()
  const matchesXL = useBreakpoint('xl')

  if (matchesXL) {
    return null
  }

  return (
    <Button
      ref={startedAt}
      color={isActive ? 'info' : undefined}
      title="키워드 별 분류 메뉴 대화창 열기"
      className="xl:hidden"
      onClick={() => {
        open(({ isOpen, close }) => (
          <KeywordsDrawer open={isOpen} onClose={close}>
            {keywords}
          </KeywordsDrawer>
        ))
      }}
    >
      <Icon.TagOutline className="mr-2" />
      <span className="pr-1.5">분류</span>
    </Button>
  )
}
