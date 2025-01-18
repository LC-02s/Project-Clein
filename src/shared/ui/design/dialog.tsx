import { AnimatePresence, motion, useIsomorphicLayoutEffect, type Target } from 'motion/react'
import { useCallback } from 'react'
import { cn, startFocusLoop, useLockBodyScroll, useOutsideClick, useWindowEvent } from '../../lib'
import { Button } from './button'
import { Dimmed } from './dimmed'

function Title({ className, children, ...props }: React.JSX.IntrinsicElements['h2']) {
  return (
    <h2
      className={cn(
        'mb-3 block w-full pt-1 text-lg font-bold leading-tight text-zinc-800 dark:text-zinc-50',
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  )
}

function Content({ className, children, ...props }: React.JSX.IntrinsicElements['div']) {
  return (
    <div
      className={cn(
        'block max-h-[calc(100dvh-17.5rem)] min-h-12 w-full text-base font-normal leading-relaxed text-zinc-500 dark:text-zinc-400',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function Footer({ className, children, ...props }: React.JSX.IntrinsicElements['div']) {
  return (
    <div
      className={cn(
        'mt-6 flex w-full items-center justify-end space-x-2 border-t border-zinc-200 pt-4 dark:border-zinc-600',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export interface DialogProps {
  open?: boolean
  onClose?: () => void
  withoutDimmed?: boolean
  cancelWithOutsideClick?: boolean
  cancelWithEscape?: boolean
  className?: string
  size?: keyof typeof dialogVariants.size
  position?: keyof typeof dialogVariants.position
}

const dialogVariants = {
  size: {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-3xl',
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

function DialogRoot({
  open: isOpen = false,
  onClose,
  className,
  size = 'md',
  position = 'center',
  withoutDimmed,
  cancelWithOutsideClick = false,
  cancelWithEscape = false,
  children,
}: React.PropsWithChildren<DialogProps>) {
  const containerRef = useOutsideClick<HTMLDivElement>(() => {
    if (isOpen && cancelWithOutsideClick) onClose?.()
  })

  const keydownHandler = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen || !cancelWithEscape) return
      if (e.key === 'Escape') onClose?.()
    },
    [isOpen, cancelWithEscape, onClose],
  )

  useWindowEvent('keydown', keydownHandler)

  useLockBodyScroll(isOpen)

  useIsomorphicLayoutEffect(() => {
    if (isOpen) {
      startFocusLoop(containerRef.current)
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <motion.div
            ref={containerRef}
            className={cn(
              'absolute left-1/2 max-h-[calc(100dvh-2rem)] w-[calc(100vw-1rem)] translate-x-1/2 rounded-xl bg-white p-5 shadow-md dark:bg-zinc-800',
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
