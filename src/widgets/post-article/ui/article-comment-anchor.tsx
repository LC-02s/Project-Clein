'use client'

import { createScrollToSection } from '@/shared/lib'
import { Icon, Button } from '@/shared/ui'

import { ARTICLE_ASIDE_CLOSE_CLASS_NAME, ARTICLE_COMMENT_ID } from '../config'

export const ArticleCommentAnchor: React.FC = () => (
  <Button
    href={`#${ARTICLE_COMMENT_ID}`}
    title="댓글 영역 바로가기"
    square
    className={ARTICLE_ASIDE_CLOSE_CLASS_NAME}
    onClick={createScrollToSection(`#${ARTICLE_COMMENT_ID}`)}
    component="a"
  >
    <Icon.ChatRoundOutline className="text-lg md:text-xl" />
  </Button>
)
