import { type PostId } from '../model'

export const ENDPOINT_POST = {
  LIST: '/api/posts',
  SEARCH: '/api/posts/search',
  DETAIL: (id: PostId) => `/api/posts/${id}` as const,
} as const
