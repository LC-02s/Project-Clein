'use client'

import { CopyButton, Icon } from '@/shared/ui'

export const ArticleLinkCopyButton: React.FC = () => (
  <CopyButton value={() => `${window.location.origin}${window.location.pathname}`}>
    {({ status, copy }) => (
      <button
        type="button"
        title="해당 게시물 링크 복사하기"
        className="flex items-center justify-center text-gray-500 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-300"
        disabled={status}
        onClick={copy}
      >
        {status ? (
          <span className="text-sm font-medium text-green-600 dark:text-green-300">
            복사됐어요!!
          </span>
        ) : (
          <>
            <Icon.LinkOutline className="mr-1.5 text-sm" />
            <span className="whitespace-nowrap text-sm font-medium">링크 복사</span>
          </>
        )}
      </button>
    )}
  </CopyButton>
)
