import axios from 'axios'

/**
 * 認証情報を付与してデータを取得する
 * @param {string} url - fetch する URL
 * @returns {Promise<any>} データを含む Promise
 */
export const fetcher = async (url: string) => {
  const token = localStorage.getItem('auth')
  try {
    const response = await axios.get(
      url,
      token && {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  } catch (error) {
    console.log(error)
  }
}
