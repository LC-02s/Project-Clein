'use client'

import { useRef } from 'react'
import { type PropsWithClassName, cn } from '@/shared/lib'
import { Button, Container, CopyButton, Icon } from '@/shared/ui'

export interface CodeBlockProps extends React.PropsWithChildren<PropsWithClassName> {
  style: React.CSSProperties
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ className, children, style }) => {
  const preRef = useRef<HTMLPreElement>(null)

  return (
    <Container layer="middle" round="sm" className="relative overflow-hidden border bg-white">
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
        <CopyButton value={() => preRef.current?.textContent ?? ''}>
          {({ status, copy }) => (
            <Button title="코드 복사하기" variant="subtle" square onClick={copy} disabled={status}>
              {status ? (
                <Icon.CheckOutline className="text-emerald-600 dark:text-emerald-300" />
              ) : (
                <Icon.CopyOutline className="text-xl text-zinc-600 dark:text-zinc-300" />
              )}
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
