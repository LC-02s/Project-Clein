import type { MappedKeywordWithLength } from '@/entities/post'
import type { PropsWithClassName } from '@/shared/lib'

export interface KeywordListProps extends React.PropsWithChildren<PropsWithClassName> {
  list: MappedKeywordWithLength[]
  renderItem: (props: MappedKeywordWithLength) => React.ReactNode
}

export const KeywordList: React.FC<KeywordListProps> = ({
  list,
  renderItem: Item,
  className,
  children,
}) => (
  <ul className={className}>
    {children}
    {list.map((keyword) => (
      <li key={keyword.id}>
        <Item {...keyword} />
      </li>
    ))}
  </ul>
)
