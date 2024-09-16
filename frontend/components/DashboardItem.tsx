import { useEffect, useRef } from 'react'
import { useDrag } from 'react-dnd'
import { Card } from '@mantine/core'

type BoardCardProps = {
  id: number
  label: string
  onClick?: (id: number) => void
}

// ボードで使用するカード
export default function BoardItem({ id, label, onClick }: BoardCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  // useEffectでrefにdragを適用
  useEffect(() => {
    if (cardRef.current) {
      drag(cardRef.current)
    }
  }, [drag])

  return (
    <div ref={cardRef} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Card onClick={() => onClick(id)} shadow="sm" padding="lg">
        {label}
      </Card>
    </div>
  )
}
