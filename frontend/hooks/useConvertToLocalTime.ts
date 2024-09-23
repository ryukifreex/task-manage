import { format, toZonedTime } from 'date-fns-tz'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

/**
 * UTC日時をユーザーのタイムゾーンに合わせたフォーマットにして返す
 * @param {string} utcDate
 * @param {string} dateFormat
 * @returns {string} formattedDate
 */
export const useConvertToLocalTime = (utcDate: string) => {
  if (utcDate) {
    // ユーザーのローカルタイムゾーンを取得
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

    // 言語に応じて表示切替
    const { locale } = useRouter()
    const dateFormat = locale === 'ja' ? 'yyyy年MM月dd日  HH:mm' : 'MMM/dd/yyyy HH:mm'

    // UTCからローカルタイムゾーンに変換
    return useMemo(() => {
      if (!utcDate) return ''
      try {
        const localTime = toZonedTime(utcDate, timeZone)
        return format(localTime, dateFormat, { timeZone })
      } catch (error) {
        console.error('Invalid UTC date string:', error)
        return ''
      }
    }, [utcDate, timeZone, dateFormat]) // 依存関係を追加
  }
}
