"use client"

import { useEffect, useMemo, useState } from "react"
import Button from "@/components/ui/Button"
import { Search, RefreshCcw, Plus, Trash2, Save, Info } from "lucide-react"
import api from "@/lib/api"

type Parking = { id: string; name: string }

type Sensor = {
  id: string
  parkingSlotId?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  name: string
  description?: string
  type: string
}

type SensorsData = {
  id: string
  sensorId: string
  parkingSlotId?: string
  isActive?: boolean
  createdAt: string
  data: string
}

type ParkingSensor = {
  id: string
  parkingId: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  name: string
  description?: string
  type: string
}

type ParkingSensorData = {
  id: string
  parkingSensorId: string
  data: string
  createdAt: string
}

export default function AdminSensoresPage() {
  const [tab, setTab] = useState<"sensors" | "parkingSensors">("sensors")
  const [parkings, setParkings] = useState<Parking[]>([])

  const [sensors, setSensors] = useState<Sensor[]>([])
  const [sensorsLoading, setSensorsLoading] = useState(false)
  const [sensorsError, setSensorsError] = useState<string | null>(null)

  const [parkingSensors, setParkingSensors] = useState<ParkingSensor[]>([])
  const [psLoading, setPsLoading] = useState(false)
  const [psError, setPsError] = useState<string | null>(null)

  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("todos")
  const [parkingFilter, setParkingFilter] = useState<string>("todos")
  const [activeFilter, setActiveFilter] = useState<string>("todos")

  const [detailId, setDetailId] = useState<string | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [detailData, setDetailData] = useState<(SensorsData | ParkingSensorData)[]>([])
  const [detailTab, setDetailTab] = useState<"today" | "week" | "all">("today")
  const [detailSearch, setDetailSearch] = useState("")
  const [showAllDetails, setShowAllDetails] = useState(false)

  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [createForm, setCreateForm] = useState<{ scope: "sensors" | "parkingSensors"; name: string; description: string; type: string; parkingId?: string; parkingSlotId?: string; isActive: boolean }>({
    scope: "sensors",
    name: "",
    description: "",
    type: "",
    parkingId: "",
    parkingSlotId: "",
    isActive: true,
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    refreshAll()
  }, [])

  const refreshAll = async () => {
    setSensorsLoading(true)
    setPsLoading(true)
    setSensorsError(null)
    setPsError(null)
    try {
      const [p, s, ps] = await Promise.all([
        api.get<Parking[]>("/parkings", { cache: "no-store" }),
        api.get<Sensor[]>("/sensors", { cache: "no-store" }),
        api.get<ParkingSensor[]>("/parking-sensors", { cache: "no-store" }),
      ])
      setParkings(p)
      setSensors(s)
      setParkingSensors(ps)
    } catch (e: any) {
      const msg = e?.message || "Erro ao carregar dados"
      setSensorsError(msg)
      setPsError(msg)
    } finally {
      setSensorsLoading(false)
      setPsLoading(false)
    }
  }

  const filteredSensors = useMemo(() => {
    return sensors.filter((s) => {
      const bySearch = search === "" ? true : `${s.name} ${s.description ?? ""} ${s.type}`.toLowerCase().includes(search.toLowerCase())
      const byType = typeFilter === "todos" ? true : s.type === typeFilter
      const byActive = activeFilter === "todos" ? true : String(s.isActive) === activeFilter
      // sensors endpoint não traz parkingId diretamente; filtragem por estacionamento fica indisponível sem relação
      return bySearch && byType && byActive
    })
  }, [sensors, search, typeFilter, activeFilter])

  const filteredParkingSensors = useMemo(() => {
    return parkingSensors.filter((s) => {
      const bySearch = search === "" ? true : `${s.name} ${s.description ?? ""} ${s.type}`.toLowerCase().includes(search.toLowerCase())
      const byType = typeFilter === "todos" ? true : s.type === typeFilter
      const byActive = activeFilter === "todos" ? true : String(s.isActive) === activeFilter
      const byParking = parkingFilter === "todos" ? true : s.parkingId === parkingFilter
      return bySearch && byType && byActive && byParking
    })
  }, [parkingSensors, search, typeFilter, activeFilter, parkingFilter])

  const types = useMemo(() => {
    const fromSensors = Array.from(new Set(sensors.map(s => s.type)))
    const fromParkingSensors = Array.from(new Set(parkingSensors.map(s => s.type)))
    return Array.from(new Set(["todos", ...fromSensors, ...fromParkingSensors]))
  }, [sensors, parkingSensors])

  const openDetails = async (id: string) => {
    setDetailId(id)
    setDetailLoading(true)
    setDetailData([])
    setDetailTab("today")
    setDetailSearch("")
    setShowAllDetails(false)
    try {
      if (tab === "sensors") {
        const data = await api.get<SensorsData[]>(`/sensors-data/sensor/${id}`, { cache: "no-store" })
        setDetailData(Array.isArray(data) ? data : [])
      } else {
        const data = await api.get<ParkingSensorData[]>(`/parking-sensor-data/parking-sensor/${id}`, { cache: "no-store" })
        setDetailData(Array.isArray(data) ? data : [])
      }
    } catch (e) {
      setDetailData([])
    } finally {
      setDetailLoading(false)
    }
  }

  const filteredDetailData = useMemo(() => {
    const now = new Date()
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const startOfWeek = new Date(now)
    startOfWeek.setDate(now.getDate() - 6)

    return detailData.filter((d) => {
      const created = new Date(d.createdAt)
      const byTab = detailTab === "all"
        ? true
        : detailTab === "today"
          ? created >= startOfToday
          : created >= startOfWeek
      const text = (d as any).data ?? ""
      const bySearch = detailSearch.trim() === "" ? true : String(text).toLowerCase().includes(detailSearch.toLowerCase())
      return byTab && bySearch
    })
  }, [detailData, detailTab, detailSearch])

  const visibleDetailData = useMemo(() => {
    return showAllDetails ? filteredDetailData : filteredDetailData.slice(0, 20)
  }, [filteredDetailData, showAllDetails])

  const toggleActive = async (item: Sensor | ParkingSensor) => {
    try {
      if ("parkingSlotId" in item) {
        await api.put(`/sensors/${item.id}`, { isActive: !item.isActive })
        await refreshAll()
      } else {
        await api.put(`/parking-sensors/${item.id}`, { isActive: !item.isActive })
        await refreshAll()
      }
    } catch (e) {
      alert("Falha ao atualizar status")
    }
  }

  const removeItem = async (item: Sensor | ParkingSensor) => {
    if (!confirm("Deseja remover este sensor?")) return
    try {
      if ("parkingSlotId" in item) {
        await api.delete(`/sensors/${item.id}`)
        await refreshAll()
      } else {
        await api.delete(`/parking-sensors/${item.id}`)
        await refreshAll()
      }
    } catch (e) {
      alert("Falha ao excluir sensor")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sensores</h1>
          <p className="text-gray-600">Gerencie sensores de vagas e de estacionamentos</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={refreshAll}>
            <RefreshCcw className="w-4 h-4 mr-2" /> Atualizar
          </Button>
          <Button variant="primary" size="sm" onClick={() => { setIsCreateOpen(true); setCreateForm({ scope: tab, name: "", description: "", type: "", parkingId: parkings[0]?.id || "", parkingSlotId: "", isActive: true }) }}>
            <Plus className="w-4 h-4 mr-2" /> Novo Sensor
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-gray-200 rounded-lg p-2 w-fit">
        <div className="flex">
          <button className={`px-4 py-2 rounded-md text-sm font-medium ${tab === "sensors" ? "bg-gray-900 text-white" : "text-gray-700"}`} onClick={() => setTab("sensors")}>Vaga Sensores</button>
          <button className={`px-4 py-2 rounded-md text-sm font-medium ${tab === "parkingSensors" ? "bg-gray-900 text-white" : "text-gray-700"}`} onClick={() => setTab("parkingSensors")}>Estacionamento Sensores</button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nome, descrição ou tipo..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-3 flex-wrap">
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg">
              {types.map(t => (<option key={t} value={t}>{t === "todos" ? "Todos os Tipos" : t}</option>))}
            </select>
            <select value={activeFilter} onChange={(e) => setActiveFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg">
              <option value="todos">Todos</option>
              <option value="true">Ativos</option>
              <option value="false">Inativos</option>
            </select>
            {tab === "parkingSensors" && (
              <select value={parkingFilter} onChange={(e) => setParkingFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg">
                <option value="todos">Todos os Estacionamentos</option>
                {parkings.map(p => (<option key={p.id} value={p.id}>{p.name}</option>))}
              </select>
            )}
          </div>
        </div>
      </div>

      {/* Tables */}
      {tab === "sensors" ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Sensores de Vaga ({filteredSensors.length})</h2>
            {sensorsError && <p className="text-sm text-red-600 mt-1">{sensorsError}</p>}
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Atualizado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sensorsLoading ? (
                  <tr><td colSpan={5} className="px-6 py-6 text-center text-gray-500">Carregando...</td></tr>
                ) : (
                  filteredSensors.map(s => (
                    <tr key={s.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{s.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{s.type}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${s.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700"}`}>{s.isActive ? "Ativo" : "Inativo"}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{new Date(s.updatedAt).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}</td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button className="text-gray-700 hover:text-gray-900" title="Detalhes" onClick={() => openDetails(s.id)}>
                            <Info className="w-4 h-4" />
                          </button>
                          <button className="text-gray-700 hover:text-gray-900" onClick={() => toggleActive(s)}>{s.isActive ? "Desativar" : "Ativar"}</button>
                          <button className="text-red-600 hover:text-red-900" onClick={() => removeItem(s)}>
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Sensores de Estacionamento ({filteredParkingSensors.length})</h2>
            {psError && <p className="text-sm text-red-600 mt-1">{psError}</p>}
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estacionamento</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Atualizado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {psLoading ? (
                  <tr><td colSpan={6} className="px-6 py-6 text-center text-gray-500">Carregando...</td></tr>
                ) : (
                  filteredParkingSensors.map(s => (
                    <tr key={s.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{s.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{s.type}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{parkings.find(p => p.id === s.parkingId)?.name || s.parkingId}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${s.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700"}`}>{s.isActive ? "Ativo" : "Inativo"}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{new Date(s.updatedAt).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}</td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button className="text-gray-700 hover:text-gray-900" title="Detalhes" onClick={() => openDetails(s.id)}>
                            <Info className="w-4 h-4" />
                          </button>
                          <button className="text-gray-700 hover:text-gray-900" onClick={() => toggleActive(s)}>{s.isActive ? "Desativar" : "Ativar"}</button>
                          <button className="text-red-600 hover:text-red-900" onClick={() => removeItem(s)}>
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {detailId && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
            <div className="p-5 border-b border-gray-200">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Leituras Recentes</h3>
                  <p className="text-sm text-gray-500">Visualize, filtre e pesquise os logs deste sensor.</p>
                </div>
                <button className="text-gray-600 hover:text-gray-900" onClick={() => setDetailId(null)}>Fechar</button>
              </div>
              <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="bg-gray-100 rounded-lg p-1 w-fit">
                  <div className="flex">
                    <button className={`px-3 py-1.5 rounded-md text-sm font-medium ${detailTab === "today" ? "bg-white shadow" : "text-gray-700"}`} onClick={() => setDetailTab("today")}>Hoje</button>
                    <button className={`px-3 py-1.5 rounded-md text-sm font-medium ${detailTab === "week" ? "bg-white shadow" : "text-gray-700"}`} onClick={() => setDetailTab("week")}>Essa semana</button>
                    <button className={`px-3 py-1.5 rounded-md text-sm font-medium ${detailTab === "all" ? "bg-white shadow" : "text-gray-700"}`} onClick={() => setDetailTab("all")}>Todos</button>
                  </div>
                </div>
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Pesquisar nos logs..."
                    value={detailSearch}
                    onChange={(e) => setDetailSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <button
                  className="px-3 py-2 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50"
                  onClick={() => setShowAllDetails(v => !v)}
                >
                  {showAllDetails ? "Mostrar menos" : "Ver completo"}
                </button>
              </div>
            </div>
            <div className="p-5 overflow-y-auto">
              {detailLoading ? (
                <div className="text-center text-gray-500">Carregando...</div>
              ) : filteredDetailData.length === 0 ? (
                <div className="text-center text-gray-500">Nenhum log encontrado.</div>
              ) : (
                <>
                  <div className="text-sm text-gray-600 mb-3">Mostrando {visibleDetailData.length} de {filteredDetailData.length} registros filtrados</div>
                  <div className="space-y-2">
                    {(visibleDetailData as any[]).map(d => (
                      <div key={d.id} className="flex items-center justify-between text-sm text-gray-800">
                        <span className="truncate mr-2">{d.data}</span>
                        <span className="text-gray-500 whitespace-nowrap">{new Date(d.createdAt).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}</span>
                      </div>
                    ))}
                  </div>
                  {!showAllDetails && filteredDetailData.length > 20 && (
                    <div className="mt-4 flex justify-center">
                      <button className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50" onClick={() => setShowAllDetails(true)}>Ver completo</button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
            <div className="p-5 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Novo Sensor</h3>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Escopo</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2" value={createForm.scope} onChange={(e) => setCreateForm(f => ({ ...f, scope: e.target.value as any }))}>
                    <option value="sensors">Vaga</option>
                    <option value="parkingSensors">Estacionamento</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                  <input className="w-full border border-gray-300 rounded-lg px-3 py-2" value={createForm.type} onChange={(e) => setCreateForm(f => ({ ...f, type: e.target.value }))} placeholder="IR, TEMPERATURE, ..." />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                  <input className="w-full border border-gray-300 rounded-lg px-3 py-2" value={createForm.name} onChange={(e) => setCreateForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ativo</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2" value={createForm.isActive ? "true" : "false"} onChange={(e) => setCreateForm(f => ({ ...f, isActive: e.target.value === "true" }))}>
                    <option value="true">Sim</option>
                    <option value="false">Não</option>
                  </select>
                </div>
              </div>
              {createForm.scope === "parkingSensors" ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estacionamento</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2" value={createForm.parkingId} onChange={(e) => setCreateForm(f => ({ ...f, parkingId: e.target.value }))}>
                    <option value="">Selecione...</option>
                    {parkings.map(p => (<option key={p.id} value={p.id}>{p.name}</option>))}
                  </select>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vaga (ID)</label>
                  <input className="w-full border border-gray-300 rounded-lg px-3 py-2" value={createForm.parkingSlotId} onChange={(e) => setCreateForm(f => ({ ...f, parkingSlotId: e.target.value }))} placeholder="ID da vaga" />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2" rows={3} value={createForm.description} onChange={(e) => setCreateForm(f => ({ ...f, description: e.target.value }))} />
              </div>
            </div>
            <div className="p-5 border-t border-gray-200 flex items-center justify-end gap-3">
              <Button variant="secondary" size="sm" onClick={() => setIsCreateOpen(false)}>Cancelar</Button>
              <Button variant="primary" size="sm" disabled={saving} onClick={async () => {
                try {
                  setSaving(true)
                  if (createForm.scope === "sensors") {
                    await api.post("/sensors", {
                      name: createForm.name,
                      description: createForm.description,
                      type: createForm.type,
                      parkingSlotId: createForm.parkingSlotId,
                      isActive: createForm.isActive,
                    })
                  } else {
                    await api.post("/parking-sensors", {
                      name: createForm.name,
                      description: createForm.description,
                      type: createForm.type,
                      parkingId: createForm.parkingId,
                      isActive: createForm.isActive,
                    })
                  }
                  setIsCreateOpen(false)
                  await refreshAll()
                } catch (e) {
                  alert("Falha ao criar sensor")
                } finally {
                  setSaving(false)
                }
              }}>
                <Save className="w-4 h-4 mr-2" /> Salvar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


