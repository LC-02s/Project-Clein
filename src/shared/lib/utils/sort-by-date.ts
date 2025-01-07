import { type LiteralDateTime, getTime } from './get-time'

export type SortType = 'asc' | 'desc'

export type SortedFromDateKey = 'createdAt' | 'updatedAt'

export type SortedFromDate = Record<SortedFromDateKey, LiteralDateTime>

export interface SortedInfo {
  sorted: {
    from: SortedFromDateKey
    at: SortType
  }
}

export const SORT_PARAMS_SEPARATOR = ','

export function orderByDateDesc(a: LiteralDateTime, b: LiteralDateTime) {
  return getTime(b) - getTime(a)
}

export function orderByDateAsc(a: LiteralDateTime, b: LiteralDateTime) {
  return getTime(a) - getTime(b)
}

export function sortByDate<T extends SortedFromDate>(
  params?: string | null,
): SortedInfo & { compare: (a: T, b: T) => number } {
  const sortParams = params?.split(SORT_PARAMS_SEPARATOR)
  const [sortedFrom, sortType]: [SortedFromDateKey, SortType] = sortParams
    ? [
        sortParams[0] === 'updatedAt' ? 'updatedAt' : 'createdAt',
        sortParams[1] === 'asc' ? 'asc' : 'desc',
      ]
    : ['createdAt', 'desc']

  const compareFn = sortType === 'asc' ? orderByDateAsc : orderByDateDesc

  return {
    sorted: { from: sortedFrom, at: sortType },
    compare: (a, b) => compareFn(a[sortedFrom], b[sortedFrom]),
  }
}
