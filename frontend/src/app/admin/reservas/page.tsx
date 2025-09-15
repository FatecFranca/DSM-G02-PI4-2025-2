"use client"

import Button from "@/components/ui/Button"
import {
    Calendar,
    Car,
    CheckCircle,
    Clock,
    Edit,
    MapPin,
    Search,
    Trash2,
    User,
    XCircle
} from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import api from "@/lib/api"

type ParkingSlot = {
    id: string
    parkingId: string
    isAvailable: boolean
    isActive: boolean
    number: number
    createdAt: string
    updatedAt: string
}

type SensorsData = {
    id: string
    sensorId: string
    parkingSlotId?: string
    value?: string | number | boolean
    createdAt: string
}

type DerivedReservation = {
    id: string
    user: string
    vehicle: string
    spot: string
    startTime: string
    endTime: string
    status: "active" | "completed" | "cancelled" | "pending"
    price: string
    createdAt: string
}

export default function ReservasPage() {
    const [selectedFilter, setSelectedFilter] = useState("all")
    const [searchTerm, setSearchTerm] = useState("")
    const [slots, setSlots] = useState<ParkingSlot[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const load = async () => {
            setLoading(true)
            setError(null)
            try {
                const slotsData = await api.get<ParkingSlot[]>("/parking-slots", { cache: "no-store" })
                setSlots(slotsData)
            } catch (e: any) {
                setError(e?.message || "Falha ao carregar reservas")
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    const reservations: DerivedReservation[] = useMemo(() => {
        // Deriva "reservas" das vagas ocupadas e ativas; horários são inferidos como createdAt do slot
        return slots
            .filter(s => s.isActive && !s.isAvailable)
            .sort((a, b) => b.number - a.number)
            .map<DerivedReservation>((s) => ({
                id: s.id,
                user: "—",
                vehicle: "—",
                spot: String(s.number).padStart(2, '0'),
                startTime: s.createdAt,
                endTime: s.updatedAt,
                status: "active",
                price: "—",
                createdAt: s.createdAt,
            }))
    }, [slots])

    const getStatusColor = (status: string) => {
        switch (status) {
            case "active": return "bg-green-100 text-green-800"
            case "completed": return "bg-blue-100 text-blue-800"
            case "cancelled": return "bg-red-100 text-red-800"
            case "pending": return "bg-yellow-100 text-yellow-800"
            default: return "bg-gray-100 text-gray-800"
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case "active": return "Ativa"
            case "completed": return "Concluída"
            case "cancelled": return "Cancelada"
            case "pending": return "Pendente"
            default: return "Desconhecido"
        }
    }

    const filteredReservations = reservations.filter(reservation => {
        const matchesSearch = reservation.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reservation.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reservation.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reservation.spot.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesFilter = selectedFilter === "all" || reservation.status === selectedFilter

        return matchesSearch && matchesFilter
    })

    const stats = {
        total: reservations.length,
        active: reservations.filter(r => r.status === "active").length,
        completed: reservations.filter(r => r.status === "completed").length,
        cancelled: reservations.filter(r => r.status === "cancelled").length,
        pending: reservations.filter(r => r.status === "pending").length
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Gestão de Reservas</h1>
                    <p className="text-gray-600">Gerencie todas as reservas dos estacionamentos</p>
                </div>
                <Button variant="primary" size="md" icon="send">
                    Nova Reserva
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                    <div className="text-sm text-gray-600">Total</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-green-600">{stats.active}</div>
                    <div className="text-sm text-gray-600">Ativas</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-blue-600">{stats.completed}</div>
                    <div className="text-sm text-gray-600">Concluídas</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                    <div className="text-sm text-gray-600">Pendentes</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-red-600">{stats.cancelled}</div>
                    <div className="text-sm text-gray-600">Canceladas</div>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Buscar por ID, usuário, veículo ou vaga..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <select
                            value={selectedFilter}
                            onChange={(e) => setSelectedFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                            <option value="all">Todos os Status</option>
                            <option value="active">Ativa</option>
                            <option value="completed">Concluída</option>
                            <option value="cancelled">Cancelada</option>
                            <option value="pending">Pendente</option>
                        </select>
                        <Button variant="secondary" size="md" icon="send">
                            Filtros
                        </Button>
                    </div>
                </div>
            </div>

            {/* Reservations Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Reservas ({filteredReservations.length})</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Usuário
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Veículo
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Vaga
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Horário
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Preço
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredReservations.map((reservation) => (
                                <tr key={reservation.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {reservation.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <User className="w-4 h-4 text-gray-400 mr-2" />
                                            <span className="text-sm text-gray-900">{reservation.user}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <Car className="w-4 h-4 text-gray-400 mr-2" />
                                            <span className="text-sm text-gray-900">{reservation.vehicle}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                                            <span className="text-sm text-gray-900">{reservation.spot}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            <div className="flex items-center">
                                                <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                                                <span>{new Date(reservation.startTime).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center mt-1">
                                                <Clock className="w-4 h-4 text-gray-400 mr-2" />
                                                <span className="text-xs text-gray-500">
                                                    {new Date(reservation.startTime).toLocaleTimeString()} - {new Date(reservation.endTime).toLocaleTimeString()}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {reservation.price}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(reservation.status)}`}>
                                            {getStatusText(reservation.status)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center space-x-2">
                                            <button className="text-primary-600 hover:text-primary-900">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            {reservation.status === "pending" && (
                                                <>
                                                    <button className="text-green-600 hover:text-green-900">
                                                        <CheckCircle className="w-4 h-4" />
                                                    </button>
                                                    <button className="text-red-600 hover:text-red-900">
                                                        <XCircle className="w-4 h-4" />
                                                    </button>
                                                </>
                                            )}
                                            <button className="text-red-600 hover:text-red-900">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredReservations.length === 0 && (
                    <div className="text-center py-12">
                        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma reserva encontrada</h3>
                        <p className="text-gray-600">Tente ajustar os filtros ou criar uma nova reserva.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
