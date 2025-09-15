"use client"

import { useEffect, useState } from "react"
import ClientHeader from "@/components/layout/ClientHeader"
import Footer from "@/components/layout/Footer"
import { Calendar, Trash2 } from "lucide-react"
import api from "@/lib/api"

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
}

export default function ClientMyReservationsPage() {
    const [reservations, setReservations] = useState<Reservation[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const load = async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await api.get<Reservation[]>("/reservations", { cache: "no-store" })
            setReservations(Array.isArray(data) ? data : [])
        } catch (e: any) {
            setError(e?.message || "Falha ao carregar reservas")
        } finally {
            setLoading(false)
        }
    }

    const cancel = async (id: string) => {
        if (!confirm("Cancelar esta reserva?")) return
        try {
            await api.delete(`/reservations/${id}`)
            await load()
        } catch (e) {
            alert("Falha ao cancelar reserva")
        }
    }

    useEffect(() => { load() }, [])

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
                                        return (
                                            <tr key={r.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 text-sm text-gray-800">{dateStr ? new Date(dateStr).toLocaleDateString("pt-BR") : "-"}</td>
                                                <td className="px-6 py-4 text-sm text-gray-800">{startHour || "-"}</td>
                                                <td className="px-6 py-4 text-sm text-gray-800">{durationHours ?? "-"}{durationHours ? 'h' : ''}</td>
                                                <td className="px-6 py-4 text-sm text-gray-800">{r.parkingSlotId}</td>
                                                <td className="px-6 py-4 text-sm text-gray-800">{r.vehiclePlate}</td>
                                                <td className="px-6 py-4 text-sm">
                                                    <button className="text-red-600 hover:text-red-900 inline-flex items-center gap-1" onClick={() => cancel(r.id)}>
                                                        <Trash2 className="w-4 h-4" /> Cancelar
                                                    </button>
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
        </div>
    )
}


