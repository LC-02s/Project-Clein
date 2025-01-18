'use client'

import { motion } from 'motion/react'

export function TabUnderline() {
  return (
    <motion.div
      layoutId="header/tab-menu"
      className="absolute inset-x-0 bottom-0 h-0.5 bg-indigo-500 dark:bg-indigo-300"
      transition={{ ease: 'easeOut', duration: 0.2 }}
      layout
    />
  )
}
