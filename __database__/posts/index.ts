import type { PostId, PostRawData } from '@/entities/post'
import { Repository } from '@/shared/lib'

export const PostRepository = new Repository<PostId, PostRawData>({
  '2024-07-10': {
    title: 'Next.js에서 안전한 로그인 구현 여정 (without NextAuth)',
    description:
      '어트랙션 서비스를 개발하면서 고민했었던 보안을 고려한 로그인 구현 과정에 대한 글이에요',
    thumbnail: { src: '/attraction-default.jpg', alt: '어트랙션 - 나만의 뉴스레터 관리 서비스' },
    createdAt: '2024-07-10 17:04',
    updatedAt: '2024-12-16 13:02',
    keywords: ['next', 'react', 'ts', 'ssr', 'auth', 'stm', 'fe', 'p-atr', 's-atr'],
    externalTags: ['Next.js 구글 로그인', 'Next.js api route', 'Next.js cookies', 'Next.js 세션'],
  },
  '2024-11-16': {
    title: '리액트 기반 랜딩 페이지에 간단한 SSG 빌드 파이프라인 구축하기 (with Vite, Emotion)',
    description:
      'Synergy Meet 2024 프로젝트를 진행하며 구축했던 Vite의 SSR 예제를 활용한 간단한 SSG 빌드 파이프라인에 대한 글이에요',
    thumbnail: { src: '/synergy-meet-default.jpg', alt: 'Synergy Meet 2024' },
    createdAt: '2024-11-16 22:12',
    updatedAt: '2024-12-30 19:58',
    keywords: ['react', 'ts', 'vite', 'ssr', 'ssg', 'deploy', 'fe', 'p-smt'],
    externalTags: ['Vite SSR', 'Vite SSG', 'Emotion SSR', 'Emotion SSG'],
  },
})

export const KeywordRepository = new Repository({
  // tags
  react: 'React',
  next: 'NextJS',
  ts: 'TypeScript',
  js: 'JavaScript',
  rq: 'Tanstack Query',
  e2e: 'E2E 테스트',
  vite: 'Vite',
  ssr: 'SSR',
  ssg: 'SSG',
  tbs: '트러블 슈팅',
  rft: '리팩토링',
  ds: '디자인 시스템',
  dp: '디자인 패턴',
  fsd: 'FSD 아키텍처',
  nest: 'NestJS',
  exp: 'ExpressJS',
  mdb: 'MongoDB',
  rds: 'Redis',
  stm: '상태 관리',
  auth: '인증/인가',
  deploy: '배포',
  fe: '프론트엔드',
  be: '백엔드',
  ntv: '네이티브',
  rmb: '회고',

  // projects
  'p-atr': 'Attraction',
  'p-pbl': 'PBL Notes',
  'p-smt': 'Synergy Meet 2024',
  'p-ecj': '응원 참 잘하는 집',
  'p-ptf': "Clein's Portfolio",

  // series
  's-atr': '어트랙션 서비스 개발 여정',
  's-pbl': 'PBL Notes 갈아엎기',
})
