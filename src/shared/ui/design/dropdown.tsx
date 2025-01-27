import { AnimatePresence, motion } from 'motion/react'
import { type PropsWithClassName, cn } from '../../lib'
import { containerVariants } from './container'

export interface DropdownWrapperProps extends React.PropsWithChildren<PropsWithClassName> {
  open?: boolean
  ref?: React.Ref<HTMLDivElement>
}

export const Dropdown: React.FC<DropdownWrapperProps> = ({
  open: isOpen = false,
  ref,
  className,
  children,
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        ref={ref}
        className={cn(
          containerVariants({ layer: 'bottom', round: 'md' }),
          'absolute z-50 border p-2 shadow-md',
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
