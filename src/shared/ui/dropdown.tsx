import { AnimatePresence, motion } from 'motion/react'
import { cn } from '../lib'

interface DropdownWrapperProps {
  open?: boolean
  ref?: React.Ref<HTMLDivElement>
  className?: string
}

export default function Dropdown({
  open: isOpen = false,
  ref,
  className,
  children,
}: React.PropsWithChildren<DropdownWrapperProps>) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={ref}
          className={cn(
            'absolute z-50 rounded-xl border border-zinc-200 bg-white p-2 shadow-md dark:border-zinc-700 dark:bg-zinc-900',
            className,
          )}
          initial={{ y: '-12%', scale: 0.9, opacity: 0 }}
          animate={{ y: '0%', scale: 1, opacity: 1 }}
          exit={{ y: '-12%', scale: 0.9, opacity: 0 }}
          transition={{ ease: 'easeInOut', duration: 0.2 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
