'use client'

import { useEffect } from 'react'
import { useLoaderSwitch } from '../lib'

export function LoadComplete({ children }: React.PropsWithChildren) {
  const { off } = useLoaderSwitch()

  useEffect(off)

  return <>{children}</>
}
