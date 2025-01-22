'use client'

import { QueryClient, QueryClientProvider, type QueryClientConfig } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

const QUERY_CLIENT_CONFIG: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
} as const

export function QueryProvider({ children }: React.PropsWithChildren) {
  const [client] = useState(() => new QueryClient(QUERY_CLIENT_CONFIG))

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
