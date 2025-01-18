export function ExternalLink({ title, ...props }: React.JSX.IntrinsicElements['a']) {
  return (
    <a
      title={`새창이동${title ? `: ${title}` : ''}`}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {props.children}
    </a>
  )
}
