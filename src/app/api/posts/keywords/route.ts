import { NextResponse } from 'next/server'
import { PostRepository, KeywordRepository } from '@/database/posts'
import type { GetPostKeywordAllResponse, MappedKeywordWithLength } from '@/entities/post'
import { PostByKeywordDB, separateKeywords } from '@/entities/post'

export function GET() {
  return NextResponse.json({
    ...separateKeywords<MappedKeywordWithLength>([...PostByKeywordDB.keys()], (keyword) => ({
      id: keyword,
      name: KeywordRepository.findById(keyword),
      length: PostByKeywordDB.get(keyword)!.size,
    })),
    total: PostRepository.getKeys().length,
  } satisfies GetPostKeywordAllResponse)
}
