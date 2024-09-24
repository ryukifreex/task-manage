import { format, toZonedTime } from 'date-fns-tz'

/**
 * ユーザーの日付をUTCフォーマットにして返す
 * @param {Date | null} date
 * @returns {string} formattedDate
 */

export const useConvertToUtcDate = (date: Date) => {
  // UTC時間に変換
  if (date) {
    const utcDate = toZonedTime(date, 'UTC')
    const formattedDate = format(utcDate, 'yyyy-MM-dd', { timeZone: 'UTC' })
    return formattedDate
  }
}
