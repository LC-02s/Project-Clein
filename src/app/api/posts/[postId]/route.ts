import { type NextRequest, NextResponse } from 'next/server'
import { KeywordRepository, PostRepository, SeriesRepository } from '@/database/posts'
import { DevProjectRepository } from '@/database/projects'
import type { GetPostDetailResponse, MappedKeyword, PostId } from '@/entities/post'
import { createSeparateKeywords } from '@/entities/post'
import { exceptionMessage } from '@/shared/api'
import { PostDB } from '../route'

interface GetPostDetailParams {
  params: Promise<{ postId: PostId }>
}

export const GET = async (_: NextRequest, { params }: GetPostDetailParams) => {
  const { postId } = await params
  const post = PostDB.get(postId)

  if (!post) {
    return NextResponse.json(exceptionMessage('요청하신 포스트를 찾지 못했어요'), { status: 404 })
  }

  const { keywords, related, ...rest } = post
  const separateKeywords = createSeparateKeywords({
    projects: new Set(DevProjectRepository.getKeys()),
    series: new Set(SeriesRepository.getKeys()),
  })

  return NextResponse.json({
    post: {
      ...rest,
      ...separateKeywords<MappedKeyword>(keywords, (keyword) => ({
        id: keyword,
        name: KeywordRepository.findById(keyword),
      })),
      related: {
        prev: related.prev
          ? { id: related.prev, title: PostRepository.findById(related.prev).title }
          : null,
        next: related.next
          ? { id: related.next, title: PostRepository.findById(related.next).title }
          : null,
      },
    },
  } satisfies GetPostDetailResponse)
}
