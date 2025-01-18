'use client'

import { useEffect } from 'react'

const lock = () => {
  document.body.style.setProperty('touch-action', 'none')
  document.body.style.setProperty('overflow', 'hidden')
}

const unlock = () => {
  document.body.style.setProperty('touch-action', '')
  document.body.style.setProperty('overflow', '')
}

export function useLockBodyScroll(isLocked = false) {
  useEffect(() => {
    if (isLocked) {
      lock()

      return unlock
    }

    unlock()

    return unlock
  }, [isLocked])
}
