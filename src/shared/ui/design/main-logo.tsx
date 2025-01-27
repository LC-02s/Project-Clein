import Link from 'next/link'
import { MAIN_TITLE } from '../../config'
import { type PropsWithClassName, cn } from '../../lib'
export interface MainLogoProps extends PropsWithClassName {
  render?: typeof Link
}

export const MainLogo: React.FC<MainLogoProps> = ({ className, render: Component = Link }) => (
  <Component href="/" title="메인으로" className={cn('block text-xl font-bold', className)}>
    {MAIN_TITLE}
  </Component>
)
