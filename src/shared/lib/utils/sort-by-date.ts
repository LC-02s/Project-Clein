import { type LiteralDateTime, getTime } from './get-time'

export type SortType = (typeof SORT_TYPE)[keyof typeof SORT_TYPE]

export type SortedFromDateKey = (typeof SORTED_FROM_DATE)[keyof typeof SORTED_FROM_DATE]

export type SortedFromDate = Record<SortedFromDateKey, LiteralDateTime>

export type LiteralSortParams = `${SortedFromDateKey}${typeof SORT_PARAMS_SEPARATOR}${SortType}`

export interface SortedInfo {
  sorted: {
    from: SortedFromDateKey
    at: SortType
  }
}

export const SORT_PARAMS_SEPARATOR = ','

export const SORT_TYPE = { DESC: 'desc', ASC: 'asc' } as const

export const SORTED_FROM_DATE = { CREATE: 'createdAt', UPDATE: 'updatedAt' } as const

export const DEFAULT_SORT_PARAMS = joinSortParams(SORTED_FROM_DATE.CREATE, SORT_TYPE.ASC)

export const SORT_PARAMS_LABEL_MAP = new Map<LiteralSortParams, string>([
  [joinSortParams(SORTED_FROM_DATE.CREATE, SORT_TYPE.DESC), '최신 생성순'],
  [joinSortParams(SORTED_FROM_DATE.UPDATE, SORT_TYPE.DESC), '최신 수정순'],
  [joinSortParams(SORTED_FROM_DATE.CREATE, SORT_TYPE.ASC), '기본 생성순'],
  [joinSortParams(SORTED_FROM_DATE.UPDATE, SORT_TYPE.ASC), '기본 수정순'],
] as const)

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
        sortParams[0] === SORTED_FROM_DATE.UPDATE
          ? SORTED_FROM_DATE.UPDATE
          : SORTED_FROM_DATE.CREATE,
        sortParams[1] === SORT_TYPE.ASC ? SORT_TYPE.ASC : SORT_TYPE.DESC,
      ]
    : [SORTED_FROM_DATE.CREATE, SORT_TYPE.DESC]

  const compareFn = sortType === SORT_TYPE.ASC ? orderByDateAsc : orderByDateDesc

  return {
    sorted: { from: sortedFrom, at: sortType },
    compare: (a, b) => compareFn(a[sortedFrom], b[sortedFrom]),
  }
}

export function joinSortParams(key: SortedFromDateKey, type: SortType) {
  return [key, type].join(SORT_PARAMS_SEPARATOR) as LiteralSortParams
}
