'use client'

import { useOverlay, type OverlayElementState } from '@/shared/lib'
import { Button, type ButtonProps, CopyButton, Dialog, Icon, TextInput } from '@/shared/ui'
import { EMAIL_ADDRESS } from '../config'

function EmailDialog({ isOpen, close }: OverlayElementState) {
  return (
    <Dialog open={isOpen} onClose={close} size="sm" cancelWithOutsideClick cancelWithEscape>
      <Dialog.Title>이메일 복사하기</Dialog.Title>
      <div className="flex items-center justify-between px-px pt-2">
        <TextInput
          name="email"
          value={EMAIL_ADDRESS}
          className="w-[calc(100%-3rem)] text-sm xs:text-base"
          readOnly
        />
        <CopyButton value={EMAIL_ADDRESS}>
          {({ status, copy }) => (
            <Button title="이메일 복사하기" square onClick={copy} disabled={status}>
              {status ? (
                <Icon.CheckOutline className="text-emerald-600 dark:text-emerald-400" />
              ) : (
                <Icon.CopyOutline className="text-xl text-zinc-600 dark:text-zinc-300" />
              )}
              <span className="hidden-text">이메일 복사하기</span>
            </Button>
          )}
        </CopyButton>
      </div>
      <Dialog.Footer>
        <Dialog.Button title="닫기" className="min-w-20" onClick={close}>
          닫기
        </Dialog.Button>
      </Dialog.Footer>
    </Dialog>
  )
}

export default function EmailButton(props: Omit<ButtonProps, 'onClick' | 'ref'>) {
  const { startedAt, open } = useOverlay<HTMLButtonElement>()

  return (
    <button {...props} ref={startedAt} onClick={() => open(EmailDialog)}>
      {props.children}
    </button>
  )
}
