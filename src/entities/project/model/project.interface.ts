import { type ProjectEntity } from '@/database/projects'
import { type ImageData, type EntityId } from '@/shared/lib'

import { type PROJECT_TYPE } from '../config'

export type ProjectType = (typeof PROJECT_TYPE)[keyof typeof PROJECT_TYPE]

export type ProjectId = EntityId<typeof ProjectEntity>

export interface ProjectData {
  name: string
  description: string
  thumbnail: ImageData
  type: ProjectType
  period: string
  githubURL: `https://github.com/${string}`
  serviceURL: string
  iconURL: string
}

export interface SearchProjectItem extends Pick<ProjectData, 'name'> {
  id: ProjectId
}
