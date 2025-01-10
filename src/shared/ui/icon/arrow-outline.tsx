export interface ArrowIconProps extends React.SVGProps<SVGSVGElement> {
  direction: keyof typeof arrowDirection
}

export const arrowDirection = {
  top: 0,
  bottom: 180,
  left: 270,
  right: 90,
}

export function ArrowOutline({ direction, style, ...props }: ArrowIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      style={{ ...style, transform: `rotate(${arrowDirection[direction]}deg)` }}
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M11.47 3.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 1 1-1.06 1.06l-4.72-4.72V20a.75.75 0 0 1-1.5 0V5.81l-4.72 4.72a.75.75 0 1 1-1.06-1.06z"
        clipRule="evenodd"
      />
    </svg>
  )
}
