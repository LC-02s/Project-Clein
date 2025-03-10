import { useQuery } from '@tanstack/react-query'

import { server } from '@/shared/api'

import { type SearchProjectItem } from '../model'

import { ENDPOINT_PROJECT } from './endpoint'

export type SearchProjectParamsKey =
  (typeof SEARCH_PROJECT_PARAMS)[keyof typeof SEARCH_PROJECT_PARAMS]

export interface SearchProjectResponse {
  contents: SearchProjectItem[]
}

export const SEARCH_PROJECT_PARAMS = { QUERY: 'q' } as const

export interface SearchProject {
  (query: string): Promise<SearchProjectResponse>
}

export const searchProject: SearchProject = async (query) =>
  await server.request<SearchProjectResponse>(ENDPOINT_PROJECT.SEARCH, {
    params: { [SEARCH_PROJECT_PARAMS.QUERY]: query.trim() },
  })

export const useSearchProject = (query: string) =>
  useQuery({
    queryKey: [ENDPOINT_PROJECT.SEARCH, query],
    queryFn: () => searchProject(query),
    enabled: !!query,
  })
