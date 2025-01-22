import type { Post, PostItem } from '../../model'

export function convertPostItem(post: Post): PostItem {
  return {
    id: post.id,
    title: post.title,
    description: post.description,
    thumbnail: post.thumbnail,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    readingTime: post.readingTime,
  }
}
