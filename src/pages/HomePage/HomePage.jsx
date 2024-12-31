'use client'

import { Card } from "@/components/ui/card"
import { Pen, TreePine, Clock, Ban } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { PieChart, Pie, Cell } from 'recharts'

const barData = [
  { month: 'Jan', value: 100 },
  { month: 'Feb', value: 40 },
  { month: 'Mar', value: 120 },
  { month: 'Apr', value: 90 },
  { month: 'May', value: 75 },
  { month: 'Jun', value: 130 },
]

const pieData = [
  { name: 'Kinh tế', value: 45 },
  { name: 'Khoa học', value: 35 },
  { name: 'Công nghệ', value: 20 },
]

const COLORS = ['#f6ad55', '#68d391', '#63b3ed']

export const HomePage = () => {
  return (
    <div className="p-10 mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-display/lg/bold font-bold">Trang chủ</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-blue-500 text-white">
          <div className="flex justify-between items-center">
            <Pen className="h-6 w-6" />
            <span className="text-2xl font-bold">1</span>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <span>Yêu cầu mượn</span>
            <span>→</span>
          </div>
        </Card>

        <Card className="p-4 bg-green-500 text-white">
          <div className="flex justify-between items-center">
            <TreePine className="h-6 w-6" />
            <span className="text-2xl font-bold">1</span>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <span>Số đang mượn</span>
            <span>→</span>
          </div>
        </Card>

        <Card className="p-4 bg-orange-400 text-white">
          <div className="flex justify-between items-center">
            <Clock className="h-6 w-6" />
            <span className="text-2xl font-bold">1</span>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <span>Đến hạn trả</span>
            <span>→</span>
          </div>
        </Card>

        <Card className="p-4 bg-red-500 text-white">
          <div className="flex justify-between items-center">
            <Ban className="h-6 w-6" />
            <span className="text-2xl font-bold">1</span>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <span>Quá hạn trả</span>
            <span>→</span>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Thông kê mượn/trả sách</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Bar dataKey="value" fill="#68d391" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Phân bố theo thể loại</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {pieData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                <span>{entry.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}