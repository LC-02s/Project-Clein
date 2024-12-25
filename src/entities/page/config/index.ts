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

export const MAIN_PAGE_TITLE = `${NICKNAME}'s Portfolio`

export const BLOG_PAGE_TITLE = `${NICKNAME}'s Tech Blog`

export const EMAIL_ADDRESS = 'chanlee1007@naver.com'

export const GITHUB_ADDRESS = 'https://github.com/LC-02s'
