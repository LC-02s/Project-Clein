'use client'

import { useCallback, useEffect, useRef } from 'react'

export function useTimeout() {
  const timeoutId = useRef<number>(null)

  const clear = useCallback(() => {
    if (timeoutId.current) {
      window.clearTimeout(timeoutId.current)
      timeoutId.current = null
    }
  }, [])

  const start = useCallback((callback: () => void, delay?: number) => {
    if (timeoutId.current) {
      window.clearTimeout(timeoutId.current)
    }

    timeoutId.current = window.setTimeout(callback, delay)
  }, [])

  useEffect(() => clear, [clear])

  return { start, clear }
}
