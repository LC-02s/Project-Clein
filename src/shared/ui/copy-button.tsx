'use client'

import { useCallback, useState } from 'react'
import { useTimeout, copyToClipboard } from '../lib'

interface CopyButtonState {
  status: boolean
  copy: () => Promise<void>
}

interface CopyButtonProps {
  value: string | (() => string)
  children: (params: CopyButtonState) => React.ReactNode
  delay?: number
  onSuccess?: () => void
  onFailed?: () => void
}

export default function CopyButton({
  value,
  delay = 1200,
  children,
  onSuccess,
  onFailed,
}: CopyButtonProps) {
  const { start } = useTimeout()
  const [status, setStatus] = useState(false)

  const copy = useCallback(async () => {
    try {
      if (!(await copyToClipboard(typeof value === 'string' ? value : value()))) {
        throw new Error('failed to copy')
      }

      start(() => setStatus(false), delay)
      setStatus(true)
      onSuccess?.()
    } catch {
      onFailed?.()
    }
  }, [value, delay, start, onSuccess, onFailed])

  return children({ status, copy })
}
