import { type EntityId, type EntitySchema, Entity } from '@/shared/lib'

import { ProjectEntity } from './projects'

export const SeriesEntity = new Entity({
  service: '서비스 운영 여정',
} as const)

export const KeywordEntity = new Entity({
  // tags
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

  // series
  ...(SeriesEntity.getEntries().reduce((repo, [id, name]) => {
    return Object.assign(repo, { [id]: name })
  }, {}) as EntitySchema<typeof SeriesEntity>),

  // projects
  ...(ProjectEntity.getEntries().reduce((repo, [id, { name }]) => {
    return Object.assign(repo, { [id]: name })
  }, {}) as Record<EntityId<typeof ProjectEntity>, string>),
} as const)
