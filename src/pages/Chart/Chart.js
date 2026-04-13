import { useMemo, useState } from 'react'
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
} from 'chart.js'
import { Pie, Bar, Line } from 'react-chartjs-2'

// 🔥 註冊
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title
)

// mock 資料
const mockData = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    username: `user_${i + 1}`,
    phone: `09${String(10000000 + i).slice(1)}`,
}))

export default function ChartPage() {
    const [keyword, setKeyword] = useState('')

    // 🔍 搜尋
    const filteredList = useMemo(() => {
        const text = keyword.toLowerCase()
        if (!text) return mockData

        return mockData.filter(item =>
            String(item.id).includes(text) ||
            item.username.toLowerCase().includes(text) ||
            item.phone.includes(text)
        )
    }, [keyword])

    // 🔥 KPI
    const totalCount = filteredList.length

    const averageId = useMemo(() => {
        if (!filteredList.length) return 0
        const sum = filteredList.reduce((acc, item) => acc + item.id, 0)
        return (sum / filteredList.length).toFixed(2)
    }, [filteredList])

    // 🔥 Pie（phone 分布）
    const pieData = useMemo(() => {
        const map = {}

        filteredList.forEach(item => {
            const prefix = item.phone.slice(0, 3)
            map[prefix] = (map[prefix] || 0) + 1
        })

        return {
            labels: Object.keys(map),
            datasets: [{
                data: Object.values(map),
                backgroundColor: [
                    '#3b82f6', '#10b981', '#f59e0b',
                    '#ef4444', '#8b5cf6', '#14b8a6'
                ]
            }]
        }
    }, [filteredList])

    // 🔥 Bar（Top10）
    const barData = useMemo(() => {
        const top10 = filteredList.slice(0, 10)

        return {
            labels: top10.map(i => i.username),
            datasets: [{
                label: 'ID',
                data: top10.map(i => i.id),
                backgroundColor: '#3b82f6'
            }]
        }
    }, [filteredList])

    // 🔥 Line（折線圖）
    const lineData = useMemo(() => {
        const first20 = filteredList.slice(0, 20)

        return {
            labels: first20.map(i => i.id),
            datasets: [
                {
                    label: 'ID Trend',
                    data: first20.map(i => i.id),
                    borderColor: '#10b981',
                    backgroundColor: '#10b981',
                    tension: 0.3
                }
            ]
        }
    }, [filteredList])

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Dashboard</h1>

                    <input
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="搜尋..."
                        className="border px-3 py-2 rounded"
                    />
                </div>

                {/* KPI */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded shadow">
                        <p className="text-gray-500">總數</p>
                        <h2 className="text-2xl font-bold">{totalCount}</h2>
                    </div>

                    <div className="bg-white p-4 rounded shadow">
                        <p className="text-gray-500">平均 ID</p>
                        <h2 className="text-2xl font-bold">{averageId}</h2>
                    </div>

                    <div className="bg-white p-4 rounded shadow">
                        <p className="text-gray-500">搜尋</p>
                        <h2 className="text-lg font-bold">{keyword || '全部'}</h2>
                    </div>
                </div>

                {/* 圖表區 */}
                <div className="grid grid-cols-2 gap-6">

                    {/* Pie */}
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="mb-3 font-semibold">Phone 分布</h3>
                        <Pie data={pieData} />
                    </div>

                    {/* Bar */}
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="mb-3 font-semibold">Top 10 ID</h3>
                        <Bar data={barData} />
                    </div>

                    {/* 🔥 Line（新加入） */}
                    <div className="bg-white p-4 rounded shadow col-span-2">
                        <h3 className="mb-3 font-semibold">ID 趨勢（折線圖）</h3>
                        <Line data={lineData} />
                    </div>

                </div>

            </div>
        </div>
    )
}