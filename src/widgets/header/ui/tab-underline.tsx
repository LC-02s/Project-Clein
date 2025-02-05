'use client'

import { motion } from 'motion/react'

export const TabUnderline: React.FC = () => (
  <motion.div
    layoutId="header/tab-menu"
    className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-500 dark:bg-blue-300"
    transition={{ ease: 'easeOut', duration: 0.2 }}
    layout
  />
)
