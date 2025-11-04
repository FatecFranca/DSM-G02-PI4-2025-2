"use client"

import { useEffect, useMemo, useState } from "react"
import api from "@/lib/api"
import LineChart from "@/components/charts/LineChart"
import { Activity, BarChart3, RefreshCcw, Search, Thermometer, Droplets, Sun, Gauge, Volume2, Vibrate, Move, Wind } from "lucide-react"
import { AlertCircle } from "lucide-react"

type ParkingSensorData = {
    id: string
    parkingSensorId: string
    data: string
    createdAt: string
    parkingSensor: {
        id: string
        name: string
        type: string
        parking: {
            id: string
            name: string
            address: string
            city: string
        }
    }
}

type Parking = {
    id: string
    name: string
}

// Funções de estatística
function calculateMean(values: number[]): number {
    if (values.length === 0) return 0
    return values.reduce((a, b) => a + b, 0) / values.length
}

function calculateMedian(values: number[]): number {
    if (values.length === 0) return 0
    const sorted = [...values].sort((a, b) => a - b)
    const mid = Math.floor(sorted.length / 2)
    return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid]
}

function calculateMode(values: number[]): number | null {
    if (values.length === 0) return null
    const frequency: Record<number, number> = {}
    values.forEach(v => {
        frequency[v] = (frequency[v] || 0) + 1
    })
    const maxFreq = Math.max(...Object.values(frequency))
    const modes = Object.keys(frequency).filter(k => frequency[Number(k)] === maxFreq).map(Number)
    return modes.length === 1 ? modes[0] : null
}

function calculateMin(values: number[]): number {
    return values.length > 0 ? Math.min(...values) : 0
}

function calculateMax(values: number[]): number {
    return values.length > 0 ? Math.max(...values) : 0
}

function calculateStdDev(values: number[]): number {
    if (values.length === 0) return 0
    const mean = calculateMean(values)
    const squaredDiffs = values.map(v => Math.pow(v - mean, 2))
    const avgSquaredDiff = calculateMean(squaredDiffs)
    return Math.sqrt(avgSquaredDiff)
}

function getSensorIcon(type: string) {
    switch (type) {
        case "TEMPERATURE":
            return Thermometer
        case "HUMIDITY":
            return Droplets
        case "LIGHT":
            return Sun
        case "PRESSURE":
            return Gauge
        case "SOUND":
            return Volume2
        case "VIBRATION":
            return Vibrate
        case "MOTION":
            return Move
        case "GAS":
            return Wind
        default:
            return Activity
    }
}

function getSensorUnit(type: string): string {
    switch (type) {
        case "TEMPERATURE":
            return "°C"
        case "HUMIDITY":
            return "%"
        case "LIGHT":
            return "lux"
        case "PRESSURE":
            return "hPa"
        case "SOUND":
            return "dB"
        case "VIBRATION":
            return "Hz"
        case "MOTION":
            return ""
        case "GAS":
            return "ppm"
        default:
            return ""
    }
}

export default function InformacoesSensoresPage() {
    const [sensorData, setSensorData] = useState<ParkingSensorData[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [parkings, setParkings] = useState<Parking[]>([])
    const [selectedParking, setSelectedParking] = useState<string>("todos")
    const [selectedType, setSelectedType] = useState<string>("todos")
    const [timeRange, setTimeRange] = useState<"hour" | "day" | "week" | "all">("day")
    const [autoRefresh, setAutoRefresh] = useState(true)

    useEffect(() => {
        loadData()
        loadParkings()
    }, [])

    useEffect(() => {
        if (!autoRefresh) return
        const interval = setInterval(() => {
            loadData()
        }, 5000) // Atualiza a cada 5 segundos
        return () => clearInterval(interval)
    }, [autoRefresh, selectedParking, selectedType])

    const loadData = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await api.get<ParkingSensorData[] | { data: ParkingSensorData[] }>("/parking-sensor-data", { cache: "no-store" })
            // Se a resposta for paginada, extrair o array data, senão usar diretamente
            const data = Array.isArray(response) ? response : (response as any).data || []
            setSensorData(Array.isArray(data) ? data : [])
        } catch (e: any) {
            setError(e?.message || "Erro ao carregar dados dos sensores")
        } finally {
            setLoading(false)
        }
    }

    const loadParkings = async () => {
        try {
            const data = await api.get<Parking[]>("/parkings", { cache: "no-store" })
            setParkings(Array.isArray(data) ? data : [])
        } catch (e) {
            console.error("Erro ao carregar estacionamentos", e)
        }
    }

    // Filtrar dados
    const filteredData = useMemo(() => {
        let filtered = sensorData

        // Filtro por estacionamento
        if (selectedParking !== "todos") {
            filtered = filtered.filter(d => d.parkingSensor.parking.id === selectedParking)
        }

        // Filtro por tipo
        if (selectedType !== "todos") {
            filtered = filtered.filter(d => d.parkingSensor.type === selectedType)
        }

        // Filtro por tempo
        const now = new Date()
        const timeFilters: Record<typeof timeRange, number> = {
            hour: 60 * 60 * 1000,
            day: 24 * 60 * 60 * 1000,
            week: 7 * 24 * 60 * 60 * 1000,
            all: Infinity
        }
        const timeLimit = timeFilters[timeRange]
        if (timeLimit !== Infinity) {
            const cutoff = new Date(now.getTime() - timeLimit)
            filtered = filtered.filter(d => new Date(d.createdAt) >= cutoff)
        }

        return filtered
    }, [sensorData, selectedParking, selectedType, timeRange])

    // Agrupar dados por sensor
    const groupedBySensor = useMemo(() => {
        const grouped: Record<string, ParkingSensorData[]> = {}
        filteredData.forEach(d => {
            const key = d.parkingSensorId
            if (!grouped[key]) {
                grouped[key] = []
            }
            grouped[key].push(d)
        })
        return grouped
    }, [filteredData])

    // Processar dados para estatísticas e gráficos
    const sensorStats = useMemo(() => {
        return Object.entries(groupedBySensor).map(([sensorId, data]) => {
            const sensor = data[0].parkingSensor
            const values = data.map(d => parseFloat(d.data)).filter(v => !isNaN(v))
            
            // Ordenar por data para gráfico
            const sortedData = [...data].sort((a, b) => 
                new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            )

            // Preparar dados para gráfico (últimos pontos)
            const chartData = sortedData.slice(-50).map(d => ({
                data: new Date(d.createdAt).toLocaleString('pt-BR', { 
                    day: '2-digit', 
                    month: '2-digit', 
                    hour: '2-digit', 
                    minute: '2-digit' 
                }),
                valor: parseFloat(d.data) || 0
            }))

            // Estatísticas
            const stats = {
                current: values.length > 0 ? values[values.length - 1] : 0,
                mean: calculateMean(values),
                median: calculateMedian(values),
                mode: calculateMode(values),
                min: calculateMin(values),
                max: calculateMax(values),
                stdDev: calculateStdDev(values),
                count: values.length
            }

            return {
                sensorId,
                sensor,
                data: sortedData,
                values,
                chartData,
                stats
            }
        })
    }, [groupedBySensor])

    // Tipos únicos de sensores
    const sensorTypes = useMemo(() => {
        const types = new Set(sensorData.map(d => d.parkingSensor.type))
        return Array.from(types)
    }, [sensorData])

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Informações de Sensores</h1>
                    <p className="text-gray-600">Monitoramento em tempo real dos sensores de estacionamento</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setAutoRefresh(!autoRefresh)}
                        className={`px-4 py-2 rounded-lg border flex items-center gap-2 ${
                            autoRefresh 
                                ? 'bg-green-50 border-green-200 text-green-700' 
                                : 'bg-gray-50 border-gray-300 text-gray-700'
                        }`}
                    >
                        <Activity className={`w-4 h-4 ${autoRefresh ? 'animate-pulse' : ''}`} />
                        {autoRefresh ? 'Atualizando' : 'Pausado'}
                    </button>
                    <button
                        onClick={loadData}
                        disabled={loading}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 disabled:opacity-50"
                    >
                        <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        Atualizar
                    </button>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <p className="text-red-700">{error}</p>
                    </div>
                </div>
            )}

            {/* Filters */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Estacionamento</label>
                        <select
                            value={selectedParking}
                            onChange={(e) => setSelectedParking(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                        >
                            <option value="todos">Todos os Estacionamentos</option>
                            {parkings.map(p => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Sensor</label>
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                        >
                            <option value="todos">Todos os Tipos</option>
                            {sensorTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Período</label>
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value as typeof timeRange)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                        >
                            <option value="hour">Última Hora</option>
                            <option value="day">Último Dia</option>
                            <option value="week">Última Semana</option>
                            <option value="all">Todos</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Sensor Cards */}
            {loading && sensorStats.length === 0 ? (
                <div className="text-center py-8 text-gray-500">Carregando dados...</div>
            ) : sensorStats.length === 0 ? (
                <div className="text-center py-8 text-gray-500">Nenhum dado de sensor encontrado</div>
            ) : (
                <div className="space-y-6">
                    {sensorStats.map(({ sensor, stats, chartData }) => {
                        const Icon = getSensorIcon(sensor.type)
                        const unit = getSensorUnit(sensor.type)

                        return (
                            <div key={sensor.id} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                                {/* Header */}
                                <div className="bg-gradient-to-r from-primary-50 to-primary-100 p-6 border-b border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                                                <Icon className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900">{sensor.name}</h3>
                                                <p className="text-sm text-gray-600">
                                                    {sensor.parking.name} • {sensor.parking.city}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">{sensor.type}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-600">Valor Atual</p>
                                            <p className="text-3xl font-bold text-primary-600">
                                                {stats.current.toFixed(2)} <span className="text-lg">{unit}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Statistics Grid */}
                                <div className="p-6">
                                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <p className="text-xs text-gray-500 mb-1">Média</p>
                                            <p className="text-lg font-bold text-gray-900">
                                                {stats.mean.toFixed(2)} {unit}
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <p className="text-xs text-gray-500 mb-1">Mediana</p>
                                            <p className="text-lg font-bold text-gray-900">
                                                {stats.median.toFixed(2)} {unit}
                                            </p>
                                        </div>
                                        {stats.mode !== null && (
                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <p className="text-xs text-gray-500 mb-1">Moda</p>
                                                <p className="text-lg font-bold text-gray-900">
                                                    {stats.mode.toFixed(2)} {unit}
                                                </p>
                                            </div>
                                        )}
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <p className="text-xs text-gray-500 mb-1">Mínimo</p>
                                            <p className="text-lg font-bold text-red-600">
                                                {stats.min.toFixed(2)} {unit}
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <p className="text-xs text-gray-500 mb-1">Máximo</p>
                                            <p className="text-lg font-bold text-green-600">
                                                {stats.max.toFixed(2)} {unit}
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <p className="text-xs text-gray-500 mb-1">Desvio Padrão</p>
                                            <p className="text-lg font-bold text-gray-900">
                                                {stats.stdDev.toFixed(2)} {unit}
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <p className="text-xs text-gray-500 mb-1">Total de Leituras</p>
                                            <p className="text-lg font-bold text-gray-900">
                                                {stats.count}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Chart */}
                                    {chartData.length > 0 && (
                                        <div className="mt-6">
                                            <h4 className="text-sm font-semibold text-gray-700 mb-3">
                                                Evolução Temporal (Últimas {chartData.length} leituras)
                                            </h4>
                                            <LineChart
                                                data={chartData}
                                                xKey="data"
                                                yKeys={[
                                                    { key: "valor", color: "#3b82f6", name: sensor.name }
                                                ]}
                                                title=""
                                                height={300}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

