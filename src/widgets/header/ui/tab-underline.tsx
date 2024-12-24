'use client'

import { motion } from 'motion/react'

export default function TabUnderline() {
  return (
    <motion.div
      layoutId="header/tab-menu"
      className="absolute inset-x-0 bottom-0 h-0.5 bg-indigo-500 dark:bg-indigo-300"
      transition={{ type: 'spring', stiffness: 480, damping: 32 }}
      layout
    />
  )
}
