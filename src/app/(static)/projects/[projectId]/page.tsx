import { type Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { ProjectEntity } from '@/database/projects'
import { ContentBody } from '@/widgets/content'
import { getPostList, POST_LIST_PARAMS } from '@/entities/post'
import { type ProjectId, PROJECT_TYPE_LABEL } from '@/entities/project'
import { getMarkdownContent } from '@/shared/api'
import { BLOG_PATH, THUMBNAIL_SIZE } from '@/shared/config'
import { extractImageType } from '@/shared/lib'

interface ProjectDetailParams {
  projectId: ProjectId
}

interface ProjectDetailPageProps {
  params: Promise<ProjectDetailParams>
}

export const generateStaticParams = () =>
  ProjectEntity.getKeys().map<ProjectDetailParams>((key) => ({ projectId: key }))

export const generateMetadata = async ({ params }: ProjectDetailPageProps): Promise<Metadata> => {
  const { projectId } = await params
  const project = ProjectEntity.findById(projectId)

  if (!project) {
    return {}
  }

  return {
    title: `${project.name} 프로젝트 소개`,
    openGraph: {
      images: {
        url: project.thumbnail.src,
        alt: project.thumbnail.alt,
        type: extractImageType(project.thumbnail.src),
        ...THUMBNAIL_SIZE,
      },
    },
  }
}

const ProjectDetailPage: React.FC<ProjectDetailPageProps> = async ({ params }) => {
  const { projectId } = await params
  const project = ProjectEntity.findById(projectId)

  if (!project) {
    notFound()
  }

  const [data, content] = await Promise.all([
    getPostList({ [POST_LIST_PARAMS.KEYWORD]: projectId }).catch(() => null),
    getMarkdownContent(`/projects/${projectId}`).catch(() => ''),
  ])

  const { name, description, period, githubURL, serviceURL, iconURL } = project
  const type = PROJECT_TYPE_LABEL[project.type]

  const posts = !data
    ? '&#128591;&#127995; 관련 포스트를 불러오지 못했어요 ㅠ &#128591;&#127995;'
    : data.contents.length <= 0 || data.keywords.current !== projectId
      ? '관련 포스트가 없어요'
      : data.contents.reduce((text, { id, title }) => {
          return (text += `<li><a href="${BLOG_PATH}/${id}">${title}</a></li>`)
        }, '<ul>') + '</ul>'

  const { src, alt } = project.thumbnail
  const { width, height } = THUMBNAIL_SIZE
  const thumbnail = `<img src="${src}" alt="${alt}" width="${width}" height="${height}" />`

  return (
    <article id="project-introduce" className="wrapper-xl py-screen">
      <h2 className="relative mb-12 flex items-center justify-center whitespace-nowrap p-4 pr-8 text-center text-2xl font-bold md:text-3xl">
        <Image
          src={iconURL}
          alt={`${name} 프로젝트 아이콘`}
          width={36}
          height={36}
          className="mr-3 size-7 drop-shadow md:size-9"
          priority
        />
        {name}
      </h2>
      <ContentBody
        content={content}
        mapper={{ name, description, type, period, githubURL, serviceURL, posts, thumbnail }}
        className="pt-0"
      />
    </article>
  )
}

export default ProjectDetailPage
