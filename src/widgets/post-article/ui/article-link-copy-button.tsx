'use client'

import { Button, CopyButton, Icon } from '@/shared/ui'

export const ArticleLinkCopyButton: React.FC = () => (
  <CopyButton value={() => `${window.location.origin}${window.location.pathname}`}>
    {({ status, copy }) => (
      <Button title="게시물 링크 복사하기" disabled={status} onClick={copy} square>
        {status ? (
          <Icon.CheckOutline className="text-green-600 dark:text-green-300" />
        ) : (
          <Icon.LinkOutline className="text-lg md:text-xl" />
        )}
      </Button>
    )}
  </CopyButton>
)
