'use client'

import { useCallback, useImperativeHandle, useEffect } from 'react'

import { useBooleanState } from './use-boolean-state'
import { type OverlayControllerProps } from './use-overlay.model'

export const OverlayController: React.FC<OverlayControllerProps> = ({
  overlayElement: OverlayElement,
  controlRef: ref,
  onExit,
  returnToFocus,
}) => {
  const [isOpen, { setTrue: open, setFalse: close }] = useBooleanState()

  const closeWithFocus = useCallback(() => returnToFocus(close), [close, returnToFocus])

  useImperativeHandle(ref, () => ({ close: closeWithFocus }), [closeWithFocus])

  useEffect(() => {
    requestAnimationFrame(open)
  }, [open])

  return <OverlayElement isOpen={isOpen} close={closeWithFocus} exit={onExit} />
}
