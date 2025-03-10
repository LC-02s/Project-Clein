import Image from 'next/image'

import { BackgroundGrid } from '@/shared/ui'

const ProjectLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <>
    <BackgroundGrid position="top" className="h-96">
      <Image
        src="/images/retro-futuristic-3d-mesh-circle.png"
        alt="구 형태 3D 메쉬 오브젝트"
        className="pointer-events-none absolute left-[-12%] top-[-16%] max-w-60 select-none max-md:w-1/2 md:max-w-full xl:left-[-4%] xl:top-[-36%] 2xl:left-[2%]"
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
    {children}
    <BackgroundGrid />
  </>
)

/*
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
*/

export default ProjectLayout
