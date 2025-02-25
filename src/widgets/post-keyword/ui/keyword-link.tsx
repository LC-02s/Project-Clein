import { cn } from '@/shared/lib'
import { LinkWithLoader, Button } from '@/shared/ui'

export interface KeywordLinkProps {
  href: string
  label: string
  active: boolean
  name: string
  length: number
}

export const BadgeLink: React.FC<KeywordLinkProps> = ({ href, label, name, length, active }) => (
  <Button
    href={href}
    title={`${label}별 보기: ${name}`}
    color={active ? 'info' : undefined}
    size="sm"
    component={LinkWithLoader}
  >
    <strong className={active ? 'font-bold' : 'font-medium'}>{name}</strong>
    <span className="ml-1 font-normal text-gray-500 dark:text-gray-400">{length}</span>
  </Button>
)

export const BarLink: React.FC<KeywordLinkProps> = ({ href, label, name, length, active }) => (
  <Button
    href={href}
    title={`${label}별 보기: ${name}`}
    color={active ? 'info' : undefined}
    className="h-10 justify-between md:h-12"
    component={LinkWithLoader}
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
  </Button>
)
