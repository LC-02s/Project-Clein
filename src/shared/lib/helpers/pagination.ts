export interface PageInfo {
  page: {
    current: number
    size: number
    total: number
    length: number
    first: boolean
    last: boolean
  }
}

export interface ResponseWithPagination<T> extends PageInfo {
  contents: T[]
}

export type PaginationParamsKey = (typeof PAGINATION_PARAMS)[keyof typeof PAGINATION_PARAMS]

export const PAGINATION_PARAMS = Object.freeze({
  PAGE: 'page',
  SIZE: 'size',
})

export const DEFAULT_PAGE = 1

export const DEFAULT_PAGE_SIZE = 10

export class Pagination<T> {
  private page: number
  private totalLength: number
  private totalPage: number
  private size: number

  public constructor(params: URLSearchParams, totalLength: number) {
    this.size = this.validateSize(Number(params.get(PAGINATION_PARAMS.SIZE)))
    this.totalLength = totalLength
    this.totalPage = Math.ceil(this.totalLength / this.size)
    this.page = this.validatePage(Number(params.get(PAGINATION_PARAMS.PAGE)))
  }

  public response(mapper: (data: T[], index: number) => T[]): ResponseWithPagination<T> {
    const startIndex = (this.page - DEFAULT_PAGE) * this.size
    const range = Array.from({ length: this.size }, (_, index) => startIndex + index)

    return {
      page: {
        current: this.page,
        size: this.size,
        total: this.totalPage,
        length: this.totalLength,
        first: this.page === DEFAULT_PAGE,
        last: this.page === this.totalPage,
      },
      contents: range.reduce<T[]>(mapper, []),
    }
  }

  private validatePage(page: number) {
    if (!Number.isSafeInteger(page) || 1 > page) {
      return DEFAULT_PAGE
    }

    if (this.totalPage < page) {
      return this.totalPage
    }

    return page
  }

  private validateSize(size: number) {
    if (!Number.isSafeInteger(size) || size <= 0) {
      return DEFAULT_PAGE_SIZE
    }

    return size
  }
}
