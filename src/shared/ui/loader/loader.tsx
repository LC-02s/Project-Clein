'use client'

import { AnimatePresence, motion } from 'motion/react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useLoaderState } from '../../lib'
import { Button, Deferred, Icon } from '../../ui'

export const Loader: React.FC = () => {
  const { isLoading, off } = useLoaderState()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(off, [pathname, searchParams, off])

  return (
    <AnimatePresence>
      {isLoading && (
        <Deferred>
          <motion.div
            className="fixed inset-x-0 top-28 z-40 h-24 overflow-hidden xl:top-16"
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
              className="absolute inset-x-0 bottom-0 mx-auto size-10"
              title="대기창 닫기"
              round="full"
              square
              onClick={off}
            >
              <Icon.RotateSpinner className="text-xl" />
            </Button>
          </motion.div>
        </Deferred>
      )}
    </AnimatePresence>
  )
}
