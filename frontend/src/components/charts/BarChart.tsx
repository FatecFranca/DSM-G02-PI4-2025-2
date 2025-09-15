"use client"

import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface BarChartProps {
    data: any[]
    xKey: string
    yKey: string
    title: string
    color?: string
    height?: number
}

export default function BarChart({ 
    data, 
    xKey, 
    yKey, 
    title, 
    color = "#3b82f6",
    height = 300 
}: BarChartProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
            <ResponsiveContainer width="100%" height={height}>
                <RechartsBarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
                    <Bar 
                        dataKey={yKey} 
                        fill={color}
                        radius={[4, 4, 0, 0]}
                    />
                </RechartsBarChart>
            </ResponsiveContainer>
        </div>
    )
}
