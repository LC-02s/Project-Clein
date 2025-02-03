import type { ProjectRepository } from '@/database/projects'
import type { ImageData, RepositoryId } from '@/shared/lib'
import type { PROJECT_TYPE } from '../config'

export type ProjectType = (typeof PROJECT_TYPE)[keyof typeof PROJECT_TYPE]

export type ProjectId = RepositoryId<typeof ProjectRepository>

export interface ProjectData {
  name: string
  description: string
  thumbnail: ImageData
  type: ProjectType
  period: string
  githubURL: string
  serviceURL: string
  isDropped?: boolean
}

export interface SearchProjectItem extends Pick<ProjectData, 'name'> {
  id: ProjectId
}
