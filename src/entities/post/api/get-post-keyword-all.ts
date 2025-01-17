import { server } from '@/shared/api'
import type { SeparatedKeywordsKey, MappedKeywordWithLength } from '../model'

export interface GetPostKeywordAllResponse
  extends Record<SeparatedKeywordsKey, MappedKeywordWithLength[]> {
  total: number
}

export interface GetPostKeywordAll {
  (): Promise<GetPostKeywordAllResponse>
}

export const getPostKeywordAll: GetPostKeywordAll = async () => {
  return await server.request<GetPostKeywordAllResponse>('/api/posts/keywords')
}
