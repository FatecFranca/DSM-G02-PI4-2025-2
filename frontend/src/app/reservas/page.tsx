"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/layout/ClientHeader"
import Footer from "@/components/layout/Footer"
import Button from "@/components/ui/Button"
import ParkingSpot, { SpotStatus } from "@/components/parking/ParkingSpot"
import { Calendar, Clock, MapPin, Car, User, CreditCard, CheckCircle, RefreshCcw } from "lucide-react"
import api from "@/lib/api"
import { useAuth } from "@/context/AuthContext"
import { maskPlate, validatePlate } from "@/lib/plate"

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

function addDurationToTime(timeHHMM: string, durationHours: number) {
  if (!timeHHMM) return ""
  const [h, m] = timeHHMM.split(":").map(Number)
  const startMinutes = h * 60 + m
  const endMinutes = startMinutes + Math.round(durationHours * 60)
  const endH = Math.floor((endMinutes / 60) % 24)
  const endM = endMinutes % 60
  return `${String(endH).padStart(2, "0")}:${String(endM).padStart(2, "0")}`
}

function generateHourlyTimes(startHour = 6, endHour = 22) {
  const slots: string[] = []
  for (let h = startHour; h <= endHour; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`)
  }
  return slots
}

// Função para obter o último dado de sensor de uma vaga
// Como o backend já retorna apenas o último dado de cada vaga, apenas buscamos pelo slotId
function getLatestSensorData(slotId: string, sensorsData: SensorsData[]): SensorsData | null {
  const latestData = sensorsData.find(sd => {
    const slotIdFromSensor = sd.sensor?.parkingSlot?.id
    const slotIdDirect = sd.parkingSlotId
    const matchesSlot = slotIdFromSensor === slotId || slotIdDirect === slotId
    const hasData = sd.data != null && sd.data !== undefined && sd.data !== ""
    return matchesSlot && hasData
  })
  return latestData || null
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
  
  // Se houver dados de sensor, priorizar o valor do sensor
  if (latestData) {
    const sensorValue = String(latestData.data || "").toUpperCase().trim()
    
    // Se o sensor detecta presença, sempre retorna ocupada (independente de reserva)
    if (sensorValue === "PRESENT") {
      return "ocupada"
    }
    
    // Se o sensor detecta livre, verificar se há reserva
    if (sensorValue === "FREE") {
      const hasReservation = hasActiveReservation(slot.id, reservations)
      if (hasReservation) {
        return "reservada"
      }
      return "livre"
    }
  }
  
  // Se não houver dados de sensor ou valor desconhecido, usar fallback
  const hasReservation = hasActiveReservation(slot.id, reservations)
  if (hasReservation && slot.isAvailable) {
    return "reservada"
  }
  return slot.isAvailable ? "livre" : "ocupada"
}

export default function ReservasPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [parkings, setParkings] = useState<Parking[]>([])
  const [slots, setSlots] = useState<ParkingSlot[]>([])
  const [sensorsData, setSensorsData] = useState<SensorsData[]>([])
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedSpot, setSelectedSpot] = useState<string>("")
  const [date, setDate] = useState<string>("")
  const [startTime, setStartTime] = useState<string>("")
  const [duration, setDuration] = useState<number>(1)
  const [name, setName] = useState<string>(user?.name || "")
  const [email, setEmail] = useState<string>(user?.email || "")
  const [plate, setPlate] = useState<string>("")
  const [plateError, setPlateError] = useState<string>("")
  const [payment, setPayment] = useState<"pix" | "cartao">("pix")
  const [submitted, setSubmitted] = useState(false)
  const [formError, setFormError] = useState<string>("")

  const [statusFilter, setStatusFilter] = useState<SpotStatus | "todas">("todas")
  const [parkingFilter, setParkingFilter] = useState<string>("todos")
  const [activePlates, setActivePlates] = useState<Array<{
    plate: string
    parkingSlotId: string
    slotNumber: number
    parkingName: string
    startTime: string
    endTime: string
  }>>([])

  const timeOptions = useMemo(() => generateHourlyTimes(6, 22), [])

  const price = useMemo(() => {
    const pricePerHour = 8 // R$ 8,00/h
    return Math.max(1, duration) * pricePerHour
  }, [duration])

  const endTime = useMemo(() => addDurationToTime(startTime, duration), [startTime, duration])

  const canChooseSpot = useMemo(() => {
    const plateValid = plate.length === 7 && validatePlate(plate).isValid
    return Boolean(date && startTime && duration && name && email && plateValid)
  }, [date, startTime, duration, name, email, plate])

  const canSubmit = useMemo(() => {
    return canChooseSpot && Boolean(selectedSpot)
  }, [canChooseSpot, selectedSpot])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validar placa antes de submeter
    const plateValidation = validatePlate(plate)
    if (!plateValidation.isValid) {
      setPlateError(plateValidation.error || "Placa inválida")
      setFormError("Corrija os erros no formulário antes de continuar.")
      return
    }
    
    if (!canSubmit) {
      setFormError(
        selectedSpot
          ? "Preencha todos os campos obrigatórios."
          : "Selecione uma vaga disponível após preencher os seus dados."
      )
      return
    }
    setFormError("")
    setPlateError("")

    try {
      // Monta payload conforme especificação do usuário
      const [sh, sm] = startTime.split(":").map(Number)
      const start = new Date(date)
      start.setHours(sh, sm ?? 0, 0, 0)

      setLoading(true)
      await api.post("/reservations", {
        parkingSlotId: selectedSpot,
        vehiclePlate: plate,
        date: date,
        startHour: startTime,
        durationHours: Number(duration),
      })
      setSubmitted(true)
      // atualizar listagens/caches conforme necessário poderia ser feito aqui
    } catch (e: any) {
      setFormError(e?.message || "Falha ao criar reserva. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const isSpotSelectable = (slot: ParkingSlot) => mapStatus(slot, sensorsData, reservations) === "livre"

  const filtered = useMemo(() => {
    return slots.filter((s) => {
      const status = mapStatus(s, sensorsData, reservations)
      const statusOk = statusFilter === "todas" ? true : status === statusFilter
      const parkingOk = parkingFilter === "todos" ? true : s.parkingId === parkingFilter
      return statusOk && parkingOk
    })
  }, [slots, sensorsData, reservations, statusFilter, parkingFilter])

  const counts = useMemo(() => {
    const statuses = slots.map(slot => mapStatus(slot, sensorsData, reservations))
    return {
      total: slots.length,
      livre: statuses.filter((s) => s === "livre").length,
      ocupada: statuses.filter((s) => s === "ocupada").length,
      reservada: statuses.filter((s) => s === "reservada").length,
      manutencao: statuses.filter((s) => s === "manutencao").length,
    }
  }, [slots, sensorsData, reservations])

  const refresh = () => {
    setLoading(true)
    setError(null)
    Promise.all([
      api.get<Parking[]>("/parkings", { cache: "no-store" }),
      api.get<ParkingSlot[] | { data: ParkingSlot[] }>("/parking-slots", { cache: "no-store" }),
      // Buscar apenas o último dado de cada vaga (endpoint otimizado)
      api.get<SensorsData[]>("/sensors-data/latest-by-slot", { cache: "no-store" }),
      api.get<Reservation[]>("/reservations", { cache: "no-store" }).catch(() => [] as Reservation[]),
      api.get<Array<{
        plate: string
        parkingSlotId: string
        slotNumber: number
        parkingName: string
        startTime: string
        endTime: string
      }>>("/active-plates", { cache: "no-store" }),
    ])
      .then(([ps, sl, sensors, res, ap]) => {
        setParkings(ps)
        const slots = Array.isArray(sl) ? sl : (sl as any).data || []
        setSlots(Array.isArray(slots) ? slots : [])
        setSensorsData(Array.isArray(sensors) ? sensors : [])
        setReservations(Array.isArray(res) ? res : [])
        setActivePlates(ap)
      })
      .catch((e: any) => setError(e?.message || "Falha ao carregar vagas"))
      .finally(() => setLoading(false))
  }

  useEffect(() => { refresh() }, [])
  
  // Verificar autenticação
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
      return
    }
  }, [user, isLoading, router])

  // Atualizar campos quando o usuário for carregado
  useEffect(() => {
    if (user) {
      setName(user.name || "")
      setEmail(user.email || "")
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
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-10 h-10 text-primary-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {user ? `Olá, ${user.name}!` : "Reservar Estacionamento"}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {user 
              ? "Preencha data, duração, horário e selecione uma vaga disponível para sua reserva."
              : "Primeiro preencha data, duração, horário e seus dados. Depois, selecione uma vaga disponível."
            }
          </p>
        </div>

        {/* Conteúdo */}
        {submitted ? (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-lg p-10 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Reserva Confirmada!</h2>
            <p className="text-gray-600 mb-6">Enviamos um e-mail com os detalhes da sua reserva.</p>
            <div className="grid grid-cols-2 gap-4 text-left text-gray-700 mb-6">
              <div>
                <div className="text-sm text-gray-500">Data</div>
                <div className="font-semibold">{new Date(date).toLocaleDateString("pt-BR")}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Vaga</div>
                <div className="font-semibold">{selectedSpot}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Início</div>
                <div className="font-semibold">{startTime}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Término</div>
                <div className="font-semibold">{endTime}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Duração</div>
                <div className="font-semibold">{duration}h</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Pagamento</div>
                <div className="font-semibold uppercase">{payment}</div>
              </div>
            </div>
            <div className="text-2xl font-extrabold text-gray-900 mb-8">R$ {price.toFixed(2)}</div>
            <Button variant="primary" size="md" onClick={() => setSubmitted(false)}>Fazer outra reserva</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Formulário (primeiro passo) */}
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Dados da Reserva</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Data *</label>
                      <div className="relative">
                        <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Duração *</label>
                      <select
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      >
                        {[1,2,3,4,5,6,7,8].map((h) => (
                          <option key={h} value={h}>{h} hora{h>1? 's': ''}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Horário (de 1 em 1 hora) *</label>
                      <div className="relative">
                        <Clock className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                        <select
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required
                        >
                          <option value="">Selecione</option>
                          {timeOptions.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                      {startTime && (
                        <p className="text-xs text-gray-500 mt-1">Término: {endTime}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Placa do veículo *</label>
                      <div className="relative">
                        <Car className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          value={plate}
                          onChange={(e) => {
                            const masked = maskPlate(e.target.value)
                            setPlate(masked)
                            // Limpar erro quando o usuário começar a digitar
                            if (plateError) {
                              setPlateError("")
                            }
                            // Validar em tempo real quando tiver 7 caracteres
                            if (masked.length === 7) {
                              const validation = validatePlate(masked)
                              if (!validation.isValid) {
                                setPlateError(validation.error || "Placa inválida")
                              } else {
                                setPlateError("")
                              }
                            }
                          }}
                          onBlur={() => {
                            // Validar quando o campo perder o foco
                            if (plate) {
                              const validation = validatePlate(plate)
                              if (!validation.isValid) {
                                setPlateError(validation.error || "Placa inválida")
                              } else {
                                setPlateError("")
                              }
                            }
                          }}
                          placeholder="ABC1234 ou ABC1D23"
                          maxLength={7}
                          className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                            plateError 
                              ? "border-red-500 focus:ring-red-500" 
                              : "border-gray-300"
                          }`}
                          required
                        />
                      </div>
                      {plateError && (
                        <p className="mt-1 text-sm text-red-600">{plateError}</p>
                      )}
                      {!plateError && plate.length > 0 && plate.length < 7 && (
                        <p className="mt-1 text-xs text-gray-500">
                          Digite {7 - plate.length} caractere{7 - plate.length > 1 ? "s" : ""} restante{7 - plate.length > 1 ? "s" : ""}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nome *</label>
                      <div className="relative">
                        <User className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Seu nome"
                          className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${user ? 'bg-gray-50' : ''}`}
                          required
                          readOnly={!!user}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu@email.com"
                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${user ? 'bg-gray-50' : ''}`}
                        required
                        readOnly={!!user}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pagamento *</label>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 text-gray-700">
                          <input type="radio" name="pay" checked={payment==='pix'} onChange={() => setPayment('pix')} />
                          <span className="inline-flex items-center gap-2"><CreditCard className="w-4 h-4" /> Pix</span>
                        </label>
                        <label className="flex items-center gap-2 text-gray-700">
                          <input type="radio" name="pay" checked={payment==='cartao'} onChange={() => setPayment('cartao')} />
                          <span className="inline-flex items-center gap-2"><CreditCard className="w-4 h-4" /> Cartão</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Resumo */}
                  <div className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="text-gray-500">Vaga</div>
                        <div className="font-semibold">{selectedSpot || '--'}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Data</div>
                        <div className="font-semibold">{date ? new Date(date).toLocaleDateString('pt-BR') : '--'}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Início</div>
                        <div className="font-semibold">{startTime || '--'}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Término</div>
                        <div className="font-semibold">{endTime || '--'}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Duração</div>
                        <div className="font-semibold">{duration}h</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Valor</div>
                        <div className="font-semibold">R$ {price.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botão submit (desabilitado até escolher vaga) */}
              <div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 sticky top-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Confirmação</h3>
                  <p className="text-gray-600 text-sm mb-4">Preencha seus dados e selecione uma vaga para continuar.</p>
                  {formError && <div className="text-red-600 text-sm mb-3">{formError}</div>}
                  {error && <div className="text-red-600 text-sm mb-3">{error}</div>}
                  <Button type="submit" variant="primary" size="lg" className="w-full" icon="arrow" >
                    {loading ? "Processando..." : "Confirmar Reserva"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Seleção de vaga (segundo passo) */}
            <div className={`transition-opacity ${canChooseSpot ? 'opacity-100' : 'opacity-60 pointer-events-none'}`}>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary-600" />
                    <h3 className="text-lg font-bold text-gray-900">Selecione uma vaga</h3>
                  </div>
                  <span className="text-sm text-gray-500">{filtered.length}/{slots.length} vagas</span>
                </div>

                {/* Toolbar de filtros */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
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
                        <option value="reservada">Reservadas</option>
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
                  </div>
                </div>

                {!canChooseSpot && (
                  <div className="mb-4 text-sm text-gray-600">Preencha data, duração, horário e seus dados para habilitar a seleção de vagas.</div>
                )}

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
                              Livre {group.filter(s => mapStatus(s, sensorsData, reservations) === "livre").length} • Ocupada {group.filter(s => mapStatus(s, sensorsData, reservations) === "ocupada").length} • Reservada {group.filter(s => mapStatus(s, sensorsData, reservations) === "reservada").length} • Manutenção {group.filter(s => mapStatus(s, sensorsData, reservations) === "manutencao").length}
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-6">
                            {group.sort((a,b) => a.number - b.number).map((slot) => {
                              const status = mapStatus(slot, sensorsData, reservations)
                              const selectable = isSpotSelectable(slot)
                              const selected = selectedSpot === slot.id
                              return (
                                <button
                                  key={slot.id}
                                  type="button"
                                  className={`relative ${selected ? 'ring-4 ring-primary-300 rounded-2xl' : ''}`}
                                  onClick={() => selectable && setSelectedSpot(slot.id)}
                                  disabled={!selectable || !canChooseSpot}
                                  title={selectable ? 'Selecionar' : 'Indisponível'}
                                >
                                  <ParkingSpot id={String(slot.number).padStart(2,'0')} status={status} />
                                  {!selectable && (
                                    <div className="absolute inset-0 rounded-2xl bg-white/50 cursor-not-allowed"></div>
                                  )}
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      )
                    })
                  })()}
                </div>

                {/* Placas Ativas */}
                {activePlates.length > 0 && (
                  <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-blue-900 mb-3 flex items-center gap-2">
                      <Car className="w-4 h-4" />
                      Placas com reservas ativas agora ({activePlates.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activePlates.map((item, index) => (
                        <div key={index} className="bg-white border border-blue-200 rounded-lg px-3 py-2 text-sm">
                          <div className="font-medium text-gray-900">{item.plate}</div>
                          <div className="text-xs text-gray-500">
                            {item.parkingName} - Vaga {item.slotNumber}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(item.startTime).toLocaleTimeString("pt-BR", { 
                              hour: "2-digit", 
                              minute: "2-digit" 
                            })} - {new Date(item.endTime).toLocaleTimeString("pt-BR", { 
                              hour: "2-digit", 
                              minute: "2-digit" 
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Legenda */}
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  {[
                    { label: "Livre", className: "bg-green-500" },
                    { label: "Ocupada", className: "bg-red-500" },
                    { label: "Reservada", className: "bg-yellow-500" },
                    { label: "Manutenção", className: "bg-gray-400" },
                  ].map((l, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className={`w-3 h-3 rounded-full ${l.className}`}></span>
                      {l.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </form>
        )}
      </main>

      <Footer />
    </div>
  )
}
