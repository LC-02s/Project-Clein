import { MainLogo, Container } from '@/shared/ui'

import { TabMenu } from './tab-menu'

export const Header: React.FC<React.PropsWithChildren> = ({ children }) => (
  <header className="w-full pt-28 xl:pt-16">
    <Container
      layer="middle"
      round={null}
      className="fixed inset-x-0 top-0 z-50 flex h-28 w-full flex-col items-start justify-start border-b bg-white xl:h-auto"
    >
      <div className="mx-auto flex w-full items-center justify-between px-4 py-3 xl:h-16 xl:py-0">
        <h1 className="pl-3 md:pl-6">
          <MainLogo className="whitespace-nowrap" />
        </h1>
        <TabMenu />
        <div className="flex items-center justify-end space-x-2 md:space-x-3">{children}</div>
      </div>
    </Container>
  </header>
)
