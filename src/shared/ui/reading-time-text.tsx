export interface ReadingTimeTextProps {
  value: number
}

export const ReadingTimeText: React.FC<ReadingTimeTextProps> = ({ value }) => (
  <>{value > 1 ? `약 ${value}분` : '1분 미만'}</>
)
