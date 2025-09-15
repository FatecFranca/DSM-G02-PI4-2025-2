"use client"

import {
    Car,
    Users,
    CreditCard,
    TrendingUp,
    MapPin,
    Calendar,
    Clock,
    AlertCircle,
    BarChart3,
    Settings
} from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import api from "@/lib/api"
import ParkingSpot, { SpotStatus } from "@/components/parking/ParkingSpot"
import BarChart from "@/components/charts/BarChart"
import PieChart from "@/components/charts/PieChart"
import LineChart from "@/components/charts/LineChart"
import StatisticsCards from "@/components/charts/StatisticsCards"
import {
    calculateStatistics,
    calculateOccupancyByPeriod,
    calculateParkingStats,
    calculateTrends,
    SlotData
} from "@/lib/statistics"

type StatisticsResponse = {
    parkings: { total: number; active: number }
    parkingSlots: { total: number; available: number; occupied: number }
    sensors: { total: number; active: number }
    parkingSensors: { total: number; active: number }
    dataPoints: { sensorsData: number; parkingSensorsData: number }
}

type ContactMessage = {
    id: string
    name: string
    email: string
    message: string
    viewed: boolean
    createdAt: string | Date
}

type Parking = { id: string; name: string }
type ParkingSlot = {
    id: string
    parkingId: string
    isAvailable: boolean
    isActive: boolean
    number: number
    createdAt: string
    updatedAt: string
}
type Sensor = { id: string; type: string; parkingSlotId?: string; createdAt: string }
type SensorsData = { id: string; sensorId: string; parkingSlotId?: string; value?: string | number | boolean; createdAt: string }

function mapStatus(slot: ParkingSlot): SpotStatus {
    if (!slot.isActive) return "manutencao"
    return slot.isAvailable ? "livre" : "ocupada"
}

export default function AdminDashboard() {
    const [statsData, setStatsData] = useState<StatisticsResponse | null>(null)
    const [statsLoading, setStatsLoading] = useState<boolean>(true)
    const [statsError, setStatsError] = useState<string | null>(null)

    const [messages, setMessages] = useState<ContactMessage[]>([])
    const [messagesLoading, setMessagesLoading] = useState<boolean>(true)
    const [messagesError, setMessagesError] = useState<string | null>(null)

    const [parkings, setParkings] = useState<Parking[]>([])
    const [slots, setSlots] = useState<ParkingSlot[]>([])
    const [slotsLoading, setSlotsLoading] = useState<boolean>(true)
    const [slotsError, setSlotsError] = useState<string | null>(null)
    const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(null)
    const [slotInfoLoading, setSlotInfoLoading] = useState(false)
    const [slotSensors, setSlotSensors] = useState<Sensor[]>([])
    const [slotRecentData, setSlotRecentData] = useState<SensorsData[]>([])

    useEffect(() => {
        let mounted = true
        setStatsLoading(true)
        setStatsError(null)
        api
            .get<StatisticsResponse>("/statistics", { cache: "no-store" })
            .then((data) => {
                if (!mounted) return
                setStatsData(data)
            })
            .catch((e: unknown) => {
                if (!mounted) return
                setStatsError(e instanceof Error ? e.message : "Erro ao carregar estatísticas")
            })
            .finally(() => {
                if (!mounted) return
                setStatsLoading(false)
            })
        return () => {
            mounted = false
        }
    }, [])

    useEffect(() => {
        let mounted = true
        setMessagesLoading(true)
        setMessagesError(null)
        api
            .get<ContactMessage[]>("/contact-messages", { cache: "no-store" })
            .then((data) => {
                if (!mounted) return
                setMessages(Array.isArray(data) ? data : [])
            })
            .catch((e: unknown) => {
                if (!mounted) return
                setMessagesError(e instanceof Error ? e.message : "Erro ao carregar mensagens")
            })
            .finally(() => {
                if (!mounted) return
                setMessagesLoading(false)
            })
        return () => {
            mounted = false
        }
    }, [])

    useEffect(() => {
        let mounted = true
        setSlotsLoading(true)
        setSlotsError(null)
        Promise.all([
            api.get<Parking[]>("/parkings", { cache: "no-store" }),
            api.get<ParkingSlot[]>("/parking-slots", { cache: "no-store" }),
        ])
            .then(([ps, sl]) => {
                if (!mounted) return
                setParkings(ps)
                setSlots(sl)
            })
            .catch((e: unknown) => setSlotsError(e instanceof Error ? e.message : "Erro ao carregar vagas"))
            .finally(() => setSlotsLoading(false))
        return () => { mounted = false }
    }, [])

    const stats = useMemo(() => {
        if (!statsData) {
            return [
                { title: "Vagas Totais", value: "-", change: "", changeType: "neutral", icon: Car, color: "blue" },
                { title: "Vagas Ocupadas", value: "-", change: "", changeType: "neutral", icon: MapPin, color: "green" },
                { title: "Sensores Ativos", value: "-", change: "", changeType: "neutral", icon: Users, color: "purple" },
                { title: "Estacionamentos Ativos", value: "-", change: "", changeType: "neutral", icon: CreditCard, color: "yellow" },
            ] as const
        }
        return [
            {
                title: "Vagas Totais",
                value: String(statsData.parkingSlots.total),
                change: "",
                changeType: "neutral",
                icon: Car,
                color: "blue"
            },
            {
                title: "Vagas Ocupadas",
                value: String(statsData.parkingSlots.occupied),
                change: "",
                changeType: "neutral",
                icon: MapPin,
                color: "green"
            },
            {
                title: "Sensores Ativos",
                value: String(statsData.sensors.active),
                change: "",
                changeType: "neutral",
                icon: Users,
                color: "purple"
            },
            {
                title: "Estacionamentos Ativos",
                value: String(statsData.parkings.active),
                change: "",
                changeType: "neutral",
                icon: CreditCard,
                color: "yellow"
            }
        ]
    }, [statsData])

    const recentActivity = messages

    const alerts = [
        {
            id: 1,
            type: "warning",
            message: "Vaga B03 em manutenção há 2 horas",
            time: "5 min atrás"
        },
        {
            id: 2,
            type: "info",
            message: "Manutenção programada para hoje às 22h",
            time: "1 hora atrás"
        }
    ]

    const occupationStats = useMemo(() => {
        const total = slots.length
        const livre = slots.filter(s => s.isActive && s.isAvailable).length
        const ocupada = slots.filter(s => s.isActive && !s.isAvailable).length
        const manutencao = slots.filter(s => !s.isActive).length
        return { total, livre, ocupada, manutencao }
    }, [slots])

    // Dados para gráficos e estatísticas
    const chartsData = useMemo(() => {
        // Dados para gráfico de pizza (distribuição de status)
        const pieData = [
            { name: "Livre", value: occupationStats.livre, color: "#10b981" },
            { name: "Ocupada", value: occupationStats.ocupada, color: "#ef4444" },
            { name: "Manutenção", value: occupationStats.manutencao, color: "#f59e0b" }
        ]

        // Dados para gráfico de barras por estacionamento
        const parkingStats = calculateParkingStats(slots, parkings)
        const barData = parkingStats.map(stat => ({
            estacionamento: stat.parkingName,
            ocupacao: stat.occupancyRate,
            total: stat.total,
            ocupadas: stat.occupied,
            livres: stat.available
        }))

        // Dados para gráfico de linha (ocupação por período)
        const occupancyByDay = calculateOccupancyByPeriod(slots, 'day')
        const lineData = occupancyByDay.slice(-7).map(item => ({
            data: new Date(item.period).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
            ocupacao: item.occupancyRate,
            ocupadas: item.occupied,
            total: item.total
        }))

        // Estatísticas numéricas
        const occupancyRates = parkingStats.map(stat => stat.occupancyRate)
        const occupancyStats = calculateStatistics(occupancyRates)
        const occupancyTrend = calculateTrends(occupancyRates)

        return {
            pieData,
            barData,
            lineData,
            occupancyStats,
            occupancyTrend,
            parkingStats
        }
    }, [slots, parkings, occupationStats])

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600">Visão geral dos estacionamentos</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                <p className={`text-sm ${stat.changeType === 'increase' ? 'text-green-600' : stat.changeType === 'decrease' ? 'text-red-600' : 'text-gray-600'}`}>
                                    {stat.change}
                                </p>
                            </div>
                            <div className={`p-3 rounded-lg ${stat.color === 'blue' ? 'bg-blue-100' : stat.color === 'green' ? 'bg-green-100' : stat.color === 'purple' ? 'bg-purple-100' : 'bg-yellow-100'}`}>
                                <stat.icon className={`w-6 h-6 ${stat.color === 'blue' ? 'text-blue-600' : stat.color === 'green' ? 'text-green-600' : stat.color === 'purple' ? 'text-purple-600' : 'text-yellow-600'}`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="space-y-6">
                <StatisticsCards
                    stats={chartsData.occupancyStats}
                    title="Estatísticas de Ocupação"
                    trend={chartsData.occupancyTrend}
                />

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Pie Chart - Distribuição de Status */}
                    <PieChart
                        data={chartsData.pieData}
                        title="Distribuição de Status das Vagas"
                        height={350}
                    />

                    {/* Bar Chart - Ocupação por Estacionamento */}
                    <BarChart
                        data={chartsData.barData}
                        xKey="estacionamento"
                        yKey="ocupacao"
                        title="Taxa de Ocupação por Estacionamento (%)"
                        color="#3b82f6"
                        height={350}
                    />
                </div>

                {/* Line Chart - Tendência de Ocupação */}
                <LineChart
                    data={chartsData.lineData}
                    xKey="data"
                    yKeys={[
                        { key: "ocupacao", color: "#ef4444", name: "Taxa de Ocupação (%)" },
                        { key: "ocupadas", color: "#f59e0b", name: "Vagas Ocupadas" }
                    ]}
                    title="Tendência de Ocupação dos Últimos 7 Dias"
                    height={350}
                />

                {/* Detailed Statistics Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Estatísticas Detalhadas por Estacionamento</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Estacionamento</th>
                                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Total</th>
                                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Ocupadas</th>
                                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Livres</th>
                                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Manutenção</th>
                                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Taxa Ocupação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {chartsData.parkingStats.map((stat, index) => (
                                    <tr key={stat.parkingId} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                                        <td className="py-3 px-4 font-medium text-gray-900">{stat.parkingName}</td>
                                        <td className="py-3 px-4 text-center text-gray-700">{stat.total}</td>
                                        <td className="py-3 px-4 text-center text-red-600 font-medium">{stat.occupied}</td>
                                        <td className="py-3 px-4 text-center text-green-600 font-medium">{stat.available}</td>
                                        <td className="py-3 px-4 text-center text-orange-600 font-medium">{stat.maintenance}</td>
                                        <td className="py-3 px-4 text-center">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${stat.occupancyRate >= 80 ? 'bg-red-100 text-red-800' :
                                                stat.occupancyRate >= 60 ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-green-100 text-green-800'
                                                }`}>
                                                {stat.occupancyRate}%
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Alerts and Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Alerts */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Alertas</h2>
                    <div className="space-y-3">
                        {alerts.map((alert) => (
                            <div key={alert.id} className="flex items-start space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-sm text-yellow-800">{alert.message}</p>
                                    <p className="text-xs text-yellow-600 mt-1">{alert.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
                    <div className="grid grid-cols-2 gap-3">
                        <button className="flex items-center justify-center space-x-2 p-3 bg-primary-50 border border-primary-200 rounded-lg hover:bg-primary-100 transition-colors">
                            <Calendar className="w-5 h-5 text-primary-600" />
                            <span className="text-sm font-medium text-primary-700">Nova Reserva</span>
                        </button>
                        <button className="flex items-center justify-center space-x-2 p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                            <Users className="w-5 h-5 text-gray-600" />
                            <span className="text-sm font-medium text-gray-700">Adicionar Funcionário</span>
                        </button>
                        <button className="flex items-center justify-center space-x-2 p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                            <BarChart3 className="w-5 h-5 text-gray-600" />
                            <span className="text-sm font-medium text-gray-700">Relatório</span>
                        </button>
                        <button className="flex items-center justify-center space-x-2 p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                            <Settings className="w-5 h-5 text-gray-600" />
                            <span className="text-sm font-medium text-gray-700">Configurações</span>
                        </button>
                    </div>
                </div>
            </div>



            {/* Slot Info Modal */}
            {selectedSlot && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
                        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-900">Vaga #{String(selectedSlot.number).padStart(2, '0')}</h3>
                            <button className="text-gray-500 hover:text-gray-800" onClick={() => setSelectedSlot(null)}>Fechar</button>
                        </div>
                        <div className="p-6 space-y-4 overflow-y-auto">
                            <div className="grid grid-cols-3 gap-3">
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                                    <p className="text-xs text-gray-500">Estacionamento</p>
                                    <p className="text-sm font-semibold text-gray-900 truncate">{parkings.find(p => p.id === selectedSlot.parkingId)?.name || selectedSlot.parkingId}</p>
                                </div>
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                                    <p className="text-xs text-gray-500">Status</p>
                                    <p className="text-sm font-semibold text-gray-900">{mapStatus(selectedSlot) === 'livre' ? 'Livre' : mapStatus(selectedSlot) === 'ocupada' ? 'Ocupada' : 'Manutenção'}</p>
                                </div>
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                                    <p className="text-xs text-gray-500">Atualizado</p>
                                    <p className="text-sm font-semibold text-gray-900">{new Date(selectedSlot.updatedAt).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</p>
                                </div>
                            </div>

                            {mapStatus(selectedSlot) === 'ocupada' && (
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-sm font-semibold text-gray-900">Sensores e Leituras Recentes</p>
                                        {slotInfoLoading && <span className="text-xs text-gray-500">Carregando...</span>}
                                    </div>
                                    {slotSensors.length > 0 ? (
                                        <p className="text-xs text-gray-600 mb-2">Sensores: {slotSensors.map(s => s.type).join(', ')}</p>
                                    ) : (
                                        !slotInfoLoading && <p className="text-xs text-gray-500">Nenhum sensor vinculado.</p>
                                    )}
                                    <div className="max-h-40 overflow-auto">
                                        {slotRecentData.slice(0, 8).map(d => (
                                            <div key={d.id} className="flex items-center justify-between text-xs text-gray-700 py-0.5">
                                                <span className="truncate mr-2">{String(d.value)}</span>
                                                <span className="text-gray-400 whitespace-nowrap">{new Date(d.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                        ))}
                                        {!slotInfoLoading && slotRecentData.length === 0 && (
                                            <p className="text-xs text-gray-500">Sem dados recentes.</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl text-right">
                            <button className="px-4 py-2 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800" onClick={() => setSelectedSlot(null)}>Fechar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
