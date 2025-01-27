'use client'

import { EMAIL_ADDRESS } from '@/shared/config'
import { type OverlayElementState, useOverlay } from '@/shared/lib'
import { type ButtonProps, Button, CopyButton, Dialog, Icon, TextInput } from '@/shared/ui'

const EmailDialog: React.FC<OverlayElementState> = ({ isOpen, close }) => (
  <Dialog open={isOpen} onClose={close} size="sm" cancelWithOutsideClick cancelWithEscape>
    <Dialog.Title>이메일 복사하기</Dialog.Title>
    <div className="flex items-center justify-between px-px pt-2">
      <TextInput
        name="email"
        value={EMAIL_ADDRESS}
        className="w-[calc(100%-3rem)] text-sm xs:text-base"
        readOnly
        withoutBackground
      />
      <CopyButton value={EMAIL_ADDRESS}>
        {({ status, copy }) => (
          <Button title="이메일 복사하기" variant="light" square onClick={copy} disabled={status}>
            {status ? (
              <Icon.CheckOutline className="text-emerald-600 dark:text-emerald-300" />
            ) : (
              <Icon.CopyOutline className="text-xl text-zinc-600 dark:text-zinc-300" />
            )}
            <span className="hidden-text">이메일 복사하기</span>
          </Button>
        )}
      </CopyButton>
    </div>
    <Dialog.Footer>
      <Dialog.Button title="닫기" variant="light" className="min-w-20" onClick={close}>
        닫기
      </Dialog.Button>
    </Dialog.Footer>
  </Dialog>
)

export type EmailButtonProps = Omit<ButtonProps, 'onClick' | 'ref'>

export const EmailButton: React.FC<EmailButtonProps> = (props) => {
  const { startedAt, open } = useOverlay<HTMLButtonElement>()

  return (
    <button {...props} ref={startedAt} onClick={() => open(EmailDialog)}>
      {props.children}
    </button>
  )
}
