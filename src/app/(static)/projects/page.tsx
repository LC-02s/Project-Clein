import type { Metadata } from 'next'
import { ProjectRepository } from '@/database/projects'
import { ProjectList } from '@/widgets/project-list'
import type { ProjectId, ProjectData } from '@/entities/project'
import { Icon } from '@/shared/ui'

export const metadata: Metadata = {
  title: 'Projects',
}

const TARGET_PROJECTS: ProjectId[] = [
  // 'it-moji',
  'eung-cham-jal',
  'attraction',
  'portfolio-site',
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
        ProjectRepository.findById(id),
      ])}
    />
  </div>
)

export default ProjectsMainPage
