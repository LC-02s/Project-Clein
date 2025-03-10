'use client'

import { useCallback, useState } from 'react'

import { useTimeout, copyToClipboard } from '../lib'

export interface CopyButtonState {
  status: boolean
  copy: () => Promise<void>
}

export interface CopyButtonProps {
  value: string | (() => string)
  children: (params: CopyButtonState) => React.ReactNode
  delay?: number
  onSuccess?: () => void
  onFailed?: () => void
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  value,
  delay = 1200,
  children,
  onSuccess,
  onFailed,
}) => {
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

  return <>{children({ status, copy })}</>
}
