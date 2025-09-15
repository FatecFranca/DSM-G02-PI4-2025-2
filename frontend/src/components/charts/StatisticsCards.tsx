"use client"

import { StatisticsResult } from "@/lib/statistics"
import { TrendingUp, TrendingDown, Minus, Calculator, Target, BarChart3 } from "lucide-react"

interface StatisticsCardsProps {
    stats: StatisticsResult
    title: string
    trend?: {
        trend: 'up' | 'down' | 'stable'
        percentage: number
    }
}

export default function StatisticsCards({ stats, title, trend }: StatisticsCardsProps) {
    const getTrendIcon = () => {
        if (!trend) return <Minus className="w-4 h-4 text-gray-400" />
        
        switch (trend.trend) {
            case 'up':
                return <TrendingUp className="w-4 h-4 text-green-500" />
            case 'down':
                return <TrendingDown className="w-4 h-4 text-red-500" />
            default:
                return <Minus className="w-4 h-4 text-gray-400" />
        }
    }

    const getTrendColor = () => {
        if (!trend) return "text-gray-600"
        
        switch (trend.trend) {
            case 'up':
                return "text-green-600"
            case 'down':
                return "text-red-600"
            default:
                return "text-gray-600"
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                {trend && (
                    <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
                        {getTrendIcon()}
                        <span className="text-sm font-medium">
                            {trend.percentage > 0 ? '+' : ''}{trend.percentage}%
                        </span>
                    </div>
                )}
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                        <Calculator className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-700">Média</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-900">{stats.mean}</p>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                        <Target className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-700">Mediana</span>
                    </div>
                    <p className="text-2xl font-bold text-green-900">{stats.median}</p>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                        <BarChart3 className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-700">Moda</span>
                    </div>
                    <p className="text-2xl font-bold text-purple-900">{stats.mode}</p>
                </div>
                
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-orange-600" />
                        <span className="text-sm font-medium text-orange-700">Desvio Padrão</span>
                    </div>
                    <p className="text-2xl font-bold text-orange-900">{stats.standardDeviation}</p>
                </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Mínimo</span>
                        <span className="text-lg font-bold text-gray-900">{stats.min}</span>
                    </div>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Máximo</span>
                        <span className="text-lg font-bold text-gray-900">{stats.max}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
