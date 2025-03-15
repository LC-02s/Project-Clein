import { type KeywordEntity } from '@/database/keywords'
import { type PostEntity } from '@/database/posts'
import { type ImageData, type EntityId, type SortedFromDate } from '@/shared/lib'

export type Keyword = EntityId<typeof KeywordEntity>

export interface MappedKeyword {
  id: Keyword
  name: string
}

export interface MappedKeywordWithLength extends MappedKeyword {
  length: number
}

export type SeparatedKeywordsKey = 'tags' | 'projects' | 'series'

export type PostId = EntityId<typeof PostEntity>

export interface PostData extends SortedFromDate {
  title: string
  description: string
  thumbnail: ImageData
  keywords: Keyword[]
  externalTags?: string[]
  isWriting?: boolean
}

export interface PostItem extends Omit<PostData, 'keywords' | 'externalTags'> {
  id: PostId
  readingTime: number
}

export type SearchPostItem = Pick<PostItem, 'id' | 'title'>

export interface PostDetail
  extends Omit<PostData, 'keywords'>,
    Record<SeparatedKeywordsKey, MappedKeyword[]> {
  id: PostId
  content: string
  readingTime: number
  related: {
    prev: SearchPostItem | null
    next: SearchPostItem | null
  }
}
