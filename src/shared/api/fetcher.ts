import { Exception } from '../api'

export interface SearchParams {
  [key: string]: string | string[] | undefined
}

export interface RequestOptions extends RequestInit {
  params?: SearchParams
}

export interface CommonExceptionResponse extends Response {
  message: string
}

export interface ExceptionInterceptor {
  (cause: CommonExceptionResponse): unknown
}

export interface FetcherOptions extends RequestOptions {
  onException?: ExceptionInterceptor
}

export class Fetcher {
  private static readonly REVALIDATE_TAG_ALL = 'fetcher-all'

  private endpoint: string
  private timeout: number

  public constructor(options: { endpoint: string; timeout: number }) {
    this.endpoint = options.endpoint
    this.timeout = options.timeout
  }

  public async request<R = unknown>(
    url: string | URL,
    { onException, method = 'GET', ...options }: FetcherOptions = {},
  ): Promise<R> {
    const response = await this.fetch(url, { method, ...options })
    const data = await response.json()

    if (!response.ok) {
      const exception = Object.assign(response, data) as CommonExceptionResponse

      onException?.(exception)

      throw new Exception(exception.message || '')
    }

    return data
  }

  private async fetch(
    url: string | URL,
    { params, signal, next, ...options }: RequestOptions = {},
  ) {
    const targetURL = new URL(url, this.endpoint)
    const controller = new AbortController()

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          targetURL.searchParams.set(key, Array.isArray(value) ? value[value.length - 1] : value)
        }
      })
    }

    setTimeout(() => {
      controller.abort(Exception.getMessage('요청 시간이 초과되었어요'))
    }, this.timeout)

    return await fetch(targetURL, {
      ...options,
      signal: signal ? AbortSignal.any([signal, controller.signal]) : controller.signal,
      next: {
        revalidate: next?.revalidate,
        tags: [Fetcher.REVALIDATE_TAG_ALL, ...(next?.tags ?? [])],
      },
    })
  }

  public static revalidateAll(revalidateTag: (tag: string) => void) {
    revalidateTag(Fetcher.REVALIDATE_TAG_ALL)
  }
}

export const server = new Fetcher({
  endpoint: process.env.NEXT_PUBLIC_DOMAIN_ADDRESS!,
  timeout: 5_000,
})

export const exceptionMessage = (message: string): Pick<CommonExceptionResponse, 'message'> => ({
  message,
})
