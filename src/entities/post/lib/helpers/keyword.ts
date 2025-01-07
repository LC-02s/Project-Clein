import { PROJECTS_PREFIX, SERIES_PREFIX } from '../../config'
import type { Keyword, SeparatedKeywordsKey } from '../../model'

export function separateKeywords<T>(keywords: Keyword[], mapper: (keyword: Keyword) => T) {
  type SeparatedKeywords = Record<SeparatedKeywordsKey, T[]>

  return keywords.reduce<SeparatedKeywords>(
    (separated, keyword) => {
      if (keyword.startsWith(PROJECTS_PREFIX)) {
        return separated.projects.push(mapper(keyword)), separated
      }

      if (keyword.startsWith(SERIES_PREFIX)) {
        return separated.series.push(mapper(keyword)), separated
      }

      return separated.tags.push(mapper(keyword)), separated
    },
    { tags: [], projects: [], series: [] },
  )
}
