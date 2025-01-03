import { readFile } from 'fs/promises'
import readingTime from 'reading-time'
import type { PostId, Post, PostMap, PostByTagMap } from './post.interface'
import { PostRepository } from '@/database/posts'
import { orderByDateAsc } from '@/shared/lib'
import { POSTS_BASE_PATH, THUMBNAIL_PATH_PREFIX } from '../config'

async function parsePostDetail(id: PostId, index: number, array: PostId[]): Promise<Post> {
  const content = await readFile(`${POSTS_BASE_PATH}/${id}.md`, 'utf-8')

  return {
    ...PostRepository.findById(id),
    id,
    content,
    readingTime: Math.ceil(readingTime(content).minutes),
    related: {
      prev: index ? array[index - 1] : null,
      next: index !== array.length - 1 ? array[index + 1] : null,
    },
  }
}

async function connectPostDB() {
  const postKeys = PostRepository.getKeys().sort(orderByDateAsc)
  const postList = await Promise.all(postKeys.map(parsePostDetail))

  return postList.reduce<PostMap>((db, post) => {
    return db.set(post.id, {
      ...post,
      thumbnail: { ...post.thumbnail, src: `${THUMBNAIL_PATH_PREFIX}${post.thumbnail.src}` },
    })
  }, new Map())
}

export const PostDB = await connectPostDB()

function connectPostByKeywordDB() {
  return PostRepository.getKeys().reduce<PostByTagMap>((database, postId) => {
    return PostRepository.findById(postId).keywords.reduce((db, keyword) => {
      return db.set(keyword, (db.get(keyword) ?? new Set()).add(postId))
    }, database)
  }, new Map())
}

export const PostByKeywordDB = connectPostByKeywordDB()
