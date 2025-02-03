'use server'

import { PostRepository } from '@/database/posts'
import { getMarkdownContent } from '@/shared/api'
import { orderByDateAsc } from '@/shared/lib'
import { computeReadingTime } from '../lib'
import type { PostId, Post, PostMap, PostByKeywordMap } from '../model'

const parsePostDetail = async (id: PostId, index: number, array: PostId[]): Promise<Post> => {
  const content = await getMarkdownContent(`/articles/${id}`)

  return {
    ...PostRepository.findById(id),
    id,
    content,
    readingTime: computeReadingTime(content),
    related: {
      prev: index ? array[index - 1] : null,
      next: index !== array.length - 1 ? array[index + 1] : null,
    },
  }
}

export const connectPostDB = async () => {
  const postKeys = PostRepository.getKeys().sort(orderByDateAsc)
  const postList = await Promise.all(postKeys.map(parsePostDetail))

  return postList.reduce<PostMap>((db, post) => db.set(post.id, post), new Map())
}

export const connectPostByKeywordDB = async () => {
  return PostRepository.getKeys().reduce<PostByKeywordMap>((database, postId) => {
    return PostRepository.findById(postId).keywords.reduce((db, keyword) => {
      return db.set(keyword, (db.get(keyword) ?? new Set()).add(postId))
    }, database)
  }, new Map())
}
