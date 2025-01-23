'use client'

import { useState, useRef, useEffect } from 'react'
import type { FocusableElement } from '../utils'
import type { CreateOverlayElement, OverlayControlRef } from './use-overlay.model'
import { OverlayController } from './use-overlay.controller'
import { useOverlayStore } from './use-overlay.model'

let elementId = 1

export function useOverlay<E extends FocusableElement>() {
  const mount = useOverlayStore((store) => store.mount)
  const unmount = useOverlayStore((store) => store.unmount)

  const [id] = useState(() => `overlay-${elementId++}`)
  const controlRef = useRef<OverlayControlRef>(null)
  const startedAt = useRef<E>(null)

  useEffect(() => () => unmount(id), [id, unmount])

  return {
    startedAt,
    open: (overlayElement: CreateOverlayElement) =>
      mount(
        id,
        <OverlayController
          key={Date.now()}
          controlRef={controlRef}
          overlayElement={overlayElement}
          onExit={() => unmount(id)}
          returnToFocus={(close) => {
            close?.()
            setTimeout(() => startedAt.current?.focus(), 0)
          }}
        />,
      ),
    close: () => controlRef.current?.close(),
    exit: () => unmount(id),
  }
}
