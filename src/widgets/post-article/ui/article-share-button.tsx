'use client'

import type { PostDetail } from '@/entities/post'
import { share } from '@/shared/lib'
import { Button, Icon } from '@/shared/ui'

export type ArticleShareButtonProps = Pick<PostDetail, 'title' | 'description'>

export const ArticleShareButton: React.FC<ArticleShareButtonProps> = ({ title, description }) => (
  <Button title="게시물 공유창 열기" onClick={() => share({ title, description })} square>
    <Icon.ShareOutline className="text-lg md:text-xl" />
  </Button>
)
