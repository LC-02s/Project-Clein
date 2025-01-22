import { NextResponse } from 'next/server'
import { PostRepository, KeywordRepository, SeriesRepository } from '@/database/posts'
import { DevProjectRepository } from '@/database/projects'
import type { GetPostKeywordAllResponse, MappedKeywordWithLength } from '@/entities/post'
import { createSeparateKeywords } from '@/entities/post'
import { PostByKeywordDB } from '../route'

export function GET() {
  const separateKeywords = createSeparateKeywords({
    projects: new Set(DevProjectRepository.getKeys()),
    series: new Set(SeriesRepository.getKeys()),
  })

  return NextResponse.json({
    ...separateKeywords<MappedKeywordWithLength>([...PostByKeywordDB.keys()], (keyword) => ({
      id: keyword,
      name: KeywordRepository.findById(keyword),
      length: PostByKeywordDB.get(keyword)!.size,
    })),
    total: PostRepository.getKeys().length,
  } satisfies GetPostKeywordAllResponse)
}
