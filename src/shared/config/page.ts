import {
  type PaginationParamsKey,
  createSearchParamsToURL,
  DEFAULT_PAGE,
  PAGINATION_PARAMS,
} from '../lib'
import { Icon } from '../ui'

export const PUBLIC_PATH = '/public' as const

export const ABOUT_PATH = '/about' as const

export const BLOG_PATH = '/blog' as const

export const PROJECT_PATH = '/projects' as const

export const PLAYGROUND_PATH = '/playground' as const

export interface Page {
  href: string
  segment: string
  title: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
}

export const SITE_MAP: readonly Page[] = [
  { href: ABOUT_PATH, segment: ABOUT_PATH, title: 'About', icon: Icon.UserOutline },
  {
    href: createSearchParamsToURL<PaginationParamsKey>(BLOG_PATH)([
      PAGINATION_PARAMS.PAGE,
      DEFAULT_PAGE,
    ]),
    segment: BLOG_PATH,
    title: 'Blog',
    icon: Icon.DocumentTitleOutline,
  },
  { href: PROJECT_PATH, segment: PROJECT_PATH, title: 'Project', icon: Icon.CodeOutline },
  { href: PLAYGROUND_PATH, segment: PLAYGROUND_PATH, title: 'Playground', icon: Icon.AtomOutline },
] as const
