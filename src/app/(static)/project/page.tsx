import type { Metadata } from 'next'
import { ProjectRepository } from '@/database/projects'
import { ProjectList } from '@/widgets/project-list'
import { Icon } from '@/shared/ui'

export const metadata: Metadata = {
  title: 'Project',
}

const ProjectMainPage: React.FC = () => {
  const Projects = ProjectRepository.getEntries()

  return (
    <div className="wrapper-xl py-screen relative z-0" style={{ paddingBottom: '32vh' }}>
      <h2 className="relative mb-12 flex items-center justify-center whitespace-nowrap p-4 text-center text-2xl font-bold md:text-3xl">
        <Icon.RocketEmoji className="mr-3 mt-1 text-xl md:text-2xl" />
        Projects&nbsp;
        <span style={{ fontSize: '0.9em' }}>({Projects.length})</span>
      </h2>
      <ProjectList contents={Projects} />
    </div>
  )
}

export default ProjectMainPage
