'use client'

import { useState, useEffect } from 'react'
import { useTimeout } from '../lib'

export const Deferred: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { start } = useTimeout()
  const [isDeferred, setIsDeferred] = useState(false)

  useEffect(() => {
    start(() => setIsDeferred(true), 200)

    return () => {
      setIsDeferred(false)
    }
  }, [start])

  if (!isDeferred) {
    return null
  }

  return <>{children}</>
}
