import type { PostId, PostData } from '@/entities/post'
import { Repository, getThumbnailData } from '@/shared/lib'
import { ProjectRepository } from './projects'

export const PostRepository = new Repository<PostId, PostData>({
  '2025-02-24': {
    title: '다형성 개념으로 공용 컴포넌트 재사용성 극대화하기',
    description:
      '포트폴리오 사이트에서 사용하는 디자인 컴포넌트에 다형성 개념을 도입한 과정에 대한 글이에요',
    thumbnail: getThumbnailData('Polymorphic'),
    createdAt: '2025-02-24 10:26',
    updatedAt: '2025-02-26 21:23',
    keywords: ['react', 'ts', 'ds', 'refactor', 'fe', 'portfolio-site'],
    externalTags: ['Polymorphic Component', '다형성 컴포넌트', 'Mantine'],
  },
  '2025-02-18': {
    title: 'Scroll Parallax UI 프레임 드랍 이슈 개선하기',
    description:
      'Framer Motion을 활용하여 Scroll Parallax UI를 구현하다 만난 브라우저 성능 이슈를 개선하는 과정에 대한 글이에요',
    thumbnail: getThumbnailData('Scroll Parallax UI'),
    createdAt: '2025-02-18 15:16',
    updatedAt: '2025-02-18 15:16',
    keywords: ['react', 'trouble', 'fe', 'portfolio-site'],
    isWriting: true,
  },
  '2025-01-15': {
    title: '어트랙션 서비스 운영 실패 회고',
    description:
      '뉴스레터 통합 관리 서비스 어트랙션을 구축 및 운영하며 저질렀던 기술적인 실수들을 되돌아보는 글이에요',
    thumbnail: {
      src: '/images/thumbnail/attraction-dropped.jpg',
      alt: '어트랙션 - 나만의 뉴스레터 관리 서비스 (DROPPED)',
    },
    createdAt: '2025-01-15 22:23',
    updatedAt: '2025-01-27 13:06',
    keywords: ['review', 'fe', 'service', 'attraction'],
    isWriting: true,
  },
  '2024-12-31': {
    title: '난 1년 동안 얼마나 성장했을까? (2024년 회고)',
    description:
      '처음 프론트엔드 개발자가 되기로 결심한 2024년을 회고하며 다가올 2025년에 대한 계획을 세워보는 글이에요',
    thumbnail: getThumbnailData('2024년 회고'),
    createdAt: '2024-12-31 21:46',
    updatedAt: '2025-01-12 00:10',
    keywords: ['review'],
    isWriting: true,
  },
  '2024-12-20': {
    title: '레거시 리액트 프로젝트 FSD 아키텍처로 재구성하기',
    description:
      'PBL Notes 프로젝트를 리팩토링하면서 FSD 아키텍처를 적용한 과정과 그에 따른 고민에 대한 글이에요',
    thumbnail: ProjectRepository.findById('pbl-notes').thumbnail,
    createdAt: '2024-12-20 14:23',
    updatedAt: '2024-12-20 14:23',
    keywords: ['react', 'fsd', 'refactor', 'fe', 'pbl-notes'],
    isWriting: true,
  },
  '2024-12-18': {
    title: '새로고침할 때 깜빡이지 않는 완성형 다크 모드 구현하기',
    description:
      '여러 프로젝트에서 다크 모드를 구현하며 고민했었던 각 상황에 맞는 완성형 다크 모드 기능 구현 과정에 대한 글이에요',
    thumbnail: { src: '/images/thumbnail/dark-mode.jpg', alt: '다크 모드 사용하다 눈뽕 맞는 짤' },
    createdAt: '2024-12-18 16:52',
    updatedAt: '2025-01-12 11:24',
    keywords: ['next', 'react', 'ssr', 'ds', 'fe', 'portfolio-site'],
    externalTags: ['리액트 다크 모드', 'Next.js 다크 모드', '다크 모드'],
  },
  '2024-11-16': {
    title: '간단한 리액트 SSG 빌드 파이프라인 구축하기 (with Vite, Emotion)',
    description:
      'Synergy Meet 2024 프로젝트를 진행하며 구축했던 Vite의 SSR 예제를 활용한 SSG 빌드 파이프라인에 대한 글이에요',
    thumbnail: ProjectRepository.findById('synergy-meet-2024').thumbnail,
    createdAt: '2024-11-16 22:12',
    updatedAt: '2024-12-30 19:58',
    keywords: ['react', 'ssr', 'ssg', 'fe', 'synergy-meet-2024'],
    externalTags: ['Vite SSR', 'Vite SSG', 'Emotion SSR', 'Emotion SSG'],
  },
  '2024-07-10': {
    title: 'Next.js에서의 안전한 로그인 구현 여정 (without NextAuth)',
    description:
      '어트랙션 서비스를 개발하면서 고민했었던 보안을 고려한 로그인 구현 과정에 대한 글이에요',
    thumbnail: ProjectRepository.findById('attraction').thumbnail,
    createdAt: '2024-07-10 17:04',
    updatedAt: '2024-12-16 13:02',
    keywords: ['next', 'ssr', 'auth', 'fe', 'attraction'],
    externalTags: ['Next.js 구글 로그인', 'Next.js api route', 'Next.js cookies', 'Next.js 세션'],
  },
} as const)
