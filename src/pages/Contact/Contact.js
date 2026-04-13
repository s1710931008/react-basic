import { useEffect, useState } from 'react'

const mockData = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  username: `user_${i + 1}`,
  phone: `09${String(10000000 + i).slice(1)}`,
}))

export default function Contact() {
  const [list, setList] = useState([])
  const [page, setPage] = useState(1)

  const limit = 10
  const totalPages = Math.ceil(mockData.length / limit)

  useEffect(() => {
    const start = (page - 1) * limit
    const end = start + limit
    setList(mockData.slice(start, end))
  }, [page])

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Contact List</h1>
            <p className="mt-1 text-sm text-gray-500">
              每頁顯示 20 筆資料
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-sm text-gray-700">
              <tr>
                <th className="px-6 py-4 font-semibold">ID</th>
                <th className="px-6 py-4 font-semibold">Username</th>
                <th className="px-6 py-4 font-semibold">Phone</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {list.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{item.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {item.username}
                  </td>
                  <td className="px-6 py-4">{item.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            上一頁
          </button>

          <span className="text-sm text-gray-600">
            第 <span className="font-semibold text-gray-900">{page}</span> / {totalPages} 頁
          </span>

          <button
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            下一頁
          </button>
        </div>
      </div>
    </div>
  )
}