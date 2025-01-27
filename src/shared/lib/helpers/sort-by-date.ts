import { type LiteralDateTime, getTime } from '../../lib'

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

export const SORTED_FROM_DATE = { UPDATE: 'updatedAt', CREATE: 'createdAt' } as const

export const joinSortParams = (key: SortedFromDateKey, type: SortType) =>
  [key, type].join(SORT_PARAMS_SEPARATOR) as LiteralSortParams

export const DEFAULT_SORT_PARAMS = joinSortParams(SORTED_FROM_DATE.UPDATE, SORT_TYPE.DESC)

export const SORT_PARAMS_LABEL_MAP = new Map<LiteralSortParams, string>([
  [joinSortParams(SORTED_FROM_DATE.UPDATE, SORT_TYPE.DESC), '최신 수정순'],
  [joinSortParams(SORTED_FROM_DATE.CREATE, SORT_TYPE.DESC), '최신 생성순'],
  [joinSortParams(SORTED_FROM_DATE.UPDATE, SORT_TYPE.ASC), '기본 수정순'],
  [joinSortParams(SORTED_FROM_DATE.CREATE, SORT_TYPE.ASC), '기본 생성순'],
] as const)

export const orderByDateDesc = (a: LiteralDateTime, b: LiteralDateTime) => getTime(b) - getTime(a)

export const orderByDateAsc = (a: LiteralDateTime, b: LiteralDateTime) => getTime(a) - getTime(b)

export const sortByDate = <T extends SortedFromDate>(
  params?: string | null,
): SortedInfo & { compare: (a: T, b: T) => number } => {
  const sortParams = params?.split(SORT_PARAMS_SEPARATOR)
  const [sortedFrom, sortType]: [SortedFromDateKey, SortType] = sortParams
    ? [
        sortParams[0] === SORTED_FROM_DATE.CREATE
          ? SORTED_FROM_DATE.CREATE
          : SORTED_FROM_DATE.UPDATE,
        sortParams[1] === SORT_TYPE.ASC ? SORT_TYPE.ASC : SORT_TYPE.DESC,
      ]
    : [SORTED_FROM_DATE.UPDATE, SORT_TYPE.DESC]

  const compareFn = sortType === SORT_TYPE.ASC ? orderByDateAsc : orderByDateDesc

  return {
    sorted: { from: sortedFrom, at: sortType },
    compare: (a, b) => compareFn(a[sortedFrom], b[sortedFrom]),
  }
}
