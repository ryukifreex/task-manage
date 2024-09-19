import axios from 'axios'

/**
 * URLからデータを取得する
 * @param {string} url - fetch する URL
 * @returns {Promise<any>} データを含む Promise
 */
export const fetcher = (url: string) => axios.get(url).then((res) => res.data)
