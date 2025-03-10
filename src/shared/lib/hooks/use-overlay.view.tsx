'use client'

import { Fragment } from 'react/jsx-runtime'

import { useOverlayStore } from './use-overlay.model'

export const OverlayViewer: React.FC = () => {
  const overlay = useOverlayStore((store) => store.overlay)

  return [...overlay].map(([id, element]) => <Fragment key={id}>{element}</Fragment>)
}
