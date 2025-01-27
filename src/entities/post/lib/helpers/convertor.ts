import type { Post, PostItem } from '../../model'

export const convertPostItem = (post: Post): PostItem => ({
  id: post.id,
  title: post.title,
  description: post.description,
  thumbnail: post.thumbnail,
  createdAt: post.createdAt,
  updatedAt: post.updatedAt,
  readingTime: post.readingTime,
})
