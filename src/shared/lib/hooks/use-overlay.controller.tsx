'use client'

import { useCallback, useImperativeHandle, useEffect } from 'react'
import type { OverlayControllerProps } from './use-overlay.model'
import useBooleanState from './use-boolean-state'

export default function OverlayController({
  overlayElement: OverlayElement,
  controlRef: ref,
  onExit,
  returnToFocus,
}: OverlayControllerProps) {
  const [isOpen, { setTrue: open, setFalse: close }] = useBooleanState()

  const closeWithFocus = useCallback(() => returnToFocus(close), [close, returnToFocus])

  useImperativeHandle(ref, () => ({ close: closeWithFocus }), [closeWithFocus])

  useEffect(() => {
    requestAnimationFrame(open)
  }, [open])

  return <OverlayElement isOpen={isOpen} close={closeWithFocus} exit={onExit} />
}
