import Image from 'next/image'
import type { Metadata } from 'next'
import { ProjectRepository } from '@/database/projects'
import { ProjectList } from '@/widgets/project-list'
import { BackgroundGrid, Icon } from '@/shared/ui'

export const metadata: Metadata = {
  title: 'Project',
}

const ProjectMainPage: React.FC = () => {
  const Projects = ProjectRepository.getEntries()

  return (
    <>
      <BackgroundGrid position="top" className="h-96">
        <Image
          src="/images/retro-futuristic-3d-mesh-circle.png"
          alt="구 형태 3D 메쉬 오브젝트"
          className="pointer-events-none absolute left-[-12%] top-[-16%] max-w-60 select-none max-md:w-1/2 md:max-w-full xl:left-0 xl:top-[-36%] 2xl:left-[2%]"
          width={360}
          height={360}
          quality={100}
          priority
        />
        <Image
          src="/images/retro-futuristic-3d-mesh-multiple.png"
          alt="곱하기 기호 형태 3D 메쉬 오브젝트"
          className="pointer-events-none absolute right-[-4%] top-[32%] max-w-40 select-none max-md:w-1/3 md:right-[2%] md:top-[24%] md:max-w-full xl:top-[36%]"
          width={200}
          height={108}
          quality={100}
          priority
        />
      </BackgroundGrid>

      <div className="wrapper-xl py-screen relative z-0" style={{ paddingBottom: '32vh' }}>
        <h2 className="relative mb-12 flex items-center justify-center whitespace-nowrap p-4 text-center text-2xl font-bold md:text-3xl">
          <Icon.RocketEmoji className="mr-3 mt-1 text-xl md:text-2xl" />
          Projects&nbsp;
          <span style={{ fontSize: '0.9em' }}>({Projects.length})</span>
        </h2>
        <ProjectList contents={Projects} />
      </div>

      <BackgroundGrid />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[-1] h-full overflow-hidden">
        <Image
          src="/images/retro-futuristic-3d-mesh-wave.png"
          alt="파동 형태 3D 메쉬 오브젝트"
          className="pointer-events-none absolute -bottom-8 right-4 w-[45rem] min-w-96 max-w-[120vw] select-none"
          style={{ opacity: 0.6 }}
          width={720}
          height={540}
          quality={100}
          priority
        />
      </div>
    </>
  )
}

export default ProjectMainPage
