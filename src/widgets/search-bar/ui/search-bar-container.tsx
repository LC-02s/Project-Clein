'use client'

import { AnimatePresence, motion } from 'motion/react'

import { useLockBodyScroll, useWindowEvent } from '@/shared/lib'
import { Container, Dimmed } from '@/shared/ui'

export interface SearchBarContainerProps extends React.PropsWithChildren {
  open?: boolean
  onClose?: () => void
}

export const SearchBarContainer: React.FC<SearchBarContainerProps> = ({
  open: isOpen = false,
  onClose,
  children,
}) => {
  useWindowEvent('keydown', (e) => {
    if (isOpen && e.key === 'Escape') onClose?.()
  })

  useWindowEvent('popstate', () => {
    if (isOpen) onClose?.()
  })

  useLockBodyScroll(isOpen)

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <motion.div
            className="absolute inset-0 inline-flex flex-col items-center md:p-16"
            initial={{ y: '-8%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-8%', opacity: 0 }}
            transition={{ ease: 'easeInOut', duration: 0.24 }}
          >
            <Container round={null} className="w-full max-w-3xl shadow-md md:rounded-xl">
              {children}
            </Container>
          </motion.div>
          <Dimmed />
        </div>
      )}
    </AnimatePresence>
  )
}
