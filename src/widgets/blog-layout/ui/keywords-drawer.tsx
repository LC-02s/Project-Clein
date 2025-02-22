import { useIsomorphicLayoutEffect, AnimatePresence, motion } from 'motion/react'
import { createPortal } from 'react-dom'
import { cn, useOutsideClick, useWindowEvent, useLockBodyScroll, useFocusLoop } from '@/shared/lib'
import { Button, containerVariants, Dimmed, Icon } from '@/shared/ui'
import { useRemoteOpenState } from '../lib'

export const KeywordsDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isOpen, closeWithEffect } = useRemoteOpenState()

  const containerRef = useOutsideClick<HTMLDivElement>(() => {
    if (isOpen) closeWithEffect()
  })

  useWindowEvent('keydown', (e) => {
    if (!isOpen) return
    if (e.key === 'Escape') closeWithEffect()
  })

  useWindowEvent('popstate', () => {
    if (isOpen) closeWithEffect()
  })

  useLockBodyScroll(isOpen)

  useFocusLoop({ ref: containerRef, deps: [isOpen] })

  useIsomorphicLayoutEffect(() => {
    const containerEl = containerRef.current
    const anchorEls = containerEl?.querySelectorAll('a')

    if (isOpen) {
      anchorEls?.forEach((anchorEl) => {
        anchorEl.addEventListener('click', closeWithEffect)
      })
    }

    return () => {
      if (isOpen) closeWithEffect()

      anchorEls?.forEach((anchorEl) => {
        anchorEl.removeEventListener('click', closeWithEffect)
      })
    }
  }, [isOpen, closeWithEffect])

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-x-0 bottom-0 top-28 z-40">
          <motion.div
            ref={containerRef}
            className={cn(
              containerVariants({ layer: 'bottom', round: 'none' }),
              'absolute inset-y-0 right-0 max-h-full w-full max-w-80 overflow-y-auto p-4 pb-8 xs:border-l',
            )}
            initial={{ x: '20rem' }}
            animate={{ x: 0 }}
            exit={{ x: '20rem' }}
            transition={{ ease: 'easeInOut', duration: 0.24 }}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="px-1 font-bold">키워드 별 분류</h2>
              <Button
                title="메뉴 닫기"
                variant="subtle"
                size="sm"
                round="full"
                square
                onClick={closeWithEffect}
              >
                <Icon.XOutline />
              </Button>
            </div>
            {children}
          </motion.div>
          <Dimmed />
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
