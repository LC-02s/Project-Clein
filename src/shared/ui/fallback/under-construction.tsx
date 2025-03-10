import { cn } from '../../lib'
import { Icon } from '../../ui'

import { PageIconWrapper } from './page-icon-wrapper'
import { RouteButtonGroup } from './route-button-group'

export type UnderConstructionProps = Omit<
  React.JSX.IntrinsicElements['div'],
  keyof React.PropsWithChildren
>

export const UnderConstruction: React.FC<UnderConstructionProps> = ({ className, ...props }) => (
  <div className={cn('py-screen wrapper-xl', className)} {...props}>
    <PageIconWrapper>
      <Icon.ConstructionEmoji className="size-full" />
    </PageIconWrapper>
    <h2 className="mt-12 break-keep text-center text-xl font-bold md:text-2xl">
      페이지 준비 중이에요
    </h2>
    <p className="mt-4 break-keep text-center text-gray-500 md:mt-6 md:text-lg dark:text-gray-400">
      이용에 불편을 드려 죄송해요 <br />
      빠른 시일 내에 좋은 컨텐츠로 돌아올게요!
    </p>
    <RouteButtonGroup />
  </div>
)
