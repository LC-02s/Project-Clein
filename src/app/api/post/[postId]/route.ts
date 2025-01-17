import { type NextRequest, NextResponse } from 'next/server'
import { KeywordRepository, PostRepository } from '@/database/posts'
import type { GetPostDetailResponse, MappedKeyword, PostId } from '@/entities/post'
import { PostDB, separateKeywords } from '@/entities/post'
import { exceptionMessage } from '@/shared/api'

export interface GetPostDetailParams {
  params: Promise<{ postId: PostId }>
}

export async function GET(_: NextRequest, { params }: GetPostDetailParams) {
  const { postId } = await params
  const post = PostDB.get(postId)

  if (!post) {
    return NextResponse.json(exceptionMessage('요청하신 포스트를 찾지 못했어요'), { status: 404 })
  }

  const { keywords, related, ...rest } = post

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
