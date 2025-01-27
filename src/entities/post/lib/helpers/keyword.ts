import type { Keyword, SeparatedKeywordsKey } from '../../model'

export interface CreateSeparateKeywordsParams<P extends Keyword, S extends Keyword> {
  projects: Set<P>
  series: Set<S>
}

export const createSeparateKeywords = <P extends Keyword, S extends Keyword>({
  projects,
  series,
}: CreateSeparateKeywordsParams<P, S>) => {
  return <T>(keywords: Keyword[], mapper: (keyword: Keyword) => T) => {
    type SeparatedKeywords = Record<SeparatedKeywordsKey, T[]>

    return keywords.reduce<SeparatedKeywords>(
      (separated, keyword) => {
        if (projects.has(keyword as P)) {
          return separated.projects.push(mapper(keyword)), separated
        }

        if (series.has(keyword as S)) {
          return separated.series.push(mapper(keyword)), separated
        }

        return separated.tags.push(mapper(keyword)), separated
      },
      { tags: [], projects: [], series: [] },
    )
  }
}
