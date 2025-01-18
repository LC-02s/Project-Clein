import { DevProjectRepository } from '@/database/projects'
import type { PostId, PostRawData } from '@/entities/post'
import type { RepositoryId, RepositoryData, RepositorySchema } from '@/shared/lib'
import { Repository } from '@/shared/lib'

export const PostRepository = new Repository<PostId, PostRawData>({
  '2024-07-10': {
    title: 'Next.js에서의 안전한 로그인 구현 여정 (without NextAuth)',
    description:
      '어트랙션 서비스를 개발하면서 고민했었던 보안을 고려한 로그인 구현 과정에 대한 글이에요',
    thumbnail: { src: '/attraction-default.jpg', alt: '어트랙션 - 나만의 뉴스레터 관리 서비스' },
    createdAt: '2024-07-10 17:04',
    updatedAt: '2024-12-16 13:02',
    keywords: ['next', 'ssr', 'auth', 'fe', 'attraction'],
    externalTags: ['Next.js 구글 로그인', 'Next.js api route', 'Next.js cookies', 'Next.js 세션'],
  },
  '2024-11-16': {
    title: '간단한 리액트 SSG 빌드 파이프라인 구축하기 (with Vite, Emotion)',
    description:
      'Synergy Meet 2024 프로젝트를 진행하며 구축했던 Vite의 SSR 예제를 활용한 SSG 빌드 파이프라인에 대한 글이에요',
    thumbnail: { src: '/synergy-meet-default.jpg', alt: 'Synergy Meet 2024' },
    createdAt: '2024-11-16 22:12',
    updatedAt: '2024-12-30 19:58',
    keywords: ['react', 'vite', 'ssr', 'ssg', 'express', 'fe', 'synergy-meet-2024'],
    externalTags: ['Vite SSR', 'Vite SSG', 'Emotion SSR', 'Emotion SSG'],
  },
} as const)

export const TagRepository = new Repository({
  react: 'React',
  next: 'Next.js',
  ts: 'TypeScript',
  js: 'JavaScript',
  rq: 'Tanstack Query',
  e2e: 'E2E 테스트',
  vite: 'Vite',
  ssr: 'SSR',
  ssg: 'SSG',
  trouble: '트러블 슈팅',
  refactor: '리팩토링',
  ds: '디자인 시스템',
  pattern: '디자인 패턴',
  fsd: 'FSD 아키텍처',
  nest: 'Nest.js',
  express: 'Express.js',
  mongo: 'MongoDB',
  redis: 'Redis',
  auth: '인증/인가',
  deploy: '배포',
  fe: '프론트엔드',
  be: '백엔드',
  native: '네이티브',
  review: '회고',
} as const)

export const SeriesRepository = new Repository({
  service: '서비스 운영 여정',
} as const)

export const KeywordRepository = new Repository({
  // tags
  ...(TagRepository.getEntries().reduce((repo, [id, name]) => {
    return Object.assign(repo, { [id]: name })
  }, {}) as RepositorySchema<typeof TagRepository>),

  // series
  ...(SeriesRepository.getEntries().reduce((repo, [id, name]) => {
    return Object.assign(repo, { [id]: name })
  }, {}) as RepositorySchema<typeof SeriesRepository>),

  // projects
  ...(DevProjectRepository.getEntries().reduce((repo, [id, { name }]) => {
    return Object.assign(repo, { [id]: name })
  }, {}) as Record<
    RepositoryId<typeof DevProjectRepository>,
    RepositoryData<typeof DevProjectRepository>['name']
  >),
} as const)
