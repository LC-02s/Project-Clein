import Image from 'next/image'
import Link from 'next/link'
import { MainLogo, NICKNAME, NICKNAME_KR, GITHUB_ADDRESS } from '@/entities/page'
import { buttonVariants, Icon } from '@/shared/ui'
import BuyMeACoffeeButton from './coffee-button'
import EmailButton from './email-button'
import SiteMap from './site-map'

export default function Footer() {
  const contactLinkStyle = buttonVariants({
    variant: 'light',
    round: 'full',
    size: 'lg',
    square: true,
  })

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 pb-24 pt-12 md:pb-16 md:pt-6 dark:border-zinc-700 dark:bg-zinc-800">
      <div className="wrapper-xl">
        <div className="relative mb-6 md:hidden">
          <Image
            src="/img/profile.png"
            alt={`${NICKNAME_KR} 프로필 이미지`}
            className="mx-auto size-20 overflow-hidden rounded-full border border-zinc-300 dark:border-zinc-600"
            width={160}
            height={160}
          />
        </div>
        <div className="flex flex-col items-center justify-center px-1 md:flex-row md:justify-between">
          <MainLogo />
          <div className="mt-2 flex flex-col items-center justify-between space-y-8 md:mt-0 md:flex-row md:space-x-6 md:space-y-0">
            <SiteMap />
            <BuyMeACoffeeButton
              title={`${NICKNAME_KR}에게 커피 사주기`}
              color="none"
              className="bg-gradient-to-br from-indigo-500 to-violet-500 text-white hover:to-indigo-400 active:to-indigo-400"
            >
              <Icon.TeaCupOutline className="mr-2 text-xl" />
              Buy Me a Coffee
            </BuyMeACoffeeButton>
          </div>
        </div>
        <hr className="my-8 border-zinc-300 md:my-6 dark:border-zinc-600" />
        <div className="flex flex-col-reverse items-center justify-between px-1 md:flex-row">
          <p className="break-keep text-center text-lg font-medium text-zinc-500 md:text-left dark:text-zinc-400">
            SI 퍼블리셔 출신 FE 개발자 {NICKNAME_KR}의 포트폴리오 사이트
          </p>
          <ul className="mb-6 flex space-x-2 md:mb-0">
            <li>
              <Link
                href={GITHUB_ADDRESS}
                target="_blank"
                title={`새창이동: ${NICKNAME} 깃허브`}
                className={contactLinkStyle}
              >
                <Icon.GithubLogo className="size-7 dark:text-white" />
                <span className="hidden-text">새창이동: {NICKNAME} 깃허브</span>
              </Link>
            </li>
            <li>
              <EmailButton type="button" title="이메일 보기" className={contactLinkStyle}>
                <Icon.LetterBold className="size-8 dark:text-white" />
                <span className="hidden-text">이메일 보기</span>
              </EmailButton>
            </li>
          </ul>
        </div>
        <p className="mt-12 break-keep px-1 text-center text-zinc-500 md:mt-2 md:text-left dark:text-zinc-400">
          &copy; 2024 {NICKNAME} All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}
