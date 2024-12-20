export type LiteralDate = `${number}-${number}-${number} ${number}:${number}`

export function getTime(date?: LiteralDate) {
  if (date) {
    return new Date(date).getTime()
  }

  return Date.now()
}
