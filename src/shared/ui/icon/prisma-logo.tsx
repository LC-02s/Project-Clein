import { cn } from '../../lib'

import { type IconProps } from './interface'

export const PrismaLogo: React.FC<IconProps> = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="0.83em"
    height="1em"
    viewBox="0 0 256 310"
    aria-label="Prisma 로고"
    className={cn(className, 'fill-black dark:fill-white')}
    {...props}
  >
    <path d="M254.313 235.519L148 9.749A17.06 17.06 0 0 0 133.473.037a16.87 16.87 0 0 0-15.533 8.052L2.633 194.848a17.47 17.47 0 0 0 .193 18.747L59.2 300.896a18.13 18.13 0 0 0 20.363 7.489l163.599-48.392a17.93 17.93 0 0 0 11.26-9.722a17.54 17.54 0 0 0-.101-14.76zm-23.802 9.683l-138.823 41.05c-4.235 1.26-8.3-2.411-7.419-6.685l49.598-237.484c.927-4.443 7.063-5.147 9.003-1.035l91.814 194.973a6.63 6.63 0 0 1-4.18 9.18z" />
  </svg>
)
