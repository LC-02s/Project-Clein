'use client'

import { Exception, type CommonErrorProps } from '@/shared/api'
import { cn } from '@/shared/lib'
import { Button, Icon } from '@/shared/ui'
import { EMAIL_ADDRESS, GITHUB_ISSUE_ADDRESS, MAIN_TITLE } from '../config'
import GithubLink from './github-link'
import PageIconWrapper from './page-icon-wrapper'

export interface ErrorFallbackProps
  extends CommonErrorProps,
    Omit<React.JSX.IntrinsicElements['div'], 'children'> {
  comment?: string | null
  refresh?: () => void
}

export function ErrorFallback({
  error,
  reset,
  comment,
  refresh = () => (window.location.href = window.location.href!),
  className,
  ...props
}: ErrorFallbackProps) {
  const message = Exception.extractMessage(error)

  return (
    <div className={cn('py-screen wrapper-xl relative flex-1', className)} {...props}>
      <PageIconWrapper>
        <Icon.PoliceCarLightEmoji className="size-full" />
      </PageIconWrapper>
      <h2 className="mt-12 break-keep text-center text-xl font-bold sm:text-2xl">
        {comment || '이용에 불편을 드려 죄송해요'}
      </h2>
      <p className="mt-6 break-keep text-center text-zinc-500 sm:text-lg dark:text-zinc-400">
        {message && (
          <>
            {message} <br className="hidden xs:block" />
          </>
        )}
        다시 시도해도 동일한 증상이 발생한다면 <br className="hidden xs:block" />
        이메일({EMAIL_ADDRESS})로 문의 하거나 <br className="hidden xs:block" />
        <GithubLink
          href={GITHUB_ISSUE_ADDRESS}
          title={`새창이동: ${MAIN_TITLE} 깃허브 이슈`}
          className="text-indigo-600 hover:underline dark:text-indigo-300"
        >
          깃허브 이슈
        </GithubLink>
        에 제보해 주세요!
      </p>
      <p className="mt-16 flex items-center justify-center space-x-3">
        <Button
          size="lg"
          title="다시 시도하기"
          onClick={() => {
            reset()
            refresh()
          }}
        >
          <Icon.RefreshOutline className="mr-2" />
          <span className="pr-1.5">다시시도</span>
        </Button>
      </p>
    </div>
  )
}
