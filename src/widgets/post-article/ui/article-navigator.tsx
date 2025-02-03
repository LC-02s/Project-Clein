'use client'

import { type PropsWithClassName, cn, createScrollToSection } from '@/shared/lib'
import { Button, Icon, buttonVariants } from '@/shared/ui'
import { ARTICLE_ASIDE_CLOSE_CLASS_NAME, ARTICLE_COMMENT_ID } from '../config'

export const ArticleNavigator: React.FC<PropsWithClassName> = ({ className }) => (
  <div className={cn('flex space-x-2', className)}>
    <Button
      title="페이지 최상단 이동"
      className={ARTICLE_ASIDE_CLOSE_CLASS_NAME}
      square
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }}
    >
      <Icon.ArrowOutline direction="top" className="text-xl" />
      <span className="sr-only">TOP</span>
    </Button>
    <Button
      title="페이지 최하단 이동"
      className={ARTICLE_ASIDE_CLOSE_CLASS_NAME}
      square
      onClick={() => {
        window.scrollTo({ top: document.body.offsetHeight, behavior: 'smooth' })
      }}
    >
      <Icon.ArrowOutline direction="bottom" className="text-xl" />
      <span className="sr-only">BOTTOM</span>
    </Button>
    <a
      href={`#${ARTICLE_COMMENT_ID}`}
      title="댓글 영역 바로가기"
      className={cn(buttonVariants(), 'flex-1', ARTICLE_ASIDE_CLOSE_CLASS_NAME)}
      onClick={createScrollToSection(`#${ARTICLE_COMMENT_ID}`)}
    >
      <Icon.ChatRoundOutline className="mr-2 text-xl" />
      <span className="pr-2">댓글 달기</span>
    </a>
  </div>
)
