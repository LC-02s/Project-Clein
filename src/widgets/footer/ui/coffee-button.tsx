'use client'

import Image from 'next/image'
import { NICKNAME_KR } from '@/entities/site'
import { useOverlay, type OverlayElementState } from '@/shared/lib'
import { Button, type ButtonProps, Dialog } from '@/shared/ui'

function AccountDialog({ isOpen, close }: OverlayElementState) {
  return (
    <Dialog open={isOpen} onClose={close} size="sm" cancelWithOutsideClick cancelWithEscape>
      <Dialog.Title className="mb-6">{NICKNAME_KR}에게 커피 사주기</Dialog.Title>
      <div className="relative w-full overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-600">
        <p className="absolute inset-x-0 bottom-5 z-10 inline-flex h-16 w-full items-center justify-center pr-3">
          <Image
            src="/img/toss-logo-primary.png"
            alt="토스 로고"
            className="select-none"
            width={160}
            height={80}
          />
          <span className="hidden-text">토스 사진으로 송금하기</span>
        </p>
        <Image
          src="/img/toss-accout-qr-code.jpeg"
          alt="토스 송금 QR코드"
          className="mb-8 scale-125 select-none"
          width={1200}
          height={1200}
          priority
        />
      </div>
      <Dialog.Footer>
        <Dialog.Button title="닫기" variant="light" className="min-w-20" onClick={close}>
          닫기
        </Dialog.Button>
      </Dialog.Footer>
    </Dialog>
  )
}

export default function BuyMeACoffeeButton({
  children,
  ...props
}: Omit<ButtonProps, 'ref' | 'onClick'>) {
  const { startedAt, open } = useOverlay<HTMLButtonElement>()

  return (
    <Button {...props} ref={startedAt} onClick={() => open(AccountDialog)}>
      {children}
    </Button>
  )
}
