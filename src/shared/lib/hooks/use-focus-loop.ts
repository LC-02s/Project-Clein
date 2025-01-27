/* eslint-disable react-compiler/react-compiler */
/* eslint-disable react-hooks/exhaustive-deps */

'use client'

import { useEffect, useRef } from 'react'
import { getFocusableElementAll } from '../utils'

export interface UseFocusLoopParams<E extends Element> {
  ref?: React.RefObject<E | null> | null
  deps?: React.DependencyList
  withoutFirstFocus?: boolean
}

export const useFocusLoop = <E extends Element>({
  ref,
  deps = [],
  withoutFirstFocus = false,
}: UseFocusLoopParams<E> = {}) => {
  const containerRef = useRef<E>(null)

  useEffect(() => {
    const containerEl = ref?.current ?? containerRef.current
    const focusableEls = getFocusableElementAll(containerEl)

    if (focusableEls && focusableEls.length > 0) {
      const firstFocusableEl = focusableEls[0]
      const lastFocusableEl = focusableEls[focusableEls.length - 1]

      const handleFirstKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Tab' && e.shiftKey) {
          e.preventDefault()
          lastFocusableEl?.focus()
        }
      }

      const handleLastKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Tab' && !e.shiftKey) {
          e.preventDefault()
          firstFocusableEl?.focus()
        }
      }

      if (!withoutFirstFocus) firstFocusableEl?.focus()

      firstFocusableEl?.addEventListener('keydown', handleFirstKeyDown as EventListener)
      lastFocusableEl?.addEventListener('keydown', handleLastKeyDown as EventListener)

      return () => {
        firstFocusableEl?.removeEventListener('keydown', handleFirstKeyDown as EventListener)
        lastFocusableEl?.removeEventListener('keydown', handleLastKeyDown as EventListener)
      }
    }

    return () => {}
  }, [ref, withoutFirstFocus, ...deps])

  return !ref ? containerRef : ref
}
