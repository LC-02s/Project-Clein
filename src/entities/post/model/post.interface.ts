import type { KeywordRepository } from '@/database/posts'
import type { LiteralDate, LiteralDateTime } from '@/shared/lib'

export type Keyword = ReturnType<typeof KeywordRepository.getKeys>[number]

export type PostId = LiteralDate

export interface PostRawData {
  title: string
  description: string
  thumbnail: {
    src: `/${string}.${'png' | 'jpeg' | 'jpg' | 'gif'}`
    alt: string
  }
  createdAt: LiteralDateTime
  updatedAt: LiteralDateTime
  keywords: Keyword[]
  externalTags?: string[]
}

export interface Post extends PostRawData {
  id: PostId
  content: string
  readingTime: number
  related: {
    prev: PostId | null
    next: PostId | null
  }
}

export type PostMap = Map<PostId, Post>

export type SetOfPostId = Set<PostId>

export type PostByTagMap = Map<Keyword, SetOfPostId>
