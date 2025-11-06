"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import ClientHeader from "@/components/layout/ClientHeader"
import Footer from "@/components/layout/Footer"
import { Calendar, Trash2, Edit, Save, X } from "lucide-react"
import api from "@/lib/api"
import { useAuth } from "@/context/AuthContext"

type Reservation = {
    id: string
    parkingSlotId: string
    // Backend may return either the split fields or ISO datetimes
    date?: string
    startHour?: string
    durationHours?: number
    startTime?: string
    endTime?: string
    vehiclePlate: string
    createdAt?: string
    parkingSlot?: {
        number: number
        parking: {
            name: string
        }
    }
}

export default function ClientMyReservationsPage() {
    const { user, isLoading } = useAuth()
    const router = useRouter()
    const [reservations, setReservations] = useState<Reservation[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [editData, setEditData] = useState<{
        date: string
        startHour: string
        durationHours: number
        vehiclePlate: string
    }>({
        date: "",
        startHour: "",
        durationHours: 1,
        vehiclePlate: ""
    })
    const [cancelConfirmId, setCancelConfirmId] = useState<string | null>(null)
    const [cancelLoading, setCancelLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [editErrorMessage, setEditErrorMessage] = useState<string | null>(null)

    const load = async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await api.get<Reservation[]>("/reservations/me", { cache: "no-store" })
            setReservations(Array.isArray(data) ? data : [])
        } catch (e: any) {
            setError(e?.message || "Falha ao carregar reservas")
        } finally {
            setLoading(false)
        }
    }

    const openCancelConfirm = (id: string) => {
        setCancelConfirmId(id)
        setErrorMessage(null)
    }

    const closeCancelConfirm = () => {
        setCancelConfirmId(null)
        setErrorMessage(null)
    }

    const confirmCancel = async () => {
        if (!cancelConfirmId) return
        
        setCancelLoading(true)
        setErrorMessage(null)
        try {
            await api.delete(`/reservations/${cancelConfirmId}`)
            await load()
            closeCancelConfirm()
        } catch (e: any) {
            setErrorMessage(e?.message || "Falha ao cancelar reserva")
        } finally {
            setCancelLoading(false)
        }
    }

    const startEdit = (reservation: Reservation) => {
        // Normalize fields from either schema
        let dateStr = reservation.date
        let startHour = reservation.startHour
        let durationHours = reservation.durationHours
        
        if (!dateStr && reservation.startTime) {
            const s = new Date(reservation.startTime)
            dateStr = s.toISOString().slice(0,10)
            startHour = `${String(s.getHours()).padStart(2,'0')}:${String(s.getMinutes()).padStart(2,'0')}`
        }
        if (!durationHours && reservation.startTime && reservation.endTime) {
            const s = new Date(reservation.startTime).getTime()
            const e = new Date(reservation.endTime).getTime()
            durationHours = Math.max(1, Math.round((e - s) / (1000*60*60)))
        }

        setEditData({
            date: dateStr || "",
            startHour: startHour || "",
            durationHours: durationHours || 1,
            vehiclePlate: reservation.vehiclePlate
        })
        setEditingId(reservation.id)
        setEditErrorMessage(null)
    }

    const saveEdit = async () => {
        if (!editingId) return
        setEditErrorMessage(null)
        try {
            await api.put(`/reservations/${editingId}`, {
                parkingSlotId: reservations.find(r => r.id === editingId)?.parkingSlotId,
                vehiclePlate: editData.vehiclePlate,
                date: editData.date,
                startHour: editData.startHour,
                durationHours: editData.durationHours
            })
            setEditingId(null)
            setEditErrorMessage(null)
            await load()
        } catch (e: any) {
            setEditErrorMessage(e?.message || "Falha ao atualizar reserva")
        }
    }

    const cancelEdit = () => {
        setEditingId(null)
        setEditErrorMessage(null)
        setEditData({
            date: "",
            startHour: "",
            durationHours: 1,
            vehiclePlate: ""
        })
    }

    // Verificar autenticação
    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/login")
            return
        }
    }, [user, isLoading, router])

    useEffect(() => { 
        if (user) {
            load() 
        }
    }, [user])

    // Mostrar loading enquanto verifica autenticação
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Carregando...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-gray-50 min-h-screen text-gray-900">
            <ClientHeader />

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Minhas Reservas</h1>
                    <p className="text-gray-600">Acompanhe e gerencie suas reservas.</p>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-primary-600" />
                            <h2 className="text-lg font-bold">Reservas</h2>
                        </div>
                        <button className="text-sm text-gray-700 hover:text-gray-900" onClick={load}>Atualizar</button>
                    </div>
                    {loading ? (
                        <div className="px-6 py-8 text-center text-gray-500">Carregando...</div>
                    ) : error ? (
                        <div className="px-6 py-8 text-center text-red-600">{error}</div>
                    ) : reservations.length === 0 ? (
                        <div className="px-6 py-8 text-center text-gray-500">Nenhuma reserva encontrada.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Início</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duração</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vaga</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Placa</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {reservations.map(r => {
                                        // Normalize fields from either schema
                                        let dateStr = r.date
                                        let startHour = r.startHour
                                        let durationHours = r.durationHours
                                        if (!dateStr && r.startTime) {
                                            const s = new Date(r.startTime)
                                            dateStr = s.toISOString().slice(0,10)
                                            startHour = `${String(s.getHours()).padStart(2,'0')}:${String(s.getMinutes()).padStart(2,'0')}`
                                        }
                                        if (!durationHours && r.startTime && r.endTime) {
                                            const s = new Date(r.startTime).getTime()
                                            const e = new Date(r.endTime).getTime()
                                            durationHours = Math.max(1, Math.round((e - s) / (1000*60*60)))
                                        }
                                        const isEditing = editingId === r.id
                                        return (
                                            <tr key={r.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 text-sm text-gray-800">
                                                    {isEditing ? (
                                                        <input
                                                            type="date"
                                                            value={editData.date}
                                                            onChange={(e) => setEditData(prev => ({ ...prev, date: e.target.value }))}
                                                            className="px-2 py-1 border border-gray-300 rounded text-sm"
                                                        />
                                                    ) : (
                                                        dateStr ? new Date(dateStr).toLocaleDateString("pt-BR") : "-"
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-800">
                                                    {isEditing ? (
                                                        <input
                                                            type="time"
                                                            value={editData.startHour}
                                                            onChange={(e) => setEditData(prev => ({ ...prev, startHour: e.target.value }))}
                                                            className="px-2 py-1 border border-gray-300 rounded text-sm"
                                                        />
                                                    ) : (
                                                        startHour || "-"
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-800">
                                                    {isEditing ? (
                                                        <select
                                                            value={editData.durationHours}
                                                            onChange={(e) => setEditData(prev => ({ ...prev, durationHours: Number(e.target.value) }))}
                                                            className="px-2 py-1 border border-gray-300 rounded text-sm"
                                                        >
                                                            {[1,2,3,4,5,6,7,8].map(h => (
                                                                <option key={h} value={h}>{h}h</option>
                                                            ))}
                                                        </select>
                                                    ) : (
                                                        `${durationHours ?? "-"}${durationHours ? 'h' : ''}`
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-800">
                                                    {r.parkingSlot ? 
                                                        `${r.parkingSlot.parking.name} - Vaga ${r.parkingSlot.number}` : 
                                                        r.parkingSlotId
                                                    }
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-800">
                                                    {isEditing ? (
                                                        <input
                                                            type="text"
                                                            value={editData.vehiclePlate}
                                                            onChange={(e) => setEditData(prev => ({ ...prev, vehiclePlate: e.target.value.toUpperCase() }))}
                                                            className="px-2 py-1 border border-gray-300 rounded text-sm"
                                                            placeholder="AAA0A00"
                                                        />
                                                    ) : (
                                                        r.vehiclePlate
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    {isEditing ? (
                                                        <div className="space-y-2">
                                                            {editErrorMessage && (
                                                                <div className="bg-red-50 border border-red-200 rounded-lg p-2 mb-2">
                                                                    <p className="text-red-800 text-xs">{editErrorMessage}</p>
                                                                </div>
                                                            )}
                                                            <div className="flex gap-2">
                                                                <button 
                                                                    className="text-green-600 hover:text-green-900 inline-flex items-center gap-1"
                                                                    onClick={saveEdit}
                                                                >
                                                                    <Save className="w-4 h-4" /> Salvar
                                                                </button>
                                                                <button 
                                                                    className="text-gray-600 hover:text-gray-900 inline-flex items-center gap-1"
                                                                    onClick={cancelEdit}
                                                                >
                                                                    <X className="w-4 h-4" /> Cancelar
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="flex gap-2">
                                                            <button 
                                                                className="text-blue-600 hover:text-blue-900 inline-flex items-center gap-1"
                                                                onClick={() => startEdit(r)}
                                                            >
                                                                <Edit className="w-4 h-4" /> Editar
                                                            </button>
                                                            <button 
                                                                className="text-red-600 hover:text-red-900 inline-flex items-center gap-1"
                                                                onClick={() => openCancelConfirm(r.id)}
                                                            >
                                                                <Trash2 className="w-4 h-4" /> Cancelar
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>

            <Footer />

            {/* Modal de Confirmação de Cancelamento */}
            {cancelConfirmId && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-900">Cancelar Reserva</h3>
                            <button
                                onClick={closeCancelConfirm}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                                disabled={cancelLoading}
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <div className="mb-6">
                            <p className="text-gray-700 mb-4">
                                Tem certeza que deseja cancelar esta reserva? Esta ação não pode ser desfeita.
                            </p>
                            
                            {errorMessage && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                                    <p className="text-red-800 text-sm">{errorMessage}</p>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={closeCancelConfirm}
                                disabled={cancelLoading}
                                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Não, manter reserva
                            </button>
                            <button
                                onClick={confirmCancel}
                                disabled={cancelLoading}
                                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {cancelLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        Cancelando...
                                    </>
                                ) : (
                                    <>
                                        <Trash2 className="w-4 h-4" />
                                        Sim, cancelar
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}


