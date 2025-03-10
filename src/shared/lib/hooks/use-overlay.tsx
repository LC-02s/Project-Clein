'use client'

import { useState, useRef, useEffect } from 'react'

import { type FocusableElement } from '../utils'

import { OverlayController } from './use-overlay.controller'
import {
  type CreateOverlayElement,
  type OverlayControlRef,
  useOverlayStore,
} from './use-overlay.model'

let elementId = 1

export const useOverlay = <E extends FocusableElement>() => {
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
