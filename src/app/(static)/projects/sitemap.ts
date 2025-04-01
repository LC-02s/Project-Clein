import { type MetadataRoute } from 'next'

import { ProjectEntity } from '@/database/projects'
import { PROJECT_PATH } from '@/shared/config'

const generateProjectSitemap = (): MetadataRoute.Sitemap => {
  const { origin } = new URL(process.env.NEXT_PUBLIC_DOMAIN_ADDRESS!)
  const lastModified = new Date()

  return ProjectEntity.getKeys().map<MetadataRoute.Sitemap[number]>((slug) => ({
    url: origin + PROJECT_PATH + '/' + slug,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.3,
  }))
}

export default generateProjectSitemap
