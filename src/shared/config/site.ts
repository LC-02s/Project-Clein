import type { ImageData } from '../lib'

export const NICKNAME = 'Clein' as const

export const NICKNAME_KR = '클라인' as const

export const MAIN_TITLE = `${NICKNAME}'s Portfolio` as const

export const MAIN_DESCRIPTION =
  `SI 퍼블리셔 출신 FE 개발자 ${NICKNAME_KR}의 포트폴리오 사이트` as const

export const MAIN_KEYWORDS = [
  '프론트엔드 개발자 포트폴리오',
  '개발자 포트폴리오',
  '포트폴리오 사이트',
  '프론트엔드 개발',
  '퍼블리셔 포트폴리오',
  `${NICKNAME_KR}의 포트폴리오`,
  `${NICKNAME_KR}의 포트폴리오 사이트`,
  NICKNAME_KR,
  NICKNAME,
  MAIN_TITLE,
  MAIN_DESCRIPTION,
] as const

export const MAIN_THUMBNAIL = {
  src: '/img/og-image-main.jpg',
  alt: MAIN_TITLE,
} satisfies ImageData

export const BLOG_TITLE = `${NICKNAME}'s Tech Blog` as const

export const BLOG_DESCRIPTION = 'SI 퍼블리셔 출신 FE 개발자의 기술 블로그' as const

export const BLOG_KEYWORDS = [
  '기술 블로그',
  '프론트엔드 기술 블로그',
  BLOG_TITLE,
  BLOG_DESCRIPTION,
] as const

export const BLOG_THUMBNAIL = {
  src: '/img/og-image-blog.jpg',
  alt: BLOG_TITLE,
} satisfies ImageData

export const EMAIL_ADDRESS = 'chanlee1007@naver.com' as const
