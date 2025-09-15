"use client"

import { useEffect, useMemo, useState } from "react"
import { 
    TrendingUp, 
    TrendingDown,
    Calendar,
    Download,
    Filter,
    DollarSign,
    Users,
    Car,
    Clock
} from "lucide-react"
import Button from "@/components/ui/Button"
import api from "@/lib/api"

type StatisticsResponse = {
    parkings: { total: number; active: number }
    parkingSlots: { total: number; available: number; occupied: number }
    sensors: { total: number; active: number }
    parkingSensors: { total: number; active: number }
    dataPoints: { sensorsData: number; parkingSensorsData: number }
}

type Parking = { id: string; name: string }
type ParkingSlot = { id: string; parkingId: string; isAvailable: boolean; isActive: boolean; number: number }
type ContactMessage = { id: string; name: string; email: string; message: string; createdAt: string }

export default function RelatoriosPage() {
    const [selectedPeriod, setSelectedPeriod] = useState("week")

    const [stats, setStats] = useState<StatisticsResponse | null>(null)
    const [parkings, setParkings] = useState<Parking[]>([])
    const [slots, setSlots] = useState<ParkingSlot[]>([])
    const [messages, setMessages] = useState<ContactMessage[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let mounted = true
        setLoading(true)
        setError(null)
        Promise.all([
            api.get<StatisticsResponse>("/statistics", { cache: "no-store" }),
            api.get<Parking[]>("/parkings", { cache: "no-store" }),
            api.get<ParkingSlot[]>("/parking-slots", { cache: "no-store" }),
            api.get<ContactMessage[]>("/contact-messages", { cache: "no-store" }),
        ])
            .then(([s, p, sl, m]) => {
                if (!mounted) return
                setStats(s)
                setParkings(p)
                setSlots(sl)
                setMessages(Array.isArray(m) ? m : [])
            })
            .catch((e: unknown) => setError(e instanceof Error ? e.message : "Erro ao carregar dados"))
            .finally(() => setLoading(false))
        return () => { mounted = false }
    }, [])

    const occupancyByParking = useMemo(() => {
        const byId: Record<string, { name: string; total: number; occupied: number }> = {}
        parkings.forEach(p => { byId[p.id] = { name: p.name, total: 0, occupied: 0 } })
        slots.forEach(s => {
            const group = byId[s.parkingId] || { name: s.parkingId, total: 0, occupied: 0 }
            group.total += 1
            if (!s.isAvailable && s.isActive) group.occupied += 1
            byId[s.parkingId] = group
        })
        return Object.values(byId).map(g => ({ label: g.name, value: g.total ? Math.round((g.occupied / g.total) * 100) : 0 }))
    }, [parkings, slots])

    const statusDistribution = useMemo(() => {
        const total = slots.length || 1
        const manutencao = slots.filter(s => !s.isActive).length
        const ocupada = slots.filter(s => s.isActive && !s.isAvailable).length
        const livre = slots.filter(s => s.isActive && s.isAvailable).length
        return [
            { label: "Livre", value: Math.round((livre / total) * 100), color: "bg-green-500" },
            { label: "Ocupada", value: Math.round((ocupada / total) * 100), color: "bg-red-500" },
            { label: "Manutenção", value: Math.round((manutencao / total) * 100), color: "bg-gray-500" },
        ]
    }, [slots])

    const avgOccupancy = useMemo(() => {
        if (!stats) return 0
        const total = stats.parkingSlots.total || 1
        return Math.round((stats.parkingSlots.occupied / total) * 100)
    }, [stats])

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Relatórios</h1>
                    <p className="text-gray-600">Analise o desempenho dos estacionamentos</p>
                </div>
                <div className="flex gap-2">
                    <select
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                        <option value="week">Última Semana</option>
                        <option value="month">Último Mês</option>
                        <option value="quarter">Último Trimestre</option>
                        <option value="year">Último Ano</option>
                    </select>
                    <Button variant="secondary" size="md" icon="none">
                        Exportar
                    </Button>
                </div>
            </div>

            {/* Key Metrics (dinâmico) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Vagas Totais</p>
                            <p className="text-2xl font-bold text-gray-900">{stats ? stats.parkingSlots.total : "—"}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <Car className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Disponíveis</p>
                            <p className="text-2xl font-bold text-gray-900">{stats ? stats.parkingSlots.available : "—"}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Ocupadas</p>
                            <p className="text-2xl font-bold text-gray-900">{stats ? stats.parkingSlots.occupied : "—"}</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <TrendingDown className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Ocupação Média</p>
                            <p className="text-2xl font-bold text-gray-900">{avgOccupancy}%</p>
                        </div>
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                            <Car className="w-6 h-6 text-orange-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts (dinâmico) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Ocupação por Estacionamento */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Ocupação por Estacionamento</h3>
                        <Button variant="secondary" size="sm" icon="none">
                            Exportar
                        </Button>
                    </div>
                    
                    <div className="space-y-4">
                        {occupancyByParking.map((item, index) => (
                            <div key={index} className="flex items-center space-x-4">
                                <div className="flex-1">
                                    <div className="bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${item.value}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="w-48 text-sm font-medium text-gray-900 truncate text-right">
                                    {item.label}
                                </div>
                                <div className="w-12 text-sm font-medium text-gray-900 text-right">
                                    {item.value}%
                                </div>
                            </div>
                        ))}
                        {occupancyByParking.length === 0 && (
                            <div className="text-sm text-gray-500">Sem dados de ocupação por estacionamento.</div>
                        )}
                    </div>
                </div>

                {/* Distribuição de Status */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Distribuição de Status</h3>
                        <Button variant="secondary" size="sm" icon="none">
                            Exportar
                        </Button>
                    </div>
                    
                    <div className="space-y-4">
                        {statusDistribution.map((item, index) => (
                            <div key={index} className="flex items-center space-x-4">
                                <div className="w-24 text-sm text-gray-600">{item.label}</div>
                                <div className="flex-1">
                                    <div className="bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`${item.color} h-2 rounded-full transition-all duration-300`}
                                            style={{ width: `${item.value}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="w-16 text-sm font-medium text-gray-900">
                                    {item.value}%
                                </div>
                            </div>
                        ))}
                        {statusDistribution.length === 0 && (
                            <div className="text-sm text-gray-500">Sem dados suficientes.</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Tables (dinâmico) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Estacionamentos */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Estacionamentos</h3>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {parkings.map((p) => {
                            const total = slots.filter(s => s.parkingId === p.id).length
                            const ocup = slots.filter(s => s.parkingId === p.id && s.isActive && !s.isAvailable).length
                            return (
                                <div key={p.id} className="px-6 py-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{p.name}</p>
                                            <p className="text-xs text-gray-500">{ocup}/{total} ocupadas</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        {parkings.length === 0 && (
                            <div className="px-6 py-8 text-sm text-gray-500">Nenhum estacionamento encontrado.</div>
                        )}
                    </div>
                </div>

                {/* Mensagens Recentes */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Mensagens Recentes</h3>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {messages.slice(0, 6).map((msg) => (
                            <div key={msg.id} className="px-6 py-4">
                                <div className="flex items-center justify-between">
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">{msg.name}</p>
                                        <p className="text-xs text-gray-500 truncate">{msg.email}</p>
                                    </div>
                                    <div className="text-right ml-4">
                                        <p className="text-xs text-gray-500">{new Date(msg.createdAt).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-700 mt-2 line-clamp-2">{msg.message}</p>
                            </div>
                        ))}
                        {messages.length === 0 && (
                            <div className="px-6 py-8 text-sm text-gray-500">Nenhuma mensagem encontrada.</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Export Options */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Exportar Relatórios</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" size="md" icon="none" className="justify-start">
                        Relatório de Ocupação (PDF)
                    </Button>
                    <Button variant="outline" size="md" icon="none" className="justify-start">
                        Relatório de Slots (Excel)
                    </Button>
                    <Button variant="outline" size="md" icon="none" className="justify-start">
                        Relatório de Mensagens (CSV)
                    </Button>
                </div>
            </div>
            {loading && (
                <div className="text-center text-gray-500">Carregando dados...</div>
            )}
            {error && (
                <div className="text-center text-red-600">{error}</div>
            )}
        </div>
    )
}
