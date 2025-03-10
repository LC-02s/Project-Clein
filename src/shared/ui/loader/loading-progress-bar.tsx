'use client'

import { AnimatePresence, motion } from 'motion/react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import { useLoaderState, useTimeout } from '../../lib'
import { Deferred } from '../../ui'

export const FakeProgressBar: React.FC = () => {
  const [step, setStep] = useState(0)
  const { start } = useTimeout()

  const increaseStepWithLoop = useCallback(
    (idx: number) => {
      start(() => {
        setStep(idx)
        increaseStepWithLoop(idx + 1)
      }, 200 * idx)
    },
    [start],
  )

  useEffect(() => increaseStepWithLoop(1), [increaseStepWithLoop])

  return (
    <motion.div
      className="absolute inset-y-0 left-0"
      style={{ backgroundColor: '#9775fa' }}
      initial={{ width: '0%', opacity: 0 }}
      animate={{ width: `${Math.min(16 + 0.8 * step, 92)}%`, opacity: 1 }}
      exit={{ width: '100%', opacity: 0 }}
      transition={{ ease: 'easeInOut', duration: 0.32 }}
    />
  )
}

export const LoadingProgressBar: React.FC = () => {
  const { isLoading, off } = useLoaderState()
  const { start } = useTimeout()

  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => start(off, 100), [pathname, searchParams, off, start])

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-50 overflow-hidden"
      style={{ height: 3 }}
    >
      <AnimatePresence>
        {isLoading && (
          <Deferred>
            <FakeProgressBar />
          </Deferred>
        )}
      </AnimatePresence>
    </div>
  )
}
