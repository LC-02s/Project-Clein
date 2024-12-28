import type { Page } from '../model'
import { Icon } from '@/shared/ui'

export const SITE_MAP: readonly Page[] = Object.freeze([
  { href: '/about', segment: '/about', title: 'About', icon: Icon.UserOutline },
  { href: '/blog?page=1', segment: '/blog', title: 'Blog', icon: Icon.DocumentTitleOutline },
  { href: '/project', segment: '/project', title: 'Project', icon: Icon.CodeOutline },
  { href: '/playground', segment: '/playground', title: 'Playground', icon: Icon.AtomOutline },
])

export const NICKNAME = 'Clein'

export const NICKNAME_KR = '클라인'

export const MAIN_TITLE = `${NICKNAME}'s Portfolio`

export const MAIN_DESCRIPTION = `SI 퍼블리셔 출신 FE 개발자 ${NICKNAME_KR}의 포트폴리오 사이트`

export const MAIN_KEYWORDS = [
  '프론트엔드 개발자 포트폴리오',
  '개발자 포트폴리오',
  '포트폴리오 사이트',
  '프론트엔드 개발',
  '퍼블리셔 포트폴리오',
  `${NICKNAME_KR}의 포트폴리오`,
  `${NICKNAME_KR}의 포트폴리오 사이트`,
  NICKNAME_KR,
  NICKNAME,
  MAIN_TITLE,
  MAIN_DESCRIPTION,
]

export const BLOG_TITLE = `${NICKNAME}'s Tech Blog`

export const BLOG_DESCRIPTION = 'SI 퍼블리셔 출신 FE 개발자의 기술 블로그'

export const BLOG_KEYWORDS = ['기술 블로그', '프론트엔드 기술 블로그', BLOG_TITLE, BLOG_DESCRIPTION]

export const EMAIL_ADDRESS = 'chanlee1007@naver.com'

export const GITHUB_ADDRESS = 'https://github.com/LC-02s'

export const DOMAIN_ADDRESS = 'https://clein.site'
