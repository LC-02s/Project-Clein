import { MAIN_TITLE } from '../../config'
import { type PropsWithClassName, cn } from '../../lib'
import { LinkWithLoader } from '../../ui'

export const MainLogo: React.FC<PropsWithClassName> = ({ className }) => (
  <LinkWithLoader
    href="/"
    title="메인으로"
    className={cn('block text-lg font-bold md:text-xl', className)}
  >
    {MAIN_TITLE}
  </LinkWithLoader>
)
