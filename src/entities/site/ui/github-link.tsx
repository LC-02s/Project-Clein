import { GITHUB_ADDRESS, NICKNAME } from '../config'

export default function GithubLink(props: React.JSX.IntrinsicElements['a']) {
  return (
    <a
      href={GITHUB_ADDRESS}
      title={`새창이동: ${NICKNAME} 깃허브`}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {props.children}
    </a>
  )
}
