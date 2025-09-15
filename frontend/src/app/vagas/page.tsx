"use client"

import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
import ParkingSpot, { SpotStatus } from "@/components/parking/ParkingSpot"
import Button from "@/components/ui/Button"
import api from "@/lib/api"
import { MapPin, RefreshCcw } from "lucide-react"
import { useEffect, useMemo, useState } from "react"

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

function mapStatus(slot: ParkingSlot): SpotStatus {
  if (!slot.isActive) return "manutencao"
  return slot.isAvailable ? "livre" : "ocupada"
}

export default function VagasPage() {
  const [parkings, setParkings] = useState<Parking[]>([])
  const [slots, setSlots] = useState<ParkingSlot[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [statusFilter, setStatusFilter] = useState<SpotStatus | "todas">("todas")
  const [parkingFilter, setParkingFilter] = useState<string>("todos")

  const filtered = useMemo(() => {
    return slots.filter((s) => {
      const status = mapStatus(s)
      const statusOk = statusFilter === "todas" ? true : status === statusFilter
      const parkingOk = parkingFilter === "todos" ? true : s.parkingId === parkingFilter
      return statusOk && parkingOk
    })
  }, [slots, statusFilter, parkingFilter])

  const counts = useMemo(() => {
    const statuses = slots.map(mapStatus)
    return {
      total: slots.length,
      livre: statuses.filter((s) => s === "livre").length,
      ocupada: statuses.filter((s) => s === "ocupada").length,
      manutencao: statuses.filter((s) => s === "manutencao").length,
    }
  }, [slots])

  const refresh = () => {
    setLoading(true)
    setError(null)
    Promise.all([
      api.get<Parking[]>("/parkings", { cache: "no-store" }),
      api.get<ParkingSlot[]>("/parking-slots", { cache: "no-store" }),
    ])
      .then(([ps, sl]) => {
        setParkings(ps)
        setSlots(sl)
      })
      .catch((e: any) => setError(e?.message || "Falha ao carregar vagas"))
      .finally(() => setLoading(false))
  }

  useEffect(() => { refresh() }, [])

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-10 h-10 text-primary-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Vagas Disponíveis</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Visualização em tempo real das vagas do estacionamento. Bonito, visual e fácil de entender.
          </p>
        </div>

        {/* Toolbar */}
        <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-4 mb-8 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="flex gap-4 flex-wrap">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="todas">Todas</option>
                <option value="livre">Livres</option>
                <option value="ocupada">Ocupadas</option>
                <option value="manutencao">Manutenção</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estacionamento</label>
              <select
                value={parkingFilter}
                onChange={(e) => setParkingFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="todos">Todos</option>
                {parkings.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" size="md" className="!rounded-lg" onClick={refresh}>
              <RefreshCcw className="w-4 h-4 mr-2" /> Atualizar
            </Button>
            <Button variant="primary" size="md" className="!rounded-lg" onClick={() => {
              window.open("/login", "_blank")
            }}>
              Reservar Vaga
            </Button>
          </div>
        </div>

        {/* Counters */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          {[
            { label: "Total", value: counts.total, color: "bg-gray-100 text-gray-800" },
            { label: "Livres", value: counts.livre, color: "bg-green-100 text-green-800" },
            { label: "Ocupadas", value: counts.ocupada, color: "bg-red-100 text-red-800" },
            { label: "Manutenção", value: counts.manutencao, color: "bg-gray-200 text-gray-800" },
          ].map((c, i) => (
            <div key={i} className={`rounded-2xl p-4 text-center font-semibold ${c.color}`}>
              <div className="text-2xl">{c.value}</div>
              <div className="text-sm opacity-80">{c.label}</div>
            </div>
          ))}
        </div>

        {/* Parking grid visual */}
        <div className="bg-white border border-gray-100 shadow-lg rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Mapa Visual</h3>
            <span className="text-sm text-gray-500">{filtered.length}/{slots.length} vagas</span>
          </div>

          {loading && (
            <div className="text-center py-10 text-gray-500">Carregando vagas...</div>
          )}

          {!loading && (
            <div className="space-y-10">
              {(() => {
                const byParking = new Map<string, ParkingSlot[]>()
                filtered.forEach((s) => {
                  const arr = byParking.get(s.parkingId) || []
                  arr.push(s)
                  byParking.set(s.parkingId, arr)
                })
                const groups = Array.from(byParking.entries())
                if (groups.length === 0) {
                  return (
                    <div className="text-center py-8 text-gray-500">Nenhuma vaga encontrada com os filtros aplicados.</div>
                  )
                }
                return groups.map(([parkingId, group]) => {
                  const parkingName = parkings.find(p => p.id === parkingId)?.name || parkingId
                  return (
                    <div key={parkingId}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-sm font-semibold text-gray-700">{parkingName}</div>
                        <div className="text-xs text-gray-500">
                          Livre {group.filter(s => s.isActive && s.isAvailable).length} • Ocupada {group.filter(s => s.isActive && !s.isAvailable).length} • Manutenção {group.filter(s => !s.isActive).length}
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-6">
                        {group.sort((a, b) => a.number - b.number).map((slot) => (
                          <div key={slot.id} className="">
                            <ParkingSpot id={String(slot.number).padStart(2, '0')} status={mapStatus(slot)} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })
              })()}
            </div>
          )}

          {/* Legend */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {[
              { label: "Livre", className: "bg-green-500" },
              { label: "Ocupada", className: "bg-red-500" },
              { label: "Manutenção", className: "bg-gray-400" },
            ].map((l, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                <span className={`w-3 h-3 rounded-full ${l.className}`}></span>
                {l.label}
              </div>
            ))}
          </div>
          {error && (
            <div className="mt-4 text-center text-red-600">{error}</div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
