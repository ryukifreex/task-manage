import { format, toZonedTime } from 'date-fns-tz'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

/**
 * UTC日時をユーザーのタイムゾーンに合わせた表示形式にして返す
 * @param {Date} date
 * @returns {Function} toLocalDate - 日付のみをフォーマットする関数
 * @returns {Function} toLocalDateTime - 日付と時刻をフォーマットする関数
 *  */
export const useConvertToLocal = () => {
  // ユーザーのローカルタイムゾーンを取得
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  // 言語に応じて表示切替
  const { locale } = useRouter()
  const dateTimeFormat = locale === 'ja' ? 'yyyy年MM月dd日  HH:mm' : 'MMM/dd/yyyy HH:mm'
  const dateFormat = locale === 'ja' ? 'yyyy年MM月dd日' : 'MMM/dd/yyyy'

  // UTCからローカルタイムゾーンに変換
  const toLocalDateTime = useMemo(() => {
    return (utcDate: Date) => {
      if (!utcDate) return ''
      try {
        const localTime = toZonedTime(utcDate, timeZone)
        return format(localTime, dateTimeFormat)
      } catch (error) {
        console.error('Invalid UTC date string:', error)
        return ''
      }
    }
  }, [timeZone, dateTimeFormat])

  const toLocalDate = useMemo(() => {
    return (utcDate: Date) => {
      if (!utcDate) return ''
      try {
        const localTime = toZonedTime(utcDate, timeZone)
        return format(localTime, dateFormat)
      } catch (error) {
        console.error('Invalid UTC date string:', error)
        return ''
      }
    }
  }, [timeZone, dateFormat])
  return { toLocalDate, toLocalDateTime }
}
