'use client'

import { useEffect } from 'react'

export const useWindowEvent = <K extends keyof WindowEventMap>(
  type: K,
  listener: (this: Window, e: WindowEventMap[K]) => void,
  option?: boolean | AddEventListenerOptions,
) => {
  useEffect(() => {
    window.addEventListener(type, listener, option)

    return () => {
      window.removeEventListener(type, listener, option)
    }
  }, [type, listener, option])
}
