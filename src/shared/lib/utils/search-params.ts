export type SearchParamsEntry<K extends string> = [K, string | number | false | null | undefined]

export type SearchParamsEntryWithDefaultValue<K extends string> =
  | [...SearchParamsEntry<K>, string | number]
  | SearchParamsEntry<K>

export interface CreateSearchParamsFilterParams<K extends string> {
  params: SearchParamsEntryWithDefaultValue<K>[]
  pathname?: string
}

const extractSeparator = (pathname: string) => (pathname.includes('?') ? '&' : '?')

export function createSearchParamsFilter<K extends string>({
  params,
  pathname = '',
}: CreateSearchParamsFilterParams<K>) {
  const separator = extractSeparator(pathname)

  return (without: K[]) => {
    const entries = params
      .filter(([key, value, defaultValue]) => {
        return !!value && value !== defaultValue && without.every((k) => key !== k)
      })
      .map(([key, value]) => [key, value].join('='))
      .join('&')

    return !entries ? pathname : [pathname, entries].join(separator)
  }
}

export function createSearchParamsToURL<K extends string>(pathname = '') {
  const separator = extractSeparator(pathname)

  return (...params: SearchParamsEntry<K>[]) => {
    const entries = params
      .filter(([, value]) => !!value)
      .map((entry) => entry.join('='))
      .join('&')

    return !entries ? pathname : [pathname, entries].join(separator)
  }
}
