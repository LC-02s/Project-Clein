import { motion } from 'motion/react'
import { cn } from '../lib'

type DimmedProps = React.ComponentProps<typeof motion.div>

export default function Dimmed({ className, ...props }: DimmedProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: 'easeInOut', duration: 0.16 }}
      className={cn(
        'absolute inset-0 -z-[1] m-0 border-none bg-black/30 p-0 dark:bg-slate-200/20',
        className,
      )}
      {...props}
    />
  )
}
