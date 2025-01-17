import { type ExceptionInterceptor, server } from '@/shared/api'
import type { PostDetail, PostId } from '../model'

export interface GetPostDetailResponse {
  post: PostDetail
}

export interface GetPostDetail {
  (id: PostId, onException?: ExceptionInterceptor): Promise<GetPostDetailResponse>
}

export const getPostDetail: GetPostDetail = async (id, onException) => {
  return await server.request<GetPostDetailResponse>(`/api/post/${id}`, { onException })
}
