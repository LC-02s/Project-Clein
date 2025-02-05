import Image from 'next/image'
import { LinkWithLoader } from '@/features/loader'
import { NICKNAME, NICKNAME_KR, MAIN_DESCRIPTION, USER_GITHUB_ADDRESS } from '@/shared/config'
import { cn } from '@/shared/lib'
import { MainLogo, ExternalLink } from '@/shared/ui'
import { buttonVariants, containerVariants, Icon } from '@/shared/ui'
import { BuyMeACoffeeButton } from './coffee-button'
import { EmailButton } from './email-button'
import { SiteMap } from './site-map'

export const Footer: React.FC = () => (
  <footer
    className={cn(
      containerVariants({ layer: 'middle', round: 'none' }),
      'border-t pb-24 pt-12 md:pb-16 md:pt-6',
    )}
    role="contentinfo"
  >
    <div className="wrapper-xl">
      <div className="relative mb-6 md:hidden">
        <Image
          src="/images/profile.png"
          alt={`${NICKNAME_KR} 프로필 이미지`}
          className="mx-auto size-20 overflow-hidden rounded-full border border-gray-300 dark:border-gray-600"
          width={160}
          height={160}
        />
      </div>
      <div className="flex flex-col items-center justify-center px-1 md:flex-row md:justify-between">
        <MainLogo render={LinkWithLoader} />
        <div className="mt-2 flex flex-col items-center justify-between space-y-8 md:mt-0 md:flex-row md:space-x-6 md:space-y-0">
          <SiteMap />
          <BuyMeACoffeeButton
            title={`${NICKNAME_KR}에게 커피 사주기 대화창 열기`}
            variant="filled"
            color="info"
          >
            <span className="pl-1">Buy Me a Coffee</span>
            <Icon.BubbleTeaEmoji className="mb-1 ml-2 text-xl md:text-2xl" />
          </BuyMeACoffeeButton>
        </div>
      </div>
      <hr className="my-8 border-gray-300 md:my-6 dark:border-gray-600" />
      <div className="flex flex-col-reverse items-center justify-between px-1 md:flex-row">
        <p className="break-keep text-center text-sm text-gray-500 md:text-left md:text-base dark:text-gray-400">
          {MAIN_DESCRIPTION}
        </p>
        <ul className="mb-6 flex space-x-2 md:mb-0">
          <li>
            <ExternalLink
              href={USER_GITHUB_ADDRESS}
              title={`${NICKNAME} 깃허브`}
              className={cn(
                buttonVariants({
                  variant: 'light',
                  round: 'full',
                  size: 'lg',
                  square: true,
                }),
                'size-12',
              )}
            >
              <Icon.GithubLogo className="size-7 dark:text-white" />
              <span className="sr-only">{NICKNAME} 깃허브</span>
            </ExternalLink>
          </li>
          <li>
            <EmailButton
              type="button"
              title="이메일 복사 대화창 열기"
              className={cn(
                buttonVariants({
                  variant: 'light',
                  round: 'full',
                  size: 'lg',
                  square: true,
                }),
                'size-12',
              )}
            >
              <Icon.LetterBold className="size-8 dark:text-white" />
              <span className="sr-only">이메일 보기</span>
            </EmailButton>
          </li>
        </ul>
      </div>
      <p className="mt-9 break-keep px-1 text-center text-sm text-gray-500 md:mt-2 md:text-left md:text-base dark:text-gray-400">
        &copy; 2024 {NICKNAME} All Rights Reserved.
      </p>
    </div>
  </footer>
)
