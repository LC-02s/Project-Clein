import { USER_GITHUB_ADDRESS } from '@/shared/config'
import { PROJECT_TYPE } from '../../config'
import type { ProjectData } from '../../model'

export const createProjectData = (data: Omit<ProjectData, 'type'>): ProjectData =>
  Object.assign(data, {
    type: data.githubURL.startsWith(USER_GITHUB_ADDRESS)
      ? PROJECT_TYPE.PERSONAL
      : PROJECT_TYPE.TEAM,
  })
