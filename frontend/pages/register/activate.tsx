import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../../config/api'
import Link from 'next/link'

export default function () {
  const router = useRouter()
  const { uidb64, token } = router.query
  const [message, setMessage] = useState('')
  console.log({ uidb64, token })
  useEffect(() => {
    if (uidb64 && token) {
      // Django APIに認証リクエストを送信
      axios
        .get(`${API_BASE_URL}/user/activate/${uidb64}/${token}/`)
        .then((response) => {
          setMessage(response.data.message)
          // 認証が完了したらトップページに2秒後に遷移
          setTimeout(() => {
            router.push('/')
          }, 2000)
        })
        .catch((error) => {
          setMessage('Activation failed. The link may be invalid or expired.')
        })
    }
  }, [uidb64, token, router])

  return (
    <div>
      <h2>{message}</h2>
      <p>Redirecting to homepage...</p>
      <button>
        <Link href={'/'}>back to home</Link>
      </button>
    </div>
  )
}
