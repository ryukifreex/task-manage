import { useState } from 'react'

/**
 * @returns {boolean} isModalOpen モーダルの開閉状態
 * @returns {function} openModal モーダルを開く関数
 * @returns {function} closeModal モーダルを閉じる関数
 */
export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return {
    isModalOpen: isOpen,
    openModal,
    closeModal,
  }
}
