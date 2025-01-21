import type { PostId } from '../model'

export const ENDPOINT_POST = {
  LIST: '/api/posts',
  KEYWORDS: '/api/posts/keywords',
  DETAIL: (id: PostId) => `/api/posts/${id}` as const,
} as const
