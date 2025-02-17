'use client'

import { AnimatePresence, motion, type Target } from 'motion/react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import {
  type PropsWithClassName,
  cn,
  useFocusLoop,
  useLockBodyScroll,
  useOutsideClick,
  useWindowEvent,
} from '../../lib'
import { Button } from './button'
import { Dimmed } from './dimmed'

const Title: React.FC<React.JSX.IntrinsicElements['h2']> = ({ className, children, ...props }) => (
  <h2
    className={cn(
      'mb-2 block w-full font-bold leading-tight text-gray-800 md:pt-1 md:text-lg dark:text-gray-50',
      className,
    )}
    {...props}
  >
    {children}
  </h2>
)

const Content: React.FC<React.JSX.IntrinsicElements['div']> = ({
  className,
  children,
  ...props
}) => (
  <div
    className={cn(
      'block max-h-[calc(100dvh-17.5rem)] min-h-12 w-full text-base font-normal leading-relaxed text-gray-500 dark:text-gray-400',
      className,
    )}
    {...props}
  >
    {children}
  </div>
)

const Footer: React.FC<React.JSX.IntrinsicElements['div']> = ({
  className,
  children,
  ...props
}) => (
  <div
    className={cn(
      'mt-6 flex w-full items-center justify-end space-x-2 border-t border-gray-200 pt-4 dark:border-gray-600',
      className,
    )}
    {...props}
  >
    {children}
  </div>
)

export interface DialogProps extends React.PropsWithChildren<PropsWithClassName> {
  open?: boolean
  onClose?: () => void
  withoutDimmed?: boolean
  cancelWithOutsideClick?: boolean
  cancelWithEscape?: boolean
  size?: keyof typeof dialogVariants.size
  position?: keyof typeof dialogVariants.position
}

const dialogVariants = {
  size: {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-3xl',
    xl: 'max-w-5xl',
  },
  position: {
    top: {
      initial: { x: '-50%', y: '-24%', scale: 0.9, opacity: 0.3 } satisfies Target,
      animate: { x: '-50%', y: '0%', scale: 1, opacity: 1 } satisfies Target,
    },
    center: {
      initial: { x: '-50%', y: '-42%', scale: 0.9, opacity: 0.3 } satisfies Target,
      animate: { x: '-50%', y: '-54%', scale: 1, opacity: 1 } satisfies Target,
    },
  },
}

const DialogRoot: React.FC<DialogProps> = ({
  open: isOpen = false,
  onClose,
  className,
  size = 'md',
  position = 'center',
  withoutDimmed,
  cancelWithOutsideClick = false,
  cancelWithEscape = false,
  children,
}) => {
  const containerRef = useOutsideClick<HTMLDivElement>(() => {
    if (isOpen && cancelWithOutsideClick) onClose?.()
  })

  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => onClose?.(), [pathname, searchParams, onClose])

  useFocusLoop({ ref: containerRef, deps: [isOpen] })

  useWindowEvent('keydown', (e) => {
    if (!isOpen || !cancelWithEscape) return
    if (e.key === 'Escape') onClose?.()
  })

  useLockBodyScroll(isOpen)

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <motion.div
            ref={containerRef}
            role="dialog"
            className={cn(
              'absolute left-1/2 max-h-[calc(100dvh-2rem)] w-[calc(100vw-1rem)] translate-x-1/2 rounded-xl bg-white p-4 shadow-md dark:bg-gray-800',
              position === 'center' ? 'top-1/2' : 'top-4',
              dialogVariants.size[size],
              className,
            )}
            initial={dialogVariants.position[position].initial}
            animate={dialogVariants.position[position].animate}
            exit={dialogVariants.position[position].initial}
            transition={{ ease: 'easeInOut', duration: 0.16 }}
          >
            {children}
          </motion.div>
          {!withoutDimmed && <Dimmed />}
        </div>
      )}
    </AnimatePresence>
  )
}

export const Dialog = Object.assign(DialogRoot, { Title, Content, Footer, Button })
