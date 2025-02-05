import Image from 'next/image'
import { NICKNAME, NICKNAME_KR, EMAIL_ADDRESS, USER_GITHUB_ADDRESS } from '@/shared/config'
import { type PropsWithClassName, cn } from '@/shared/lib'
import { Container, ExternalLink, Icon } from '@/shared/ui'

export const Profile: React.FC<PropsWithClassName> = ({ className }) => (
  <Container
    className={cn(
      'relative flex h-fit w-full flex-col items-center border p-5 md:flex-row md:items-start xl:flex-col xl:items-center',
      className,
    )}
  >
    <h2 className="sr-only">프로필</h2>
    <div className="flex size-32 items-center justify-center rounded-full border border-gray-200 bg-gray-100 p-2 md:mr-8 xl:mr-0 xl:size-40 dark:border-gray-600 dark:bg-gray-700">
      <Image src="/images/me-emoji.png" alt={`${NICKNAME_KR} 미모지`} width={480} height={480} />
    </div>
    <div className="max-w-72 flex-1 md:max-w-full">
      <h2 className="mt-6 break-keep text-center text-base font-bold md:mt-0 md:text-left md:text-lg xl:mt-6 xl:text-center">
        {NICKNAME} &middot; FE Developer
      </h2>
      <p className="my-3 break-keep text-center text-sm text-gray-500 md:text-left md:text-base xl:text-center dark:text-gray-400">
        안녕하세요, 모든 사용자에게 동일한 경험을 선사하고 싶은 프론트엔드 개발자{' '}
        <span className="whitespace-nowrap">이찬({NICKNAME_KR})</span>입니다. <br />
        저와 이야기를 나누고 싶다면 언제든 하단의 이메일로 연락해 주세요!
      </p>
      <ul className="mt-6 flex w-full flex-col items-center space-y-2 py-1 md:mt-3 md:items-start">
        <li className="relative pl-7">
          <Icon.GithubLogo className="absolute left-0 top-1 text-lg text-gray-600 dark:text-gray-300" />
          <ExternalLink
            href={USER_GITHUB_ADDRESS}
            title={`${NICKNAME} 깃허브`}
            className="whitespace-nowrap text-sm hover:text-blue-700 hover:underline md:text-base dark:hover:text-blue-300"
          >
            {USER_GITHUB_ADDRESS}
          </ExternalLink>
        </li>
        <li className="relative pl-7">
          <Icon.LetterBold className="absolute left-0 top-1 text-lg text-gray-600 dark:text-gray-300" />
          <span className="whitespace-nowrap text-sm md:text-base">{EMAIL_ADDRESS}</span>
        </li>
      </ul>
    </div>
  </Container>
)
