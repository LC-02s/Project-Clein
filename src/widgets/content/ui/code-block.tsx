'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/shared/lib'
import { Button, Container, CopyButton, Icon } from '@/shared/ui'

export interface CodeBlockProps {
  className?: string
  style: React.CSSProperties
}

export function CodeBlock({ className, children, style }: React.PropsWithChildren<CodeBlockProps>) {
  const [value, setValue] = useState('')
  const preRef = useRef<HTMLPreElement | null>(null)

  useEffect(() => {
    if (preRef.current) {
      setValue(preRef.current.textContent ?? '')
    }
  }, [])

  return (
    <Container layer="middle" round="md" className="relative overflow-hidden border">
      <Container
        layer="middle"
        round="none"
        className="flex items-center justify-between border-b p-2"
      >
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
      </Container>
      <pre
        ref={preRef}
        className={cn('relative max-w-full overflow-x-auto *:w-fit *:p-5 *:pb-7', className)}
        style={style}
      >
        {children}
      </pre>
    </Container>
  )
}
