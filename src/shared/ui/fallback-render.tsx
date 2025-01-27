export interface FallbackRenderProps extends React.PropsWithChildren {
  render: boolean
  component?: React.ReactNode
}

export const FallbackRender: React.FC<FallbackRenderProps> = ({ render, component, children }) => (
  <>{render ? component : children}</>
)
