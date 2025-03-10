import { EMAIL_ADDRESS } from '../../config'
import { cn } from '../../lib'
import { Icon } from '../../ui'

import { PageIconWrapper } from './page-icon-wrapper'
import { RouteButtonGroup } from './route-button-group'

export type NotFoundProps = Omit<React.JSX.IntrinsicElements['div'], keyof React.PropsWithChildren>

export const NotFound: React.FC<NotFoundProps> = ({ className, ...props }) => (
  <div className={cn('py-screen wrapper-xl', className)} {...props}>
    <PageIconWrapper>
      <Icon.ThinkingFaceEmoji className="size-full" />
    </PageIconWrapper>
    <h2 className="mt-12 break-keep text-center text-xl font-bold md:text-2xl">
      요청하신 페이지를 찾을 수 없어요
    </h2>
    <p className="mt-4 break-keep text-center text-gray-500 md:mt-6 md:text-lg dark:text-gray-400">
      찾으시고자 하는 페이지가 삭제되었거나 이동되었을 수 있어요. <br className="hidden md:block" />
      주소를 한 번 더 확인해 주시고, 동일한 증상이 지속적으로 나타나는 경우{' '}
      <br className="hidden sm:block" />
      관리자({EMAIL_ADDRESS})에게 문의해 주세요.
    </p>
    <RouteButtonGroup />
  </div>
)
