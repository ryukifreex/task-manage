import { Modal } from '@mantine/core'
import { ReactNode } from 'react'

export type ModalProps = {
  opened: boolean
  onClose?: () => void
  props?: ReactNode
}

export default function CustomModal({ opened, onClose, props }: ModalProps) {
  return (
    <Modal opened={opened} onClose={onClose}>
      {props}
    </Modal>
  )
}
