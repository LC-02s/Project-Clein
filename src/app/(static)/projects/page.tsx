import { type Metadata } from 'next'

import { ProjectEntity } from '@/database/projects'
import { ProjectList } from '@/widgets/project-list'
import { type ProjectId, type ProjectData } from '@/entities/project'
import { Icon } from '@/shared/ui'

export const metadata: Metadata = {
  title: 'Projects',
}

const TARGET_PROJECTS: ProjectId[] = [
  'it-moji',
  'portfolio-site',
  'eung-cham-jal',
  'attraction',
  'pbl-notes',
  'synergy-meet-2024',
]

const ProjectsMainPage: React.FC = () => (
  <div className="wrapper-xl py-screen relative z-0" style={{ paddingBottom: '32vh' }}>
    <h2 className="relative mb-12 flex items-center justify-center whitespace-nowrap p-4 text-center text-2xl font-bold md:text-3xl">
      <Icon.RocketEmoji className="mr-3 mt-1 text-xl md:text-2xl" />
      Projects&nbsp;
      <span style={{ fontSize: '0.9em' }}>({TARGET_PROJECTS.length})</span>
    </h2>
    <ProjectList
      contents={TARGET_PROJECTS.map<[ProjectId, ProjectData]>((id) => [
        id,
        ProjectEntity.findById(id),
      ])}
    />
  </div>
)

export default ProjectsMainPage
