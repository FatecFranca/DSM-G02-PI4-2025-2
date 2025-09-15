"use client"

import { useEffect, useState } from "react"
import StatCounter from "../ui/StatCounter"
import api from "@/lib/api"

type StatisticsResponse = {
    parkings: { total: number; active: number }
    parkingSlots: { total: number; available: number; occupied: number }
    sensors: { total: number; active: number }
    parkingSensors: { total: number; active: number }
    dataPoints: { sensorsData: number; parkingSensorsData: number }
}

export default function StatsSection() {
    const [data, setData] = useState<StatisticsResponse | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isMounted = true
        setLoading(true)
        setError(null)
        api
            .get<StatisticsResponse>("/statistics", { cache: "no-store" })
            .then((res) => {
                if (!isMounted) return
                setData(res)
            })
            .catch((e: unknown) => {
                if (!isMounted) return
                setError(e instanceof Error ? e.message : "Erro ao carregar estatísticas")
            })
            .finally(() => {
                if (!isMounted) return
                setLoading(false)
            })
        return () => {
            isMounted = false
        }
    }, [])

    const cards = (() => {
        if (!data) return []
        return [
            { number: data.parkingSlots.total, label: "Vagas Totais" },
            { number: data.parkingSlots.available, label: "Vagas Disponíveis" },
            { number: data.parkingSlots.occupied, label: "Vagas Ocupadas" },
            { number: data.sensors.active, label: "Sensores Ativos" },
        ] as { number: number; label: string; suffix?: string }[]
    })()

    return (
        <section className="bg-primary-800 py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {error && (
                    <div className="text-center text-primary-100 mb-6">{error}</div>
                )}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {loading &&
                        Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="text-center animate-pulse">
                                <div className="h-12 md:h-14 bg-primary-700 rounded mb-2" />
                                <div className="h-5 bg-primary-700 rounded w-2/3 mx-auto" />
                            </div>
                        ))}
                    {!loading &&
                        cards.map((stat, index) => (
                            <StatCounter
                                key={index}
                                number={stat.number}
                                label={stat.label}
                                suffix={stat.suffix}
                            />
                        ))}
                </div>
            </div>
        </section>
    )
}
