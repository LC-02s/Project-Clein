'use client'

import { LinkWithLoader } from '@/features/loader'
import type { ProjectId, ProjectData } from '@/entities/project'
import { PROJECT_TYPE_LABEL } from '@/entities/project'
import { PROJECT_PATH } from '@/shared/config'
import { type PropsWithClassName, cn } from '@/shared/lib'
import {
  Icon,
  Badge,
  Container,
  containerVariants,
  Button,
  buttonVariants,
  ExternalLink,
  ThumbnailImage,
} from '@/shared/ui'

interface ProjectListProps extends PropsWithClassName {
  contents: [ProjectId, ProjectData][]
}

export const ProjectList: React.FC<ProjectListProps> = ({ contents, className }) => (
  <ul className={cn('grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3', className)}>
    {contents.map(([id, data]) => (
      <li key={id}>
        <div
          title={`프로젝트 소개 바로가기: ${data.name}`}
          className={cn(
            containerVariants({ layer: 'middle', round: 'md' }),
            'group flex flex-col items-stretch border bg-white p-3 hover:cursor-pointer',
          )}
          onClick={(e) => {
            if (!((e.target as HTMLElement | null)?.tagName === 'A'))
              e.currentTarget.querySelector('a')?.click()
          }}
          role="presentation"
        >
          <Container variant="image" round="xs" className="mb-3 aspect-thumbnail">
            <ThumbnailImage
              {...data.thumbnail}
              className="transition-transform group-hover:scale-105"
            />
          </Container>
          <h3 className="mb-1 px-0.5 text-lg font-bold">
            <LinkWithLoader
              href={`${PROJECT_PATH}/${id}`}
              title={`프로젝트 소개 바로가기: ${data.name}`}
              className="block truncate"
            >
              {data.name}
            </LinkWithLoader>
          </h3>
          <p className="mb-3 break-keep px-0.5 text-zinc-500 dark:text-zinc-400">
            {data.description}
          </p>
          <p className="flex flex-wrap items-center gap-2">
            <Badge round="xs">
              <Icon.CalendarMarkOutline className="mr-2" />
              <span className="pr-0.5">{data.period}</span>
            </Badge>
            <Badge round="xs">{PROJECT_TYPE_LABEL[data.type]}</Badge>
          </p>
          <div className="mt-5 space-y-2">
            <ExternalLink
              href={data.githubURL}
              title={`${data.name} 깃허브`}
              className={cn(buttonVariants({ variant: 'light', round: 'xs' }), 'flex-1')}
            >
              <Icon.GithubLogo className="pointer-events-none mr-3 text-xl" />
              GitHub 바로가기
              <Icon.NewTabOutline className="pointer-events-none ml-auto text-sm text-zinc-500 dark:text-zinc-400" />
            </ExternalLink>
            {!data.isDropped ? (
              <ExternalLink
                href={data.serviceURL}
                title={data.name}
                className={cn(buttonVariants({ variant: 'light', round: 'xs' }), 'flex-1')}
              >
                <Icon.LaptopEmoji className="pointer-events-none mb-1 mr-3 text-xl" />
                사이트 구경하기
                <Icon.NewTabOutline className="pointer-events-none ml-auto text-sm text-zinc-500 dark:text-zinc-400" />
              </ExternalLink>
            ) : (
              <Button variant="light" round="xs" className="w-full flex-1" disabled>
                <Icon.LaptopEmoji className="mb-1 mr-3 text-xl grayscale" />
                서비스 종료됨
                <Icon.NewTabOutline className="ml-auto text-sm text-zinc-400 dark:text-zinc-500" />
              </Button>
            )}
          </div>
        </div>
      </li>
    ))}
  </ul>
)
