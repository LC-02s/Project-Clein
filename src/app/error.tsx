'use client'

import { LoadComplete } from '@/features/loader'
import { ErrorFallback } from '@/entities/site'
import type { CommonErrorProps } from '@/shared/api'

export default function CommonError(props: CommonErrorProps) {
  return (
    <section id="content" className="flex-1">
      <LoadComplete>
        <ErrorFallback {...props} />
      </LoadComplete>
    </section>
  )
}
