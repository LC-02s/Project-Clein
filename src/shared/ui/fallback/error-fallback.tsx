'use client'

import { Exception, type CommonErrorProps } from '../../api'
import { EMAIL_ADDRESS, GITHUB_ISSUE_ADDRESS, MAIN_TITLE } from '../../config'
import { cn } from '../../lib'
import { Button, Icon, ExternalLink } from '../../ui'
import { PageIconWrapper } from './page-icon-wrapper'

export interface ErrorFallbackProps
  extends CommonErrorProps,
    Omit<React.JSX.IntrinsicElements['div'], keyof React.PropsWithChildren> {
  comment?: string | null
  refresh?: () => void
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  reset,
  comment,
  refresh = () => (window.location.href = window.location.href!),
  className,
  ...props
}) => {
  const message = Exception.extractMessage(error)

  return (
    <div className={cn('py-screen wrapper-xl relative flex-1', className)} {...props}>
      <PageIconWrapper>
        <Icon.PoliceCarLightEmoji className="size-full" />
      </PageIconWrapper>
      <h2 className="mt-12 break-keep text-center text-xl font-bold md:text-2xl">
        {comment || '이용에 불편을 드려 죄송해요'}
      </h2>
      <p className="mt-4 break-keep text-center text-gray-500 md:mt-6 md:text-lg dark:text-gray-400">
        {message && (
          <>
            {message} <br className="hidden xs:block" />
          </>
        )}
        다시 시도해도 동일한 증상이 발생한다면 <br className="hidden xs:block" />
        이메일({EMAIL_ADDRESS})로 문의 하거나 <br className="hidden xs:block" />
        <ExternalLink
          href={GITHUB_ISSUE_ADDRESS}
          title={`${MAIN_TITLE} 깃허브 이슈`}
          className="text-blue-700 hover:underline dark:text-blue-300"
        >
          깃허브 이슈
        </ExternalLink>
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
