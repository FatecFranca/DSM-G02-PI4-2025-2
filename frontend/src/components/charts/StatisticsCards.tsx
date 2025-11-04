"use client"

import { StatisticsResult } from "@/lib/statistics"
import { TrendingUp, TrendingDown, Minus, Calculator, Target, BarChart3, Activity, Zap, ArrowUpDown, ChartLine, Bell } from "lucide-react"

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

            {/* Estatísticas Básicas */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                        <Calculator className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-700">Média</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-900">{stats.mean.toFixed(2)}</p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                        <Target className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-700">Mediana</span>
                    </div>
                    <p className="text-2xl font-bold text-green-900">{stats.median.toFixed(2)}</p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                        <BarChart3 className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-700">Moda</span>
                    </div>
                    <p className="text-2xl font-bold text-purple-900">{stats.mode.toFixed(2)}</p>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                        <Activity className="w-4 h-4 text-orange-600" />
                        <span className="text-sm font-medium text-orange-700">Desvio Padrão</span>
                    </div>
                    <p className="text-2xl font-bold text-orange-900">{stats.standardDeviation.toFixed(2)}</p>
                </div>
            </div>

            {/* Estatísticas Avançadas */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">


                <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                        <Zap className="w-4 h-4 text-pink-600" />
                        <span className="text-sm font-medium text-pink-700">Curtose</span>
                    </div>
                    <p className="text-2xl font-bold text-pink-900">{stats.kurtosis.toFixed(2)}</p>
                    <p className="text-xs text-pink-600 mt-1">
                        {stats.kurtosis > 0 ? 'Leptocúrtica' : stats.kurtosis < 0 ? 'Platicúrtica' : 'Mesocúrtica'}
                    </p>
                </div>

                {stats.probability && (
                    <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                            <Target className="w-4 h-4 text-teal-600" />
                            <span className="text-sm font-medium text-teal-700">Probabilidade</span>
                        </div>
                        <p className="text-lg font-bold text-teal-900">
                            {(stats.probability.cumulative * 100).toFixed(1)}%
                        </p>
                        <p className="text-xs text-teal-600 mt-1">Percentil: {stats.probability.percentile.toFixed(1)}%</p>
                    </div>
                )}

                {stats.regression && (
                    <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-3">
                            <ChartLine className="w-4 h-4 text-cyan-600" />
                            <span className="text-sm font-medium text-cyan-700">Regressão Linear</span>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-cyan-700">Coeficiente Angular:</span>
                                <span className="text-sm font-bold text-cyan-900">{stats.regression.slope.toFixed(3)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-cyan-700">Intercepto:</span>
                                <span className="text-sm font-bold text-cyan-900">{stats.regression.intercept.toFixed(3)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-cyan-700">R²:</span>
                                <span className="text-sm font-bold text-cyan-900">{(stats.regression.rSquared * 100).toFixed(1)}%</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
