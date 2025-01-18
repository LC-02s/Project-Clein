'use client'

import { useState, useEffect } from 'react'
import { useTimeout } from '../lib'

export function Deferred({ children }: React.PropsWithChildren) {
  const { start } = useTimeout()
  const [isDeferred, setIsDeferred] = useState(false)

  useEffect(() => {
    start(() => setIsDeferred(true), 200)
  }, [start])

  if (!isDeferred) {
    return null
  }

  return <>{children}</>
}
