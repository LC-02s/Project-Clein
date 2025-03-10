import { type SearchParams, server } from '@/shared/api'
import { type ResponseWithPagination, type SortedInfo, PAGINATION_PARAMS } from '@/shared/lib'

import {
  type Keyword,
  type MappedKeywordWithLength,
  type PostItem,
  type SeparatedKeywordsKey,
} from '../model'

import { ENDPOINT_POST } from './endpoint'

export type PostListParamsKey = (typeof POST_LIST_PARAMS)[keyof typeof POST_LIST_PARAMS]

export const POST_LIST_PARAMS = { ...PAGINATION_PARAMS, KEYWORD: 'keyword', SORT: 'sort' } as const

export interface GetPostListResponse extends ResponseWithPagination<PostItem>, SortedInfo {
  keywords: Record<SeparatedKeywordsKey, MappedKeywordWithLength[]> & {
    current: Keyword | null
    total: number
  }
}

export interface GetPostList {
  (params: SearchParams): Promise<GetPostListResponse>
}

export const getPostList: GetPostList = async (params) => {
  return await server.request<GetPostListResponse>(ENDPOINT_POST.LIST, { params })
}
