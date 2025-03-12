import { cn } from '../../lib'

import { type IconProps } from './interface'

export const FramerMotionLogo: React.FC<IconProps> = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 128 128"
    aria-label="Framer Motion 로고"
    className={cn(className, 'fill-black dark:fill-white')}
    {...props}
  >
    <path d="M22.684 0h84.253v42.667H64.81zm0 42.667H64.81l42.127 42.666H64.81V128L22.684 85.333z" />
  </svg>
)
