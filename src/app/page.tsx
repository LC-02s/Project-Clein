'use client'

import { motion } from 'motion/react'
import Image from 'next/image'

import { CONTENT_ID } from '@/widgets/skip-content'
import { MAIN_TITLE, NICKNAME_KR, USER_GITHUB_ADDRESS } from '@/shared/config'
import {
  BackgroundGrid,
  Container,
  Icon,
  TechStack,
  ParallaxText,
  Button,
  ExternalLink,
} from '@/shared/ui'

const MainPage: React.FC = () => (
  <main id={CONTENT_ID} className="relative flex-1 pb-48">
    <BackgroundGrid position="top" />
    <section id="introduce" className="wrapper-xl relative pb-8 pt-32">
      <h2 className="mb-8 whitespace-nowrap break-keep text-center text-2xl font-black !leading-snug sm:text-3xl md:mb-10 md:text-5xl">
        WEB Developer <br />
        <span className="bg-gradient-to-tl from-blue-500 to-violet-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-violet-400">
          {MAIN_TITLE}
        </span>
        &nbsp;Site
      </h2>
      <p className="break-keep text-center !leading-relaxed text-gray-500 md:text-xl dark:text-gray-400">
        안녕하세요, 모든 사용자에게 동일한 경험을 선사하고 싶은 웹 프론트엔드 개발자 겸 디자이너
        이찬({NICKNAME_KR})입니다. <br className="hidden lg:block" />
        저는 유저에게 UI를 통해 브랜드의 가치를 전달하는 것과 UX를 코드 레벨에서 개선하는 것에
        관심이 많으며, <br className="hidden lg:block" />
        유지 가능한 코드를 작성하는 것을 중요하게 생각하여 항상 실천하고 있습니다.
      </p>
      <div className="my-16 flex items-center justify-center">
        <Button
          href={USER_GITHUB_ADDRESS}
          title={`${NICKNAME_KR} 깃허브`}
          variant="filled"
          size="lg"
          component={ExternalLink}
        >
          <Icon.GithubLogo className="mr-3 text-xl" />
          <span className="mr-7">GitHub 바로가기</span>
          <Icon.NewTabOutline className="text-sm text-gray-300 md:text-base dark:text-gray-600" />
        </Button>
      </div>
      <ul className="flex flex-col flex-wrap items-stretch gap-4 py-16 sm:flex-row">
        {[
          {
            icon: Icon.ThinkingFaceEmoji,
            title: 'Why',
            content:
              '소비자이자 생산자의 입장에서 밀접한 커뮤니케이션을 통해 대상의 문제를 분석하고 IT 기술을 활용하여 도출한 문제를 해결하는 것에서 일의 보람을 느낍니다.',
          },
          {
            icon: Icon.LaptopEmoji,
            title: 'How',
            content:
              '자바스크립트 생태계를 기반한 기술들로 빠르게 프로토타입을 구축하여 아이디어 검증을 거친 후 피드백을 통해 제품을 지속적으로 개선해나가는 방식을 선호합니다.',
          },
          {
            icon: Icon.LightBulbEmoji,
            title: 'Vision',
            content:
              '현재는 웹 프론트엔드 분야 위주로 전문성을 기르고 있지만 점차 기획, 디자인, 개발 등의 직군을 가리지 않고 온전히 제품에 집중하는 메이커로 성장하기 위해 노력하고 있습니다.',
          },
        ].map(({ icon: IconComponent, title, content }, idx) => (
          <Container
            key={title}
            layer="middle"
            round="md"
            className="flex-1 border p-4 pb-5 sm:min-w-80"
            initial={{ y: '24%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * idx }}
            component={motion.li}
          >
            <Container
              round="sm"
              className="mb-6 flex size-12 items-center justify-center border dark:bg-gray-700"
            >
              <IconComponent className="size-5" />
            </Container>
            <h3 className="mb-2 text-lg font-bold">{title}</h3>
            <p className="break-keep text-gray-600 dark:text-gray-300">{content}</p>
          </Container>
        ))}
      </ul>
    </section>
    <section id="tech-stack" className="px-4 md:px-8">
      <div className="relative space-y-3 py-12 before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-12 before:bg-gradient-to-r before:from-white before:to-transparent after:absolute after:inset-y-0 after:right-0 after:z-10 after:w-12 after:bg-gradient-to-l after:from-white after:to-transparent dark:before:from-gray-900 dark:after:from-gray-900">
        <ParallaxText baseVelocity={2}>
          <TechStack name="HTML" icon={Icon.HTMLLogo} />
          <TechStack name="CSS" icon={Icon.CSSLogo} />
          <TechStack name="JavaScript" icon={Icon.JavaScriptLogo} />
          <TechStack name="TypeScript" icon={Icon.TypeScriptLogo} />
          <TechStack name="React" icon={Icon.ReactLogo} />
          <TechStack name="Next.js" icon={Icon.NextJSLogo} />
          <TechStack
            name="Tanstack Query"
            icon={<Image src="/images/tanstack-logo.png" alt="Tanstack Query 로고" fill />}
          />
          <TechStack
            name="Zustand"
            icon={<Image src="/images/zustand-logo.png" alt="Zustand 로고" fill />}
          />
          <TechStack name="React Router" icon={Icon.ReactRouterLogo} />
          <TechStack name="Vite" icon={Icon.ViteLogo} />
        </ParallaxText>
        <ParallaxText baseVelocity={-2}>
          <TechStack name="Vitest" icon={Icon.VitestLogo} />
          <TechStack name="Playwright" icon={Icon.PlaywrightLogo} />
          <TechStack name="StoryBook" icon={Icon.StoryBookLogo} />
          <TechStack name="MSW" icon={Icon.MSWLogo} />
          <TechStack name="Zod" icon={Icon.ZodLogo} />
          <TechStack name="Framer Motion" icon={Icon.FramerMotionLogo} />
          <TechStack name="TailWindCSS" icon={Icon.TailWindCSSLogo} />
          <TechStack name="Mantine" icon={Icon.MantineLogo} />
          <TechStack name="Figma" icon={Icon.FigmaLogo} />
          <TechStack name="Notion" icon={Icon.NotionLogo} />
        </ParallaxText>
        <ParallaxText baseVelocity={2}>
          <TechStack name="Discord" icon={Icon.DiscordLogo} />
          <TechStack name="GitHub" icon={Icon.GithubLogo} />
          <TechStack name="GitHub Actions" icon={Icon.GitHubActionsLogo} />
          <TechStack name="Node.js" icon={Icon.NodeJSLogo} />
          <TechStack name="PostgreSQL" icon={Icon.PostgreSQLLogo} />
          <TechStack name="Prisma" icon={Icon.PrismaLogo} />
          <TechStack name="supabase" icon={Icon.SupabaseLogo} />
          <TechStack name="turbo repo" icon={Icon.TurboRepoLogo} />
          <TechStack name="docker" icon={Icon.DockerLogo} />
          <TechStack name="AWS Amplify" icon={Icon.AWSAmplifyLogo} />
        </ParallaxText>
      </div>
      <p className="wrapper-xl mt-4 break-keep text-center text-sm text-gray-500 md:text-base dark:text-gray-400">
        주로 위의 기술들을 사용합니다. 😄
      </p>
    </section>
  </main>
)

export default MainPage
