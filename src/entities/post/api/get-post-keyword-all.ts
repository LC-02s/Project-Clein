import { server } from '@/shared/api'
import type { SeparatedKeywordsKey, MappedKeywordWithLength } from '../model'
import { ENDPOINT_POST } from './endpoint'

export interface GetPostKeywordAllResponse
  extends Record<SeparatedKeywordsKey, MappedKeywordWithLength[]> {
  total: number
}

export interface GetPostKeywordAll {
  (): Promise<GetPostKeywordAllResponse>
}

export const getPostKeywordAll: GetPostKeywordAll = async () => {
  return await server.request<GetPostKeywordAllResponse>(ENDPOINT_POST.KEYWORDS)
}
