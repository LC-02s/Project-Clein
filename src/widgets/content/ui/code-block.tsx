'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/shared/lib'
import { Button, CopyButton, Icon } from '@/shared/ui'

interface CodeBlockProps {
  className?: string
  style: React.CSSProperties
}

export default function CodeBlock({
  className,
  children,
  style,
}: React.PropsWithChildren<CodeBlockProps>) {
  const [value, setValue] = useState('')
  const preRef = useRef<HTMLPreElement | null>(null)

  useEffect(() => {
    if (preRef.current) {
      setValue(preRef.current.textContent ?? '')
    }
  }, [])

  return (
    <div className="relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700">
      <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 p-2 dark:border-zinc-700 dark:bg-zinc-800">
        <p className="flex items-center justify-start space-x-2 px-3">
          <span className="block size-3 rounded-full" style={{ backgroundColor: '#FE5F59' }} />
          <span className="block size-3 rounded-full" style={{ backgroundColor: '#FEBC2E' }} />
          <span className="block size-3 rounded-full" style={{ backgroundColor: '#28C840' }} />
        </p>
        <CopyButton value={value}>
          {({ status, copy }) => (
            <Button variant="subtle" square title="코드 복사하기" onClick={copy} disabled={status}>
              {status ? (
                <Icon.CheckOutline className="text-emerald-600 dark:text-emerald-300" />
              ) : (
                <Icon.CopyOutline className="text-xl text-zinc-600 dark:text-zinc-300" />
              )}
              <span className="hidden-text">코드 복사하기</span>
            </Button>
          )}
        </CopyButton>
      </div>
      <pre
        ref={preRef}
        className={cn('relative max-w-full overflow-x-auto *:w-fit *:p-5 *:pb-7', className)}
        style={style}
      >
        {children}
      </pre>
    </div>
  )
}
