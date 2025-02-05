import { LinkWithLoader } from '@/features/loader'
import { SITE_MAP } from '@/shared/config'

export const SiteMap: React.FC = () => (
  <ul className="flex flex-wrap items-center justify-center md:space-x-1">
    {SITE_MAP.map(({ href, segment, title }) => (
      <li key={segment} className="p-0.5">
        <LinkWithLoader
          href={href}
          title={`${title} 페이지 바로가기`}
          className="p-1 text-sm text-gray-500 hover:text-blue-700 hover:underline md:text-base dark:text-gray-400 dark:hover:text-blue-300"
        >
          {title}
        </LinkWithLoader>
      </li>
    ))}
  </ul>
)
