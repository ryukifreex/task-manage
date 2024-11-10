import { Layout, Typography, Space, theme } from 'antd'
import { GithubOutlined, LinkedinOutlined } from '@ant-design/icons'

export default function Footer() {
  const { Footer } = Layout
  const { Text, Link } = Typography
  return (
    <Footer
      style={{
        textAlign: 'center',
        padding: '20px 0',
      }}
    >
      <Text>&copy; {new Date().getFullYear()} Ryuki Kusuda</Text>
      <Space style={{ marginLeft: 10 }}>
        <Link
          href="https://github.com/ryukifreex"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'inherit' }}
        >
          <GithubOutlined /> GitHub
        </Link>
        <Link
          href="https://www.linkedin.com/in/ryuki-kusuda-573bb3243/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'inherit' }}
        >
          <LinkedinOutlined /> LinkedIn
        </Link>
      </Space>
    </Footer>
  )
}
