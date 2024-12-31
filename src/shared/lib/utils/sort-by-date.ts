import { type LiteralDateTime, getTime } from './get-time'

export type SortType = 'asc' | 'desc'

export function orderByDateDesc(a: LiteralDateTime, b: LiteralDateTime) {
  return getTime(b) - getTime(a)
}

export function orderByDateAsc(a: LiteralDateTime, b: LiteralDateTime) {
  return getTime(a) - getTime(b)
}

export function sortByDate(sortType?: SortType) {
  return sortType === 'asc' ? orderByDateAsc : orderByDateDesc
}
