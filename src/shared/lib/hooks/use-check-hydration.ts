'use client'

import { useEffect, useState } from 'react'

export const useCheckHydration = () => {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => setIsHydrated(true), [])

  return isHydrated
}
