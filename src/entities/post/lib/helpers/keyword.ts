import type { Keyword } from '../../model'
import { PROJECTS_PREFIX, SERIES_PREFIX } from '../../config'

export function separateKeywords(keywords: Keyword[]) {
  return keywords.reduce<{ tags: Keyword[]; projects: Keyword[]; series: Keyword[] }>(
    (separated, keyword) => {
      if (keyword.startsWith(PROJECTS_PREFIX)) {
        return separated.projects.push(keyword), separated
      }

      if (keyword.startsWith(SERIES_PREFIX)) {
        return separated.series.push(keyword), separated
      }

      return separated.tags.push(keyword), separated
    },
    { tags: [], projects: [], series: [] },
  )
}
