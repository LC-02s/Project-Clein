import { createProjectData } from '@/entities/project'
import { MAIN_TITLE, GITHUB, USER_GITHUB_ADDRESS } from '@/shared/config'
import { getThumbnailData, Repository } from '@/shared/lib'

export const ProjectRepository = new Repository({
  'it-moji': createProjectData({
    name: 'IT-MOJI',
    description: 'IT인들끼리 MO여 JI식을 나누는 모임 관리 서비스',
    period: '2025.01 ~ 운영 중',
    thumbnail: getThumbnailData('임시 썸네일이에요 🙏'),
    githubURL: 'https://github.com/it-moji/it-moji-client',
    serviceURL: 'https://it-moji.com/',
    iconURL: '/blob/dev/src/app/icon.png?raw=true',
  }),
  'portfolio-site': createProjectData({
    name: MAIN_TITLE,
    description: 'Next.js 기반 개인 포트폴리오 사이트',
    period: '2024.12 ~ 운영 중',
    thumbnail: { src: '/images/og-image-main.jpg', alt: MAIN_TITLE },
    githubURL: `${USER_GITHUB_ADDRESS}/${GITHUB.REPO.NAME}`,
    serviceURL: process.env.NEXT_PUBLIC_DOMAIN_ADDRESS!,
    iconURL: '/blob/main/src/app/icon.png?raw=true',
  }),
  attraction: createProjectData({
    name: 'Attraction',
    description: 'Gmail 기반 뉴스레터 통합 관리 서비스',
    period: '2024.04 ~ 2025.01',
    thumbnail: {
      src: '/docs/projects/attraction/images/intro-default.jpg',
      alt: 'Attraction - 나만의 뉴스레터 관리 서비스',
    },
    githubURL: 'https://github.com/Atractorrr/Attraction-FE',
    serviceURL: 'https://attraction.run/',
    iconURL: '/blob/main/apps/service/src/app/icon.png?raw=true',
    isDropped: true,
  }),
  'pbl-notes': createProjectData({
    name: 'PBL Notes',
    description: 'macOS 기반 애플 메모 앱 SPA 마이그레이션',
    period: '2024.02 ~ 유지보수 중',
    thumbnail: { src: '/docs/projects/pbl-notes/images/intro.jpg', alt: 'PBL Notes' },
    githubURL: `${USER_GITHUB_ADDRESS}/PBL-Notes`,
    serviceURL: 'https://pbl-notes.netlify.app/',
    iconURL: '/blob/main/public/img/logo512.png?raw=true',
  }),
  'eung-cham-jal': createProjectData({
    name: '응원 참 잘하는 집',
    description: '21세기 디지털 부적 발행 및 공유 서비스',
    period: '2024.12 ~ 유지보수 중',
    thumbnail: { src: '/docs/projects/eung-cham-jal/images/intro.png', alt: '응원 참 잘하는 집' },
    githubURL: 'https://github.com/ooh-eung-wan/eung-cham-jal',
    serviceURL: 'https://eung-cham-jal.vercel.app/',
    iconURL: '/blob/main/src/app/favicon.ico?raw=true',
  }),
  'synergy-meet-2024': createProjectData({
    name: 'Synergy Meet 2024',
    description: '취준생 대상 밋업 랜딩 페이지 인터랙티브 웹 템플릿',
    period: '2024.09 ~ 2024.11',
    thumbnail: {
      src: '/docs/projects/synergy-meet-2024/images/intro.jpg',
      alt: '2024 Synergy Meet',
    },
    githubURL: `${USER_GITHUB_ADDRESS}/Synergy-Meet-2024`,
    serviceURL: 'https://synergy-meet-2024.vercel.app/',
    iconURL: '/blob/main/public/img/synergy-logo-512.png?raw=true',
  }),
} as const)
