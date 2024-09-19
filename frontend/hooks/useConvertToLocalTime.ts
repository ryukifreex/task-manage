import { format, toZonedTime } from 'date-fns-tz'

/**
 * UTC日時をユーザーのタイムゾーンに合わせたフォーマットにして返す
 * @param {string | null} utcDate
 * @param {string} dateFormat
 * @returns {string} formattedDate
 */

export const useConvertToLocalTime = (
  utcDate: string | null,
  dateFormat: string = 'yyyy/MM/dd HH:mm'
) => {
  // ユーザーのローカルタイムゾーンを取得
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  // UTCからローカルタイムゾーンに変換
  const localTime = (() => {
    if (!utcDate) return null
    try {
      return toZonedTime(utcDate, timeZone)
    } catch (error) {
      console.error('Invalid UTC date string:', error)
      return null
    }
  })()

  if (!localTime) return ''
  return format(localTime, dateFormat, { timeZone })
}
