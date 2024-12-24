'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { EMAIL_ADDRESS } from '@/shared/config'
import { cn } from '@/shared/lib'
import { Icon, Button, buttonVariants } from '@/shared/ui'

export default function NotFound(props: Omit<React.JSX.IntrinsicElements['div'], 'children'>) {
  const { back } = useRouter()

  return (
    <div {...props}>
      <div className="mx-auto size-36 rounded-full border border-zinc-200 bg-zinc-100 p-8 sm:size-48 sm:p-12 dark:border-zinc-600 dark:bg-zinc-800">
        <Icon.ThinkingFaceEmoji className="size-full" />
      </div>
      <h2 className="mt-12 break-keep text-center text-xl font-bold sm:text-2xl">
        요청하신 페이지를 찾을 수 없어요
      </h2>
      <p className="mt-6 break-keep text-center text-zinc-500 sm:text-lg dark:text-zinc-400">
        찾으시고자 하는 페이지가 삭제되었거나 이동되었을 수 있어요.{' '}
        <br className="hidden md:block" />
        주소를 한 번 더 확인해 주시고, 동일한 증상이 지속적으로 나타나는 경우{' '}
        <br className="hidden sm:block" />
        관리자({EMAIL_ADDRESS})에게 문의해 주세요.
      </p>
      <p className="mt-16 flex items-center justify-center space-x-3">
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
    </div>
  )
}
