'use client'

import type { PostDetail } from '@/entities/post'
import { share } from '@/shared/lib'
import { Button, Icon } from '@/shared/ui'

export type ArticleShareButtonProps = Pick<PostDetail, 'title' | 'description'>

export const ArticleShareButton: React.FC<ArticleShareButtonProps> = ({ title, description }) => (
  <Button
    title="게시물 공유창 열기"
    className="w-full"
    onClick={() => share({ title, description })}
  >
    <Icon.ShareOutline className="mr-2 text-lg md:text-xl" />
    <span className="pr-2">공유하기</span>
  </Button>
)
