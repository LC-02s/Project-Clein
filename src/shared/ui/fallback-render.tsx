export interface FallbackRenderProps {
  render: boolean
  component?: React.ReactNode
}

export function FallbackRender({
  render,
  component,
  children,
}: React.PropsWithChildren<FallbackRenderProps>): React.ReactNode {
  if (render) {
    return component
  }

  return <>{children}</>
}
