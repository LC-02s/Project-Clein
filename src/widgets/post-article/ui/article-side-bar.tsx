'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useRef } from 'react'
import {
  cn,
  useFocusLoop,
  useBooleanState,
  useBreakpoint,
  useLockBodyScroll,
  useOutsideClick,
  useWindowEvent,
} from '@/shared/lib'
import { Button, buttonVariants, containerVariants, Dimmed, Icon } from '@/shared/ui'
import { ARTICLE_ASIDE_CLOSE_CLASS_NAME } from '../config'

export const ArticleSideBar: React.FC<React.PropsWithChildren> = ({ children }) => {
  const matchesXL = useBreakpoint('xl')
  const [isOpen, { setFalse: close, toggle }] = useBooleanState()

  const buttonRef = useRef<HTMLButtonElement>(null)
  const closeWithFocus = useCallback(() => {
    close()
    setTimeout(() => buttonRef.current?.focus(), 0)
  }, [close])

  const containerRef = useOutsideClick<HTMLElement>(() => {
    if (isOpen) closeWithFocus()
  })

  useEffect(() => {
    if (matchesXL && isOpen) close()
  }, [isOpen, matchesXL, close])

  useWindowEvent('keydown', (e) => {
    if (!isOpen) return
    if (e.key === 'Escape') closeWithFocus()
  })

  useLockBodyScroll(isOpen)

  useFocusLoop({
    ref: matchesXL ? null : containerRef,
    deps: [isOpen],
    withoutFirstFocus: matchesXL || !isOpen,
  })

  useEffect(() => {
    const containerEl = containerRef.current
    const selector = `.${ARTICLE_ASIDE_CLOSE_CLASS_NAME}`
    const buttonEls = containerEl?.querySelectorAll<HTMLButtonElement>(selector)

    const handleClickWithBubbling = (e: MouseEvent) => {
      if (!(e.target as HTMLElement)?.classList?.contains(ARTICLE_ASIDE_CLOSE_CLASS_NAME)) return

      closeWithFocus()
    }

    if (isOpen) {
      containerEl?.addEventListener('click', handleClickWithBubbling)
      buttonEls?.forEach((buttonEl) => {
        buttonEl.addEventListener('click', closeWithFocus)
      })
    }

    return () => {
      if (isOpen) closeWithFocus()

      containerEl?.removeEventListener('click', handleClickWithBubbling)
      buttonEls?.forEach((buttonEl) => {
        buttonEl.removeEventListener('click', closeWithFocus)
      })
    }
  }, [isOpen, containerRef, closeWithFocus])

  return (
    <>
      {!matchesXL && (
        <motion.button
          ref={buttonRef}
          title={`상세 정보 메뉴 ${isOpen ? '닫기' : '열기'}`}
          className={cn(buttonVariants({ square: true }), 'fixed right-4 top-32 z-30')}
          onClick={toggle}
          initial={{ x: '2rem', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ ease: 'easeInOut', duration: 0.16, delay: 0.2 }}
        >
          <Icon.MenuOutline className="text-lg md:text-xl" />
        </motion.button>
      )}
      <AnimatePresence>
        {(matchesXL || isOpen) && (
          <motion.nav
            key="article-info"
            ref={containerRef}
            className={cn(
              containerVariants({ layer: 'bottom', round: 'none' }),
              'fixed bottom-0 right-0 top-28 z-30 flex h-[calc(100vh-7rem)] w-full max-w-80 flex-col space-y-2 border-none p-4 xs:border-l xl:sticky xl:top-16 xl:inline-flex xl:h-[calc(100vh-4rem)] xl:w-72 xl:border-none xl:p-2',
            )}
            initial={{ x: '20rem' }}
            animate={{ x: 0 }}
            exit={{ x: '20rem' }}
            transition={{ ease: 'easeInOut', duration: 0.24 }}
          >
            {!matchesXL && (
              <div className="flex items-center justify-between">
                <h3 className="px-1 pt-1 font-bold">상세 정보</h3>
                <Button
                  title="메뉴 닫기"
                  variant="subtle"
                  round="full"
                  square
                  onClick={closeWithFocus}
                >
                  <Icon.XOutline />
                </Button>
              </div>
            )}
            {children}
          </motion.nav>
        )}
        {!matchesXL && isOpen && <Dimmed className="fixed bottom-0 right-0 top-28 z-20" />}
      </AnimatePresence>
    </>
  )
}
