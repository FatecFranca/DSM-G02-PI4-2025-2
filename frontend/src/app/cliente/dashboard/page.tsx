"use client"

import ClientHeader from "@/components/layout/ClientHeader"
import Footer from "@/components/layout/Footer"
import { BarChart2, Calendar, Car, MapPin } from "lucide-react"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import api from "@/lib/api"

type Reservation = {
    id: string
    parkingSlotId: string
    date?: string
    startHour?: string
    durationHours?: number
    startTime?: string
    endTime?: string
    vehiclePlate: string
}

type ParkingSlot = {
    id: string
    parkingId: string
    isAvailable: boolean
    isActive: boolean
    number: number
    createdAt: string
    updatedAt: string
}

export default function ClientDashboardPage() {
    const [reservations, setReservations] = useState<Reservation[]>([])
    const [slots, setSlots] = useState<ParkingSlot[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const refresh = () => {
        setLoading(true)
        setError(null)
        Promise.all([
            api.get<Reservation[]>("/reservations", { cache: "no-store" }),
            api.get<ParkingSlot[]>("/parking-slots", { cache: "no-store" }),
        ])
            .then(([rs, sl]) => { setReservations(Array.isArray(rs) ? rs : []); setSlots(Array.isArray(sl) ? sl : []) })
            .catch((e: any) => setError(e?.message || "Falha ao carregar dados"))
            .finally(() => setLoading(false))
    }

    useEffect(() => { refresh() }, [])

    const now = new Date()
    const activeReservations = useMemo(() => {
        return reservations.filter(r => {
            let start: Date | null = null
            let end: Date | null = null
            if (r.startTime && r.endTime) {
                start = new Date(r.startTime)
                end = new Date(r.endTime)
            } else if (r.date && r.startHour && r.durationHours) {
                start = new Date(r.date)
                const [sh, sm] = String(r.startHour).split(":").map(Number)
                start.setHours(sh || 0, sm || 0, 0, 0)
                end = new Date(start)
                end.setHours(start.getHours() + Number(r.durationHours || 0))
            }
            return end ? end >= now : false
        })
    }, [reservations])

    const freeSpots = useMemo(() => slots.filter(s => s.isActive && s.isAvailable).length, [slots])
    const distinctVehicles = useMemo(() => new Set(activeReservations.map(r => r.vehiclePlate)).size, [activeReservations])
    const nextReservation = useMemo(() => {
        const withStart = activeReservations.map(r => {
            if (r.startTime) {
                return { r, start: new Date(r.startTime) }
            }
            const d = r.date ? new Date(r.date) : new Date()
            const [h, m] = String(r.startHour || "00:00").split(":").map(Number)
            d.setHours(h || 0, m || 0, 0, 0)
            return { r, start: d }
        })
        withStart.sort((a, b) => a.start.getTime() - b.start.getTime())
        return withStart[0]?.r as Reservation | undefined
    }, [activeReservations])

    return (
        <div className="bg-gray-50 min-h-screen text-gray-900">
            <ClientHeader />

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">Meu Dashboard</h1>
                            <p className="text-gray-600">Visão geral rápida das suas atividades.</p>
                        </div>
                        <button className="text-sm text-gray-700 hover:text-gray-900" onClick={refresh}>{loading ? "Atualizando..." : "Atualizar"}</button>
                    </div>
                    {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-10">
                    {[{label:"Reservas ativas", value: activeReservations.length, Icon: Calendar},{label:"Vagas livres", value: freeSpots, Icon: MapPin},{label:"Veículos", value: distinctVehicles, Icon: Car}].map((c, i) => (
                        <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                            <div className="flex items-center gap-3">
                                <c.Icon className="w-5 h-5 text-primary-600" />
                                <div className="text-sm text-gray-600">{c.label}</div>
                            </div>
                            <div className="mt-2 text-2xl font-extrabold">{c.value}</div>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm lg:col-span-2">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <BarChart2 className="w-5 h-5 text-primary-600" />
                                <h2 className="text-lg font-bold">Ações rápidas</h2>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <Link href="/reservas" className="px-4 py-2 rounded-lg bg-primary-600 text-white">Nova reserva</Link>
                            <Link href="/cliente/reservas" className="px-4 py-2 rounded-lg border border-gray-300">Minhas reservas</Link>
                            <Link href="/cliente/perfil" className="px-4 py-2 rounded-lg border border-gray-300">Meu perfil</Link>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                        <h2 className="text-lg font-bold mb-3">Próxima reserva</h2>
                        {!nextReservation ? (
                            <div className="text-sm text-gray-600">Nenhuma reserva futura.</div>
                        ) : (
                            <div className="text-sm text-gray-800 space-y-1">
                                <div><span className="text-gray-500">Data:</span> {new Date(nextReservation.startTime ?? (nextReservation.date || '')).toLocaleDateString("pt-BR")}</div>
                                <div><span className="text-gray-500">Início:</span> {nextReservation.startTime ? new Date(nextReservation.startTime).toTimeString().slice(0,5) : (nextReservation.startHour || "-")}</div>
                                <div><span className="text-gray-500">Duração:</span> {nextReservation.durationHours ?? (nextReservation.startTime && nextReservation.endTime ? Math.max(1, Math.round((new Date(nextReservation.endTime).getTime()-new Date(nextReservation.startTime).getTime())/(1000*60*60))) : 0)}h</div>
                                <div><span className="text-gray-500">Vaga:</span> {nextReservation.parkingSlotId}</div>
                                <div><span className="text-gray-500">Placa:</span> {nextReservation.vehiclePlate}</div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}


