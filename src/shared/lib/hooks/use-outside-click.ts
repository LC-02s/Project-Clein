'use client'

import { useRef } from 'react'

import { useDocumentEvent } from './use-document-event'

export const useOutsideClick = <E extends Element>(callback: (event: MouseEvent) => void) => {
  const targetAreaRef = useRef<E>(null)

  useDocumentEvent('click', (event) => {
    if (!targetAreaRef.current) return
    if (targetAreaRef.current.contains(event.target as Node | null)) return

    callback(event)
  })

  return targetAreaRef
}
