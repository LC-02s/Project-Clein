'use client'

import { Fragment } from 'react/jsx-runtime'
import { useOverlayStore } from './use-overlay.model'

export default function OverlayProvider({ children }: React.PropsWithChildren) {
  const overlay = useOverlayStore((store) => store.overlay)

  return (
    <>
      {children}
      {[...overlay.entries()].map(([id, element]) => (
        <Fragment key={id}>{element}</Fragment>
      ))}
    </>
  )
}
