export interface ReadingTimeTextProps {
  value: number
}

export function ReadingTimeText({ value }: ReadingTimeTextProps) {
  return <>{value > 1 ? `약 ${value}분` : '1분 미만'}</>
}
