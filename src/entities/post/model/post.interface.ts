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
