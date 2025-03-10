'use client'

import { useRef } from 'react'

import { type PropsWithClassName, cn } from '@/shared/lib'
import { Button, Container, CopyButton, Icon } from '@/shared/ui'

export interface CodeBlockProps extends React.PropsWithChildren<PropsWithClassName> {
  style?: React.CSSProperties
  'data-language'?: string
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ className, children, ...props }) => {
  const preRef = useRef<HTMLPreElement>(null)

  return (
    <Container layer="middle" round="sm" className="relative overflow-hidden border bg-white">
      <Container
        layer="middle"
        round={null}
        className="flex items-center justify-between border-b p-2"
      >
        <p className="flex items-center justify-start space-x-2 px-3">
          <span className="block size-3 rounded-full" style={{ backgroundColor: '#FE5F59' }} />
          <span className="block size-3 rounded-full" style={{ backgroundColor: '#FEBC2E' }} />
          <span className="block size-3 rounded-full" style={{ backgroundColor: '#28C840' }} />
        </p>
        <p className="flex items-center justify-center space-x-4">
          {!!props['data-language'] && (
            <span className="text-sm">{props['data-language'].toUpperCase()}</span>
          )}
          <CopyButton value={() => preRef.current?.textContent ?? ''}>
            {({ status, copy }) => (
              <Button
                title="코드 복사하기"
                variant="subtle"
                square
                onClick={copy}
                disabled={status}
              >
                {status ? (
                  <Icon.CheckOutline className="text-green-600 dark:text-green-300" />
                ) : (
                  <Icon.CopyOutline className="text-lg text-gray-600 md:text-xl dark:text-gray-300" />
                )}
              </Button>
            )}
          </CopyButton>
        </p>
      </Container>
      <pre
        ref={preRef}
        className={cn('relative max-w-full overflow-x-auto *:w-fit *:p-5 *:pb-7', className)}
        {...props}
      >
        {children}
      </pre>
    </Container>
  )
}
