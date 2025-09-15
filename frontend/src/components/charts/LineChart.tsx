"use client"

import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface LineChartProps {
    data: any[]
    xKey: string
    yKeys: { key: string; color: string; name: string }[]
    title: string
    height?: number
}

export default function LineChart({ 
    data, 
    xKey, 
    yKeys, 
    title, 
    height = 300 
}: LineChartProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
            <ResponsiveContainer width="100%" height={height}>
                <RechartsLineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                        dataKey={xKey} 
                        tick={{ fontSize: 12 }}
                        stroke="#6b7280"
                    />
                    <YAxis 
                        tick={{ fontSize: 12 }}
                        stroke="#6b7280"
                    />
                    <Tooltip 
                        contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                    />
                    <Legend />
                    {yKeys.map((yKey) => (
                        <Line
                            key={yKey.key}
                            type="monotone"
                            dataKey={yKey.key}
                            stroke={yKey.color}
                            strokeWidth={2}
                            name={yKey.name}
                            dot={{ fill: yKey.color, strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, stroke: yKey.color, strokeWidth: 2 }}
                        />
                    ))}
                </RechartsLineChart>
            </ResponsiveContainer>
        </div>
    )
}
