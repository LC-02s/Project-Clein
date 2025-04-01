import { type MetadataRoute } from 'next'

import { ABOUT_PATH, BLOG_PATH, PLAYGROUND_PATH, PROJECT_PATH } from '@/shared/config'

const generateSitemap = (): MetadataRoute.Sitemap => {
  const { origin } = new URL(process.env.NEXT_PUBLIC_DOMAIN_ADDRESS!)
  const lastModified = new Date()

  return [
    {
      url: origin + '/',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: origin + ABOUT_PATH,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: origin + BLOG_PATH,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.2,
    },
    {
      url: origin + PROJECT_PATH,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: origin + PLAYGROUND_PATH,
      lastModified,
      changeFrequency: 'yearly',
      priority: 1,
    },
  ]
}

export default generateSitemap
