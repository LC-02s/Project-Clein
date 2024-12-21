'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import type { FocusableElement } from '../utils'
import type { CreateOverlayElement, OverlayControlRef } from './use-overlay.model'
import OverlayController from './use-overlay.controller'
import { useOverlayStore } from './use-overlay.model'

let elementId = 1

export default function useOverlay<E extends FocusableElement>() {
  const mount = useOverlayStore((store) => store.mount)
  const unmount = useOverlayStore((store) => store.unmount)
  const [id] = useState(() => `overlay-${elementId++}`)
  const controlRef = useRef<OverlayControlRef | null>(null)
  const startedAt = useRef<E | null>(null)

  useEffect(() => () => unmount(id), [id, unmount])

  return useMemo(
    () => ({
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
              startedAt.current?.focus()
              close?.()
            }}
          />,
        ),
      close: () => {
        controlRef.current?.close()
      },
      exit: () => unmount(id),
    }),
    [id, mount, unmount],
  )
}
