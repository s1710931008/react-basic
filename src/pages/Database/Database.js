import { useParams } from 'react-router-dom'

export default function Database() {
  const { id } = useParams()

  return (
    <div>
      <h1>Database Page</h1>
      {id ? <p>獲取數據 ID: {id}</p> : <p>請選擇一筆數據</p>}
    </div>
  )
}

