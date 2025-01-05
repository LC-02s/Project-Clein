interface ReadingTimeTextProps {
  value: number
}

export default function ReadingTimeText({ value }: ReadingTimeTextProps) {
  return <>{value > 1 ? `약 ${value}분` : '1분 미만'}</>
}
