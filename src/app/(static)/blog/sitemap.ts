import { type MetadataRoute } from 'next'

import { PostEntity } from '@/database/posts'
import { BLOG_PATH } from '@/shared/config'

const generateBlogSitemap = (): MetadataRoute.Sitemap => {
  const { origin } = new URL(process.env.NEXT_PUBLIC_DOMAIN_ADDRESS!)
  const lastModified = new Date()

  return PostEntity.getEntries()
    .filter(([, data]) => !data.isWriting)
    .map<MetadataRoute.Sitemap[number]>(([slug]) => ({
      url: origin + BLOG_PATH + '/' + slug,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.1,
    }))
}

export default generateBlogSitemap
