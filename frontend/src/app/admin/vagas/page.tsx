"use client"

import ParkingSpot, { SpotStatus } from "@/components/parking/ParkingSpot"
import Button from "@/components/ui/Button"
import { Plus, RefreshCcw, Search, Save, Trash2, AlertCircle, X, Activity } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import api from "@/lib/api"

type Parking = {
  id: string
  name: string
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

type Sensor = {
  id: string
  type: string
  parkingSlotId?: string
  createdAt: string
}

type SensorsData = {
  id: string
  sensorId: string
  parkingSlotId?: string
  data: string
  createdAt: string
  sensor: {
    id: string
    name: string
    type: string
    parkingSlot?: {
      id: string
      number: number
      parking: {
        id: string
        name: string
        address: string
        city: string
      }
    }
  }
}

type Reservation = {
  id: string
  parkingSlotId: string
  userId: string
  vehiclePlate: string
  startTime: string
  endTime: string
  status: string
  createdAt: string
}

// Função para obter o último dado de sensor de uma vaga
function getLatestSensorData(slotId: string, sensorsData: SensorsData[]): SensorsData | null {
  const slotData = sensorsData.filter(sd => sd.sensor?.parkingSlot?.id === slotId)
  if (slotData.length === 0) return null
  return slotData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
}

// Função para verificar se há reserva ativa para uma vaga
function hasActiveReservation(slotId: string, reservations: Reservation[]): boolean {
  const now = new Date()
  return reservations.some(r => 
    r.parkingSlotId === slotId &&
    r.status !== "cancelled" &&
    new Date(r.startTime) <= now &&
    new Date(r.endTime) >= now
  )
}

function mapStatus(slot: ParkingSlot, sensorsData: SensorsData[], reservations: Reservation[]): SpotStatus {
  // Se não estiver ativa, sempre retorna manutenção
  if (!slot.isActive) return "manutencao"

  // Buscar último dado do sensor
  const latestData = getLatestSensorData(slot.id, sensorsData)
  
  // Se não houver dados de sensor, usar isAvailable como fallback
  if (!latestData) {
    const hasReservation = hasActiveReservation(slot.id, reservations)
    if (hasReservation && slot.isAvailable) return "reservada"
    return slot.isAvailable ? "livre" : "ocupada"
  }

  // Determinar status baseado no dado do sensor
  const sensorValue = latestData.data?.toUpperCase()
  const hasReservation = hasActiveReservation(slot.id, reservations)

  if (sensorValue === "PRESENT") {
    return "ocupada"
  } else if (sensorValue === "FREE") {
    if (hasReservation) {
      return "reservada"
    }
    return "livre"
  }

  // Fallback
  return slot.isAvailable ? "livre" : "ocupada"
}

export default function AdminVagasPage() {
  const [parkings, setParkings] = useState<Parking[]>([])
  const [slots, setSlots] = useState<ParkingSlot[]>([])
  const [sensorsData, setSensorsData] = useState<SensorsData[]>([])
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [operationError, setOperationError] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const [statusFilter, setStatusFilter] = useState<SpotStatus | "todas">("todas")
  const [parkingFilter, setParkingFilter] = useState<string>("todos")
  const [searchTerm, setSearchTerm] = useState("")

  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [createData, setCreateData] = useState<{ parkingId: string; number: number | ""; isActive: boolean; isAvailable: boolean }>({
    parkingId: "",
    number: "",
    isActive: true,
    isAvailable: true,
  })

  const [editingSlot, setEditingSlot] = useState<ParkingSlot | null>(null)
  const [saving, setSaving] = useState(false)
  const [slotInfoLoading, setSlotInfoLoading] = useState(false)
  const [slotSensors, setSlotSensors] = useState<Sensor[]>([])
  const [slotRecentData, setSlotRecentData] = useState<SensorsData[]>([])

  useEffect(() => {
    refresh(true) // Primeira carga com loading
    // Atualizar a cada 1 segundo sem loading
    const interval = setInterval(() => {
      refresh(false)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const refresh = async (showLoading = false) => {
    if (showLoading) setLoading(true)
    setError(null)
    try {
      const [parkingsData, slotsData, sensorsDataResponse, reservationsData] = await Promise.all([
        api.get<Parking[]>("/parkings", { cache: "no-store" }),
        api.get<ParkingSlot[] | { data: ParkingSlot[] }>("/parking-slots", { cache: "no-store" }),
        api.get<SensorsData[] | { data: SensorsData[] }>("/sensors-data", { cache: "no-store" }),
        api.get<Reservation[]>("/reservations", { cache: "no-store" }).catch(() => [] as Reservation[]),
      ])
      setParkings(parkingsData)
      const slots = Array.isArray(slotsData) ? slotsData : (slotsData as any).data || []
      setSlots(Array.isArray(slots) ? slots : [])
      const sensors = Array.isArray(sensorsDataResponse) ? sensorsDataResponse : (sensorsDataResponse as any).data || []
      setSensorsData(Array.isArray(sensors) ? sensors : [])
      setReservations(Array.isArray(reservationsData) ? reservationsData : [])
    } catch (e: any) {
      setError(e?.message || "Falha ao carregar vagas")
    } finally {
      if (showLoading) setLoading(false)
    }
  }

  const filtered = useMemo(() => {
    return slots.filter((slot) => {
      const status = mapStatus(slot, sensorsData, reservations)
      const statusOk = statusFilter === "todas" ? true : status === statusFilter
      const parkingOk = parkingFilter === "todos" ? true : slot.parkingId === parkingFilter
      const searchOk = searchTerm === "" ? true : `${slot.number}`.toLowerCase().includes(searchTerm.toLowerCase())
      return statusOk && parkingOk && searchOk
    })
  }, [slots, sensorsData, reservations, statusFilter, parkingFilter, searchTerm])

  const counts = useMemo(() => {
    const allStatuses = slots.map(slot => mapStatus(slot, sensorsData, reservations))
    return {
      total: slots.length,
      livre: allStatuses.filter((s) => s === "livre").length,
      ocupada: allStatuses.filter((s) => s === "ocupada").length,
      reservada: allStatuses.filter((s) => s === "reservada").length,
      manutencao: allStatuses.filter((s) => s === "manutencao").length,
    }
  }, [slots, sensorsData, reservations])


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">Gestão de Vagas</h1>
            <div className="relative group">
              <Activity className="w-4 h-4 text-green-500 animate-pulse" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Atualizando automaticamente
              </span>
            </div>
          </div>
          <p className="text-gray-600">Gerencie todas as vagas dos estacionamentos</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Total", value: counts.total, color: "bg-gray-100 text-gray-800" },
          { label: "Livre", value: counts.livre, color: "bg-green-100 text-green-800" },
          { label: "Ocupada", value: counts.ocupada, color: "bg-red-100 text-red-800" },
          { label: "Reservada", value: counts.reservada, color: "bg-yellow-100 text-yellow-800" },
          { label: "Manutenção", value: counts.manutencao, color: "bg-gray-200 text-gray-800" },
        ].map((c, i) => (
          <div key={i} className={`rounded-lg p-4 text-center font-semibold ${c.color}`}>
            <div className="text-2xl">{c.value}</div>
            <div className="text-sm opacity-80">{c.label}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="flex gap-4 flex-wrap">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por número da vaga..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="todas">Todos os Status</option>
                <option value="livre">Livres</option>
                <option value="ocupada">Ocupadas</option>
                <option value="reservada">Reservadas</option>
                <option value="manutencao">Manutenção</option>
              </select>
            </div>

            {/* Parking Filter */}
            <div>
              <select
                value={parkingFilter}
                onChange={(e) => setParkingFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="todos">Todos os Estacionamentos</option>
                {parkings.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" size="sm" onClick={() => refresh(true)} disabled={loading}>
              <RefreshCcw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> Atualizar
            </Button>
            <Button variant="primary" size="sm" onClick={() => { setCreateData({ parkingId: parkings[0]?.id || "", number: "", isActive: true, isAvailable: true }); setIsCreateOpen(true) }}>
              <Plus className="w-4 h-4 mr-2" /> Adicionar Vaga
            </Button>
          </div>
        </div>
      </div>

      {/* Parking grid visual */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Vagas ({filtered.length}/{slots.length})</h3>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            {[
              { label: "Livre", className: "bg-green-500" },
              { label: "Ocupada", className: "bg-red-500" },
              { label: "Reservada", className: "bg-yellow-500" },
              { label: "Manutenção", className: "bg-gray-400" },
            ].map((l, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${l.className}`}></span>
                {l.label}
              </div>
            ))}
          </div>
        </div>
        {loading && (
          <div className="text-center py-8 text-gray-500">Carregando vagas...</div>
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
              return groups.map(([parkingId, slotsGroup]) => {
                const parkingName = parkings.find((p) => p.id === parkingId)?.name || parkingId
                return (
                  <div key={parkingId}>
                    <div className="text-sm font-semibold text-gray-700 mb-4">{parkingName}</div>
                    <div className="flex flex-wrap items-center gap-4">
                      {slotsGroup
                        .sort((a, b) => a.number - b.number)
                        .map((slot) => {
                          const status = mapStatus(slot, sensorsData, reservations)
                          return (
                            <div key={slot.id} className="relative" onClick={async () => {
                              setEditingSlot(slot)
                              if (status === "ocupada" || status === "reservada") {
                                try {
                                  setSlotInfoLoading(true)
                                  const sensors = await api.get<Sensor[]>(`/sensors/parking-slot/${slot.id}`, { cache: "no-store" }).catch(() => [])
                                  setSlotSensors(Array.isArray(sensors) ? sensors : [])
                                  const data = await api.get<SensorsData[]>(`/sensors-data/parking-slot/${slot.id}`, { cache: "no-store" }).catch(() => [])
                                  setSlotRecentData(Array.isArray(data) ? data.slice(0, 10) : [])
                                } catch (e) {
                                  setSlotSensors([])
                                  setSlotRecentData([])
                                } finally {
                                  setSlotInfoLoading(false)
                                }
                              } else {
                                setSlotSensors([])
                                setSlotRecentData([])
                              }
                            }}>
                              <ParkingSpot id={String(slot.number).padStart(2, '0')} status={status} />
                            </div>
                          )
                        })}
                    </div>
                  </div>
                )
              })
            })()}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-700">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-600 hover:text-red-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Error Message */}
      {operationError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-red-700">{operationError}</p>
          </div>
          <button
            onClick={() => setOperationError(null)}
            className="text-red-600 hover:text-red-800 flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Create Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-5 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Adicionar Vaga</h3>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estacionamento</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  value={createData.parkingId}
                  onChange={(e) => setCreateData((d) => ({ ...d, parkingId: e.target.value }))}
                >
                  <option value="">Selecione...</option>
                  {parkings.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Número</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  value={createData.number}
                  onChange={(e) => setCreateData((d) => ({ ...d, number: e.target.value === '' ? '' : Number(e.target.value) }))}
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                  <input type="checkbox" checked={createData.isActive} onChange={(e) => setCreateData((d) => ({ ...d, isActive: e.target.checked }))} />
                  Ativa
                </label>
                <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                  <input type="checkbox" checked={createData.isAvailable} onChange={(e) => setCreateData((d) => ({ ...d, isAvailable: e.target.checked }))} />
                  Disponível
                </label>
              </div>
            </div>
            <div className="p-5 border-t border-gray-200 flex items-center justify-end gap-3">
              <Button variant="secondary" size="sm" onClick={() => setIsCreateOpen(false)}>Cancelar</Button>
              <Button
                variant="primary"
                size="sm"
                disabled={saving || !createData.parkingId || createData.number === ''}
                onClick={async () => {
                  try {
                    setSaving(true)
                    await api.post<ParkingSlot, Partial<ParkingSlot>>("/parking-slots", {
                      parkingId: createData.parkingId,
                      number: Number(createData.number),
                      isActive: createData.isActive,
                      isAvailable: createData.isAvailable,
                    })
                    setIsCreateOpen(false)
                    await refresh()
                    setOperationError(null)
                  } catch (e: any) {
                    setOperationError(e?.message || "Falha ao criar vaga")
                  } finally {
                    setSaving(false)
                  }
                }}
              >
                <Save className="w-4 h-4 mr-2" /> Salvar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingSlot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-5 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Editar Vaga #{editingSlot.number}</h3>
            </div>
            <div className="p-5 space-y-4">
              {(mapStatus(editingSlot, sensorsData, reservations) === "ocupada" || mapStatus(editingSlot, sensorsData, reservations) === "reservada") && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Informações da Vaga</span>
                    {slotInfoLoading && <span className="text-xs text-gray-500">Carregando...</span>}
                  </div>
                  {(!slotInfoLoading && slotSensors.length === 0 && slotRecentData.length === 0) && (
                    <p className="text-xs text-gray-500">Sem dados de sensores para esta vaga.</p>
                  )}
                  {slotSensors.length > 0 && (
                    <div className="mb-2">
                      <p className="text-xs text-gray-600">Sensores vinculados: {slotSensors.map(s => s.type).join(", ")}</p>
                    </div>
                  )}
                  {slotRecentData.length > 0 && (
                    <div className="max-h-28 overflow-auto">
                      {slotRecentData.slice(0, 5).map((d) => (
                        <div key={d.id} className="text-xs text-gray-700 flex items-center justify-between py-0.5">
                          <span className="truncate mr-2">{String(d.data || "")}</span>
                          <span className="text-gray-400 whitespace-nowrap">{new Date(d.createdAt).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estacionamento</label>
                <input className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50" value={parkings.find(p => p.id === editingSlot.parkingId)?.name || editingSlot.parkingId} disabled />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Número</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  value={editingSlot.number}
                  onChange={(e) => setEditingSlot((s) => s ? { ...s, number: Number(e.target.value) } as ParkingSlot : s)}
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                  <input type="checkbox" checked={editingSlot.isActive} onChange={(e) => setEditingSlot((s) => s ? { ...s, isActive: e.target.checked } : s)} />
                  Ativa
                </label>
                <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                  <input type="checkbox" checked={editingSlot.isAvailable} onChange={(e) => setEditingSlot((s) => s ? { ...s, isAvailable: e.target.checked } : s)} />
                  Disponível
                </label>
              </div>
            </div>
            <div className="p-5 border-t border-gray-200 flex items-center justify-between">
              <button
                className="inline-flex items-center gap-2 px-3 py-2 text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100"
                onClick={() => setDeleteConfirm(editingSlot.id)}
              >
                <Trash2 className="w-4 h-4" /> Excluir
              </button>
              <div className="flex items-center gap-3">
                <Button variant="secondary" size="sm" onClick={() => setEditingSlot(null)}>Cancelar</Button>
                <Button
                  variant="primary"
                  size="sm"
                  disabled={saving}
                  onClick={async () => {
                    if (!editingSlot) return
                    try {
                      setSaving(true)
                      await api.put<ParkingSlot, Partial<ParkingSlot>>(`/parking-slots/${editingSlot.id}`, {
                        number: editingSlot.number,
                        isActive: editingSlot.isActive,
                        isAvailable: editingSlot.isAvailable,
                      })
                      setEditingSlot(null)
                      await refresh()
                      setOperationError(null)
                    } catch (e: any) {
                      setOperationError(e?.message || "Falha ao salvar alterações")
                    } finally {
                      setSaving(false)
                    }
                  }}
                >
                  <Save className="w-4 h-4 mr-2" /> Salvar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Confirmar Exclusão</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Tem certeza que deseja excluir esta vaga? Esta ação não pode ser desfeita.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  onClick={async () => {
                    if (!deleteConfirm) return
                    try {
                      setOperationError(null)
                      await api.delete<unknown>(`/parking-slots/${deleteConfirm}`)
                      setDeleteConfirm(null)
                      if (editingSlot?.id === deleteConfirm) {
                        setEditingSlot(null)
                      }
                      await refresh()
                    } catch (e: any) {
                      setOperationError(e?.message || "Falha ao excluir vaga")
                      setDeleteConfirm(null)
                    }
                  }}
                  disabled={saving}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                >
                  {saving ? "Excluindo..." : "Excluir"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
