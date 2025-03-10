'use client'

import { EMAIL_ADDRESS } from '@/shared/config'
import { type CreateOverlayElement, useOverlay } from '@/shared/lib'
import { type ButtonProps, Button, CopyButton, Dialog, Icon, TextInput } from '@/shared/ui'

const EmailDialog: CreateOverlayElement = ({ isOpen, close }) => (
  <Dialog open={isOpen} onClose={close} size="sm" cancelWithOutsideClick cancelWithEscape>
    <Dialog.Title>이메일 복사하기</Dialog.Title>
    <div className="flex items-center justify-between space-x-2 px-px pt-2">
      <TextInput
        name="user-email"
        type="email"
        value={EMAIL_ADDRESS}
        className="flex-1 text-sm xs:text-base"
        readOnly
        withoutBackground
      />
      <CopyButton value={EMAIL_ADDRESS}>
        {({ status, copy }) => (
          <Button title="이메일 복사하기" variant="light" square onClick={copy} disabled={status}>
            {status ? (
              <Icon.CheckOutline className="text-green-600 dark:text-green-300" />
            ) : (
              <Icon.CopyOutline className="text-lg text-gray-600 md:text-xl dark:text-gray-300" />
            )}
          </Button>
        )}
      </CopyButton>
    </div>
    <Dialog.Footer>
      <Dialog.Button title="대화창 닫기" variant="light" className="min-w-20" onClick={close}>
        닫기
      </Dialog.Button>
    </Dialog.Footer>
  </Dialog>
)

export type EmailButtonProps = Omit<ButtonProps, 'onClick' | 'ref'>

export const EmailButton: React.FC<EmailButtonProps> = (props) => {
  const { startedAt, open } = useOverlay<HTMLButtonElement>()

  return (
    <Button {...props} ref={startedAt} onClick={() => open(EmailDialog)}>
      {props.children}
    </Button>
  )
}
