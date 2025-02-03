import { NextResponse } from 'next/server'
import { KeywordRepository, SeriesRepository } from '@/database/keywords'
import { PostRepository } from '@/database/posts'
import { ProjectRepository } from '@/database/projects'
import type { GetPostKeywordAllResponse, MappedKeywordWithLength } from '@/entities/post'
import { connectPostByKeywordDB, createSeparateKeywords } from '@/entities/post'

const PostByKeywordDB = await connectPostByKeywordDB()

export const GET = () => {
  const separateKeywords = createSeparateKeywords({
    projects: new Set(ProjectRepository.getKeys()),
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
