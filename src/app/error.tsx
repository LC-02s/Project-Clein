'use client'

import { LoadComplete } from '@/features/loader'
import type { CommonErrorProps } from '@/shared/api'
import { ErrorFallback } from '@/shared/ui'

export default function CommonError(props: CommonErrorProps) {
  return (
    <section id="content" className="flex-1">
      <LoadComplete>
        <ErrorFallback {...props} />
      </LoadComplete>
    </section>
  )
}
