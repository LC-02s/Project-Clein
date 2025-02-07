import { cn } from '@/shared/lib'
import { LinkWithLoader, buttonVariants } from '@/shared/ui'

export interface KeywordLinkProps {
  href: string
  label: string
  active: boolean
  name: string
  length: number
}

export const BadgeLink: React.FC<KeywordLinkProps> = ({ href, label, name, length, active }) => (
  <LinkWithLoader
    href={href}
    title={`${label}별 보기: ${name}`}
    className={buttonVariants({ color: active ? 'info' : undefined, size: 'sm' })}
  >
    <strong className={active ? 'font-bold' : 'font-medium'}>{name}</strong>
    <span className="ml-1 font-normal text-gray-500 dark:text-gray-400">{length}</span>
  </LinkWithLoader>
)

export const BarLink: React.FC<KeywordLinkProps> = ({ href, label, name, length, active }) => (
  <LinkWithLoader
    href={href}
    title={`${label}별 보기: ${name}`}
    className={cn(
      buttonVariants({ color: active ? 'info' : undefined }),
      'h-10 justify-between md:h-12',
    )}
  >
    <strong
      className={cn(
        'w-[calc(100%-2rem)] truncate text-sm md:text-base',
        active ? 'font-bold' : 'font-medium',
      )}
    >
      {name}
    </strong>
    <span className="ml-1 text-sm font-normal text-gray-500 dark:text-gray-400">{length}</span>
  </LinkWithLoader>
)
