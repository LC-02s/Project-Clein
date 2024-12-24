import type { Page } from '../model'
import { Icon } from '@/shared/ui'

export const SITE_MAP: readonly Page[] = Object.freeze([
  { href: '/about', segment: '/about', title: 'About', icon: Icon.UserOutline },
  { href: '/blog?page=1', segment: '/blog', title: 'Blog', icon: Icon.DocumentTitleOutline },
  { href: '/project', segment: '/project', title: 'Project', icon: Icon.CodeOutline },
  { href: '/playground', segment: '/playground', title: 'Playground', icon: Icon.AtomOutline },
])

export const MAIN_PAGE_TITLE = `Clein's Portfolio Site`

export const BLOG_PAGE_TITLE = `Clein's Tech Blog`
