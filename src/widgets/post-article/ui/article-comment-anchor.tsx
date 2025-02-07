'use client'

import { cn, createScrollToSection } from '@/shared/lib'
import { Icon, buttonVariants } from '@/shared/ui'
import { ARTICLE_ASIDE_CLOSE_CLASS_NAME, ARTICLE_COMMENT_ID } from '../config'

export const ArticleCommentAnchor: React.FC = () => (
  <a
    href={`#${ARTICLE_COMMENT_ID}`}
    title="댓글 영역 바로가기"
    className={cn(buttonVariants({ square: true }), ARTICLE_ASIDE_CLOSE_CLASS_NAME)}
    onClick={createScrollToSection(`#${ARTICLE_COMMENT_ID}`)}
  >
    <Icon.ChatRoundOutline className="text-lg md:text-xl" />
  </a>
)
