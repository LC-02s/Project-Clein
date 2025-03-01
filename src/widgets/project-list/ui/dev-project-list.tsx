'use client'

import { motion } from 'motion/react'
import type { ProjectId, ProjectData } from '@/entities/project'
import { PROJECT_TYPE_LABEL } from '@/entities/project'
import { PROJECT_PATH } from '@/shared/config'
import { type PropsWithClassName, cn } from '@/shared/lib'
import {
  LinkWithLoader,
  Icon,
  Badge,
  Container,
  Button,
  ExternalLink,
  ThumbnailImage,
} from '@/shared/ui'

interface ProjectListProps extends PropsWithClassName {
  contents: [ProjectId, ProjectData][]
}

export const ProjectList: React.FC<ProjectListProps> = ({ contents, className }) => (
  <ul className={cn('grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3', className)}>
    {contents.map(([id, data], idx) => (
      <motion.li
        key={id}
        initial={{ opacity: 0, y: '12%' }}
        animate={{ opacity: 1, y: '0%' }}
        transition={{ delay: 0.1 * idx }}
      >
        <Container
          layer="middle"
          round="md"
          title={`프로젝트 소개 바로가기: ${data.name}`}
          className="group flex flex-col items-stretch border bg-white p-3 hover:cursor-pointer"
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
          <h3 className="mb-1 px-0.5 font-bold md:text-lg">
            <LinkWithLoader
              href={`${PROJECT_PATH}/${id}`}
              title={`프로젝트 소개 바로가기: ${data.name}`}
              className="block truncate"
            >
              {data.name}
            </LinkWithLoader>
          </h3>
          <p className="mb-3 break-keep px-0.5 text-sm text-gray-500 md:text-base dark:text-gray-400">
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
            <Button
              href={data.githubURL}
              title={`${data.name} 깃허브`}
              variant="light"
              round="xs"
              className="flex-1"
              component={ExternalLink}
            >
              <Icon.GithubLogo className="pointer-events-none mr-3 text-xl" />
              GitHub 바로가기
              <Icon.NewTabOutline className="pointer-events-none ml-auto text-sm text-gray-500 dark:text-gray-400" />
            </Button>
            {!data.isDropped ? (
              <Button
                href={data.serviceURL}
                title={data.name}
                variant="light"
                round="xs"
                className="flex-1"
                component={ExternalLink}
              >
                <Icon.LaptopEmoji className="pointer-events-none mb-1 mr-3 text-xl" />
                사이트 구경하기
                <Icon.NewTabOutline className="pointer-events-none ml-auto text-sm text-gray-500 dark:text-gray-400" />
              </Button>
            ) : (
              <Button variant="light" round="xs" className="w-full flex-1" disabled>
                <Icon.LaptopEmoji className="mb-1 mr-3 text-xl grayscale" />
                서비스 종료됨
                <Icon.NewTabOutline className="ml-auto text-sm text-gray-400 dark:text-gray-500" />
              </Button>
            )}
          </div>
        </Container>
      </motion.li>
    ))}
  </ul>
)
