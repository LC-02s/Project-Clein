import type { KeywordRepository } from '@/database/keywords'
import type {
  ImageData,
  LiteralDate,
  RepositoryId,
  SortedFromDate,
  SortedFromDateKey,
} from '@/shared/lib'

export type Keyword = RepositoryId<typeof KeywordRepository>

export interface MappedKeyword {
  id: Keyword
  name: string
}

export interface MappedKeywordWithLength extends MappedKeyword {
  length: number
}

export type SeparatedKeywordsKey = 'tags' | 'projects' | 'series'

export type PostId = LiteralDate

export interface PostRawData extends SortedFromDate {
  title: string
  description: string
  thumbnail: ImageData
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

export type PostByKeywordMap = Map<Keyword, SetOfPostId>

export type PostItem = Pick<
  Post,
  'id' | 'title' | 'description' | 'thumbnail' | 'readingTime' | SortedFromDateKey
>

export interface PostDetail
  extends Omit<Post, 'related' | 'keywords'>,
    Record<SeparatedKeywordsKey, MappedKeyword[]> {
  related: {
    prev: Pick<Post, 'id' | 'title'> | null
    next: Pick<Post, 'id' | 'title'> | null
  }
}
