'use client'

import { AnimatePresence, motion } from 'motion/react'
import { Deferred, Icon } from '@/shared/ui'
import { useLoaderState } from '../lib'

export default function Loader() {
  const { isLoading } = useLoaderState()

  return (
    <AnimatePresence>
      {isLoading && (
        <Deferred>
          <motion.div
            className="pointer-events-none fixed inset-x-0 top-28 z-40 h-24 overflow-hidden xl:top-16"
            initial={{ y: '-5rem', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-5rem', opacity: 0 }}
            transition={{ ease: 'easeInOut', duration: 0.16 }}
          >
            <div
              className="bg-dimmed absolute mx-auto"
              style={{
                top: '-1.5rem',
                bottom: '0.75rem',
                left: '-2rem',
                right: '-2rem',
                borderRadius: '0 0 100% 100%',
              }}
            />
            <div className="absolute inset-x-0 bottom-0 mx-auto flex size-10 items-center justify-center rounded-full border border-zinc-200 bg-white dark:border-zinc-600 dark:bg-zinc-800">
              <Icon.RotateSpinner className="text-xl" />
            </div>
          </motion.div>
        </Deferred>
      )}
    </AnimatePresence>
  )
}
