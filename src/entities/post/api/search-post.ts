import { useInfiniteQuery } from '@tanstack/react-query'

import { server } from '@/shared/api'
import { type ResponseWithPagination, DEFAULT_PAGE, PAGINATION_PARAMS } from '@/shared/lib'

import { type SearchPostItem } from '../model'

import { ENDPOINT_POST } from './endpoint'

export type SearchPostParamsKey = (typeof SEARCH_POST_PARAMS)[keyof typeof SEARCH_POST_PARAMS]

export type SearchPostResponse = ResponseWithPagination<SearchPostItem>

export const SEARCH_POST_PARAMS = { ...PAGINATION_PARAMS, QUERY: 'q' } as const

export interface SearchPostParams {
  query: string
  page: number
}

export interface SearchPost {
  (params: SearchPostParams): Promise<SearchPostResponse>
}

export const searchPost: SearchPost = async ({ query, page }) =>
  await server.request<SearchPostResponse>(ENDPOINT_POST.SEARCH, {
    params: {
      [SEARCH_POST_PARAMS.QUERY]: query.trim(),
      [SEARCH_POST_PARAMS.PAGE]: page?.toString(),
    },
  })

export const useSearchPost = (query: string) =>
  useInfiniteQuery({
    queryKey: [ENDPOINT_POST.SEARCH, query],
    queryFn: ({ pageParam }) => searchPost({ query, page: pageParam }),
    enabled: !!query,
    select: ({ pageParams, pages }) => ({
      pageParams,
      pages: pages.flatMap(({ contents }) => contents),
    }),
    initialPageParam: DEFAULT_PAGE,
    getNextPageParam: ({ page }) => (page.last ? null : page.current + 1),
  })
