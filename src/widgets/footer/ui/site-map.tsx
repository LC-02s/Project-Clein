import { LinkWithLoader } from '@/features/loader'
import { SITE_MAP } from '@/shared/config'

export function SiteMap() {
  return (
    <ul className="flex flex-wrap items-center justify-center md:space-x-1">
      {SITE_MAP.map(({ href, segment, title }) => (
        <li key={segment} className="p-0.5">
          <LinkWithLoader
            href={href}
            title={`${title} 페이지 바로가기`}
            className="p-1 text-zinc-500 hover:text-indigo-600 hover:underline dark:text-zinc-400 dark:hover:text-indigo-300"
          >
            {title}
          </LinkWithLoader>
        </li>
      ))}
    </ul>
  )
}
