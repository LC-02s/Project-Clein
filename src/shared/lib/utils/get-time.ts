export type LiteralTime = `${number}:` | `${number}:${number}` | `${number}:${number}:${number}`

export type LiteralDate = `${number}-${number}-${number}`

export type LiteralDateTime = `${LiteralDate}${` ${LiteralTime}` | ''}`

export function getTime(date?: LiteralDateTime) {
  if (date) {
    return new Date(date).getTime()
  }

  return Date.now()
}
