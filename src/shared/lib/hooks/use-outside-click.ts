'use client'

import { useCallback, useRef } from 'react'
import useDocumentEvent from './use-document-event'

export default function useOutsideClick<E extends Element>(callback: (event: MouseEvent) => void) {
  const targetAreaRef = useRef<E | null>(null)

  const clickHandler = useCallback(
    (event: MouseEvent) => {
      if (targetAreaRef.current && !targetAreaRef.current.contains(event.target as Node | null)) {
        callback(event)
      }
    },
    [callback],
  )

  useDocumentEvent('click', clickHandler)

  return targetAreaRef
}
