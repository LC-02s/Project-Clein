'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { cn } from '@/shared/lib'
import { Button, buttonVariants, Icon } from '@/shared/ui'

interface ButtonGroupProps {
  className?: string
}

export default function RouteButtonGroup({ className }: ButtonGroupProps) {
  const { back } = useRouter()

  return (
    <p className={cn('mt-16 flex items-center justify-center space-x-3', className)}>
      <Button size="lg" title="뒤로가기" className="bg-zinc-50" onClick={back}>
        뒤로가기
      </Button>
      <Link
        href="/"
        title="메인페이지 이동"
        className={cn(buttonVariants({ size: 'lg' }), 'bg-zinc-50')}
      >
        <Icon.HouseEmoji className="text-2xl" />
        <span className="ml-2 pr-2">메인으로</span>
      </Link>
    </p>
  )
}
