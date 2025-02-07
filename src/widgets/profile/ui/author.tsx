import Image from 'next/image'
import { NICKNAME, NICKNAME_KR, USER_GITHUB_ADDRESS } from '@/shared/config'
import { type PropsWithClassName, cn } from '@/shared/lib'
import { Container, ExternalLink } from '@/shared/ui'

export const Author: React.FC<PropsWithClassName> = ({ className }) => (
  <Container
    className={cn('flex items-center space-x-4 border px-3 py-2 md:px-5 md:py-3', className)}
  >
    <Image
      src="/images/profile.png"
      alt={`${NICKNAME_KR} 프로필 이미지`}
      className="size-9 overflow-hidden rounded-full border border-gray-200 bg-gray-100 md:size-10 dark:border-gray-600 dark:bg-gray-700"
      width={160}
      height={160}
    />
    <p>
      <ExternalLink
        href={USER_GITHUB_ADDRESS}
        title={`${NICKNAME} 깃허브`}
        className="whitespace-nowrap font-bold hover:underline md:text-lg"
      >
        {NICKNAME}
      </ExternalLink>
      <span className="block break-keep text-sm text-gray-500 md:text-base dark:text-gray-400">
        SI 퍼블리셔 출신 FE 개발자
      </span>
    </p>
  </Container>
)
