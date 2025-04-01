import { type MetadataRoute } from 'next'

import { BLOG_PATH, PROJECT_PATH } from '@/shared/config'

const generateRobotsTxt = (): MetadataRoute.Robots => {
  const { origin } = new URL(process.env.NEXT_PUBLIC_DOMAIN_ADDRESS!)

  return {
    rules: {
      userAgent: '*',
      disallow: ['/api/', '/docs/', '/images/'],
    },
    sitemap: [
      `${origin}/sitemap.xml`,
      `${origin}${BLOG_PATH}/sitemap.xml`,
      `${origin}${PROJECT_PATH}/sitemap.xml`,
    ],
  }
}

export default generateRobotsTxt
