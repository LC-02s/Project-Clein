'use client'

import Image from 'next/image'
import { NICKNAME_KR } from '@/shared/config'
import { type OverlayElementState, useOverlay } from '@/shared/lib'
import { type ButtonProps, Button, Dialog } from '@/shared/ui'

const AccountDialog: React.FC<OverlayElementState> = ({ isOpen, close }) => (
  <Dialog open={isOpen} onClose={close} size="sm" cancelWithOutsideClick cancelWithEscape>
    <Dialog.Title className="mb-6">{NICKNAME_KR}에게 커피 사주기</Dialog.Title>
    <div className="relative w-full overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-700">
      <Image
        src="/images/toss-account-qr-code.jpeg"
        alt="토스 송금 QR코드"
        className="mb-8 scale-125 select-none"
        width={1200}
        height={1200}
        priority
      />
      <p className="absolute inset-x-0 bottom-5 inline-flex h-16 w-full items-center justify-center pr-3">
        <Image
          src="/images/toss-logo.png"
          alt="토스 로고"
          className="select-none"
          width={160}
          height={80}
        />
        <span className="sr-only">토스 사진으로 송금하기</span>
      </p>
    </div>
    <Dialog.Footer>
      <Dialog.Button title="대화창 닫기" variant="light" className="min-w-20" onClick={close}>
        닫기
      </Dialog.Button>
    </Dialog.Footer>
  </Dialog>
)

export type BuyMeACoffeeButtonProps = Omit<ButtonProps, 'ref' | 'onClick'>

export const BuyMeACoffeeButton: React.FC<BuyMeACoffeeButtonProps> = (props) => {
  const { startedAt, open } = useOverlay<HTMLButtonElement>()

  return (
    <Button {...props} ref={startedAt} onClick={() => open(AccountDialog)}>
      {props.children}
    </Button>
  )
}
