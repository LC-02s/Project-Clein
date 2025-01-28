import type { IconProps } from '../icon'
import { cn } from '../../lib'

export const RotateSpinner: React.FC<IconProps> = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={cn('animate-spin', className)}
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    aria-label="로딩 중"
    {...props}
  >
    <g>
      <rect width={2} height={5} x={11} y={1} fill="currentColor" opacity={0.14} />
      <rect
        width={2}
        height={5}
        x={11}
        y={1}
        fill="currentColor"
        opacity={0.29}
        transform="rotate(30 12 12)"
      />
      <rect
        width={2}
        height={5}
        x={11}
        y={1}
        fill="currentColor"
        opacity={0.43}
        transform="rotate(60 12 12)"
      />
      <rect
        width={2}
        height={5}
        x={11}
        y={1}
        fill="currentColor"
        opacity={0.57}
        transform="rotate(90 12 12)"
      />
      <rect
        width={2}
        height={5}
        x={11}
        y={1}
        fill="currentColor"
        opacity={0.71}
        transform="rotate(120 12 12)"
      />
      <rect
        width={2}
        height={5}
        x={11}
        y={1}
        fill="currentColor"
        opacity={0.86}
        transform="rotate(150 12 12)"
      />
      <rect width={2} height={5} x={11} y={1} fill="currentColor" transform="rotate(180 12 12)" />
    </g>
  </svg>
)
