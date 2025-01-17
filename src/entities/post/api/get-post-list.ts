import { type SearchParams, server } from '@/shared/api'
import { PAGINATION_PARAMS, type ResponseWithPagination, type SortedInfo } from '@/shared/lib'
import type { Keyword, PostItem } from '../model'

export type PostListParamsKey = (typeof POST_LIST_PARAMS)[keyof typeof POST_LIST_PARAMS]

export const POST_LIST_PARAMS = Object.freeze({
  ...PAGINATION_PARAMS,
  KEYWORD: 'keyword',
  SORT: 'sort',
})

export interface GetPostListResponse extends ResponseWithPagination<PostItem>, SortedInfo {
  keyword: Keyword | null
}

export interface GetPostList {
  (params: SearchParams): Promise<GetPostListResponse>
}

export const getPostList: GetPostList = async (params) => {
  return await server.request<GetPostListResponse>('/api/posts', { params })
}
