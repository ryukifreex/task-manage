import { Spin } from 'antd'

export const Loading = () => {
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#fff',
    },
  }
  return (
    <div style={styles.container}>
      <Spin size="large" />
    </div>
  )
}
