import { Container, Icon } from '@/shared/ui'

export const EmptyContent: React.FC = () => (
  <div className="my-6 px-5 pb-28 pt-24">
    <Container
      layer="middle"
      className="mx-auto mb-8 flex size-16 items-center justify-center rounded-full border md:size-24"
    >
      <Icon.FoldedHandsEmoji className="size-8 md:size-12" />
    </Container>
    <h3 className="mb-4 break-keep text-center text-xl font-bold md:text-2xl">
      문서 작성 중이에요
    </h3>
    <p className="break-keep text-center text-gray-500 md:text-lg dark:text-gray-400">
      빠른 시일내에 작성할게요 ㅠ
    </p>
  </div>
)
