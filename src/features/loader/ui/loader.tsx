'use client'

import { AnimatePresence, motion } from 'motion/react'
import { Button, Deferred, Icon } from '@/shared/ui'
import { useLoaderState } from '../lib'

export function Loader() {
  const { isLoading, off } = useLoaderState()

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
            <Button
              title="대기창 닫기"
              className="pointer-events-auto absolute inset-x-0 bottom-0 mx-auto"
              round="full"
              square
              onClick={off}
            >
              <Icon.RotateSpinner className="text-xl" />
              <span className="hidden-text">대기창 닫기</span>
            </Button>
          </motion.div>
        </Deferred>
      )}
    </AnimatePresence>
  )
}
