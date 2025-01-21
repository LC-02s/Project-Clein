'use client'

import { useEffect } from 'react'

export function useDocumentEvent<K extends keyof DocumentEventMap>(
  type: K,
  listener: (this: Document, e: DocumentEventMap[K]) => void,
  option?: boolean | AddEventListenerOptions,
) {
  useEffect(() => {
    document.addEventListener(type, listener, option)

    return () => {
      document.removeEventListener(type, listener, option)
    }
  }, [type, listener, option])
}
