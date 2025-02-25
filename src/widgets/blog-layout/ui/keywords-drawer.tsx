'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect } from 'react'
import { useOutsideClick, useWindowEvent, useLockBodyScroll, useFocusLoop } from '@/shared/lib'
import { Button, Container, Dimmed, Icon } from '@/shared/ui'

export interface KeywordsDrawerProps extends React.PropsWithChildren {
  open: boolean
  onClose: () => void
}

export const KeywordsDrawer: React.FC<KeywordsDrawerProps> = ({
  open: isOpen,
  onClose,
  children,
}) => {
  const containerRef = useOutsideClick<HTMLDivElement>(() => {
    if (isOpen) onClose?.()
  })

  useWindowEvent('keydown', (e) => {
    if (!isOpen) return
    if (e.key === 'Escape') onClose()
  })

  useWindowEvent('popstate', () => {
    if (isOpen) onClose()
  })

  useLockBodyScroll(isOpen)

  useFocusLoop({ ref: containerRef, deps: [isOpen] })

  useEffect(() => {
    const containerEl = containerRef.current
    const anchorEls = containerEl?.querySelectorAll('a')

    if (isOpen) {
      anchorEls?.forEach((anchorEl) => {
        anchorEl.addEventListener('click', onClose)
      })
    }

    return () => {
      if (isOpen) onClose()

      anchorEls?.forEach((anchorEl) => {
        anchorEl.removeEventListener('click', onClose)
      })
    }
  }, [isOpen, containerRef, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-x-0 bottom-0 top-28 z-40">
          <Container
            ref={containerRef}
            layer="bottom"
            round={null}
            className="absolute inset-y-0 right-0 max-h-full w-full max-w-80 overflow-y-auto p-4 pb-8 xs:border-l"
            initial={{ x: '20rem' }}
            animate={{ x: 0 }}
            exit={{ x: '20rem' }}
            transition={{ ease: 'easeInOut', duration: 0.24 }}
            component={motion.div}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="px-1 font-bold">키워드 별 분류</h2>
              <Button
                title="메뉴 닫기"
                variant="subtle"
                size="sm"
                round="full"
                square
                onClick={onClose}
              >
                <Icon.XOutline />
              </Button>
            </div>
            {children}
          </Container>
          <Dimmed />
        </div>
      )}
    </AnimatePresence>
  )
}
