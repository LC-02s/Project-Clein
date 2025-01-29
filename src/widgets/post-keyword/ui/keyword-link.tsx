import { LinkWithLoader } from '@/features/loader'
import { cn } from '@/shared/lib'
import { buttonVariants } from '@/shared/ui'

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
    className={cn(
      buttonVariants({ color: active ? 'info' : undefined, size: 'xs' }),
      'xs:h-9 xs:px-3',
    )}
  >
    <strong className={active ? 'font-bold' : 'font-medium'}>{name}</strong>
    <span className="ml-1 text-zinc-500 dark:text-zinc-400">{length}</span>
  </LinkWithLoader>
)

export const BarLink: React.FC<KeywordLinkProps> = ({ href, label, name, length, active }) => (
  <LinkWithLoader
    href={href}
    title={`${label}별 보기: ${name}`}
    className={cn(
      buttonVariants({ color: active ? 'info' : undefined }),
      'justify-between xs:h-12',
    )}
  >
    <strong className={cn('w-[calc(100%-2rem)] truncate', active ? 'font-bold' : 'font-medium')}>
      {name}
    </strong>
    <span className="ml-1 text-sm text-zinc-500 xs:text-base dark:text-zinc-400">{length}</span>
  </LinkWithLoader>
)
