'use client'

import { useEffect, useState } from 'react'
import { useTimeout } from './use-timeout'

export function useDebounce<T>(value: T, delay = 500) {
  const { start } = useTimeout()
  const [debounced, setDebounced] = useState(value)

  useEffect(() => start(() => setDebounced(value), delay), [value, delay, start])

  return debounced
}
