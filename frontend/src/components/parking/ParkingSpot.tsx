import { Car } from "lucide-react"

export type SpotStatus = "livre" | "ocupada" | "reservada" | "manutencao"

interface ParkingSpotProps {
  id: string
  status: SpotStatus
  className?: string
}

const statusStyles: Record<SpotStatus, { bg: string; border: string; text: string; label: string }> = {
  livre: { bg: "bg-green-100", border: "border-green-500", text: "text-green-700", label: "Livre" },
  ocupada: { bg: "bg-red-100", border: "border-red-500", text: "text-red-700", label: "Ocupada" },
  reservada: { bg: "bg-yellow-100", border: "border-yellow-500", text: "text-yellow-700", label: "Reservada" },
  manutencao: { bg: "bg-gray-100", border: "border-gray-400", text: "text-gray-700", label: "Manutenção" },
}

export default function ParkingSpot({ id, status, className = "" }: ParkingSpotProps) {
  const styles = statusStyles[status]

  return (
    <div
      className={`relative w-36 h-24 sm:w-44 sm:h-28 ${styles.bg} border-2 ${styles.border} rounded-xl shadow-md ${className}`}
    >
      <div className="absolute -top-3 -left-3 bg-white rounded-md px-2 py-1 text-xs font-bold shadow">
        {id}
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <Car className={`w-10 h-10 sm:w-12 sm:h-12 ${styles.text} opacity-80`} />
      </div>

      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white rounded-full px-3 py-1 text-xs font-semibold shadow ${styles.text}">
        {styles.label}
      </div>
    </div>
  )
}
