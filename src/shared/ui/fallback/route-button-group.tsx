'use client'

import { useRouter } from 'next/navigation'

import { type PropsWithClassName, cn } from '../../lib'
import { Button, Icon, LinkWithLoader } from '../../ui'

export const RouteButtonGroup: React.FC<PropsWithClassName> = ({ className }) => {
  const { back } = useRouter()

  return (
    <p
      className={cn(
        'mt-10 flex items-center justify-center space-x-2 md:mt-16 md:space-x-3',
        className,
      )}
    >
      <Button size="lg" title="이전 페이지 이동" onClick={back}>
        뒤로가기
      </Button>
      <Button href="/" title="메인페이지 이동" size="lg" component={LinkWithLoader}>
        <Icon.HouseEmoji className="text-xl md:text-2xl" />
        <span className="ml-2 pr-2">메인으로</span>
      </Button>
    </p>
  )
}
