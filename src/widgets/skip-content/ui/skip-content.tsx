import { CONTENT_ID } from '../config'

export const SkipContent: React.FC = () => (
  <div id="skip-content">
    <a
      href={`#${CONTENT_ID}`}
      className="absolute -top-8 left-0 inline-flex h-8 w-36 items-center justify-center rounded bg-gray-700 text-sm text-white opacity-0 focus:top-0 focus:z-[1000] focus:opacity-100"
    >
      컨텐츠 영역 바로가기
    </a>
  </div>
)
