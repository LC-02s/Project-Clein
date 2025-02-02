'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { type PropsWithClassName, cn } from '../../lib'
import { Button, buttonVariants, Icon } from '../../ui'

export const RouteButtonGroup: React.FC<PropsWithClassName> = ({ className }) => {
  const { back } = useRouter()

  return (
    <p className={cn('mt-16 flex items-center justify-center space-x-3', className)}>
      <Button size="lg" title="이전 페이지 이동" onClick={back}>
        뒤로가기
      </Button>
      <Link href="/" title="메인페이지 이동" className={buttonVariants({ size: 'lg' })}>
        <Icon.HouseEmoji className="text-2xl" />
        <span className="ml-2 pr-2">메인으로</span>
      </Link>
    </p>
  )
}
