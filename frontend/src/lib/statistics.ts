export interface SlotData {
    id: string
    parkingId: string
    isAvailable: boolean
    isActive: boolean
    number: number
    createdAt: string
    updatedAt: string
}

export interface SensorData {
    id: string
    sensorId: string
    parkingSlotId?: string
    value?: string | number | boolean
    createdAt: string
}

export interface StatisticsResult {
    mean: number
    median: number
    mode: number
    standardDeviation: number
    variance: number
    min: number
    max: number
    range: number
}

// Função para calcular estatísticas básicas
export function calculateStatistics(data: number[]): StatisticsResult {
    if (data.length === 0) {
        return {
            mean: 0,
            median: 0,
            mode: 0,
            standardDeviation: 0,
            variance: 0,
            min: 0,
            max: 0,
            range: 0
        }
    }

    const sorted = [...data].sort((a, b) => a - b)
    
    // Média
    const mean = data.reduce((sum, val) => sum + val, 0) / data.length
    
    // Mediana
    const median = sorted.length % 2 === 0
        ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
        : sorted[Math.floor(sorted.length / 2)]
    
    // Moda
    const frequency: { [key: number]: number } = {}
    data.forEach(val => {
        frequency[val] = (frequency[val] || 0) + 1
    })
    const mode = parseInt(Object.keys(frequency).reduce((a, b) => 
        frequency[parseInt(a)] > frequency[parseInt(b)] ? a : b
    ))
    
    // Variância
    const variance = data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / data.length
    
    // Desvio padrão
    const standardDeviation = Math.sqrt(variance)
    
    // Min, Max, Range
    const min = Math.min(...data)
    const max = Math.max(...data)
    const range = max - min

    return {
        mean: Math.round(mean * 100) / 100,
        median: Math.round(median * 100) / 100,
        mode,
        standardDeviation: Math.round(standardDeviation * 100) / 100,
        variance: Math.round(variance * 100) / 100,
        min,
        max,
        range
    }
}

// Função para calcular estatísticas de ocupação por período
export function calculateOccupancyByPeriod(slots: SlotData[], period: 'hour' | 'day' | 'week' = 'day') {
    const now = new Date()
    const periods: { [key: string]: { occupied: number; total: number } } = {}
    
    slots.forEach(slot => {
        const slotDate = new Date(slot.updatedAt)
        let periodKey: string
        
        switch (period) {
            case 'hour':
                periodKey = `${slotDate.getFullYear()}-${String(slotDate.getMonth() + 1).padStart(2, '0')}-${String(slotDate.getDate()).padStart(2, '0')} ${String(slotDate.getHours()).padStart(2, '0')}:00`
                break
            case 'day':
                periodKey = `${slotDate.getFullYear()}-${String(slotDate.getMonth() + 1).padStart(2, '0')}-${String(slotDate.getDate()).padStart(2, '0')}`
                break
            case 'week':
                const weekStart = new Date(slotDate)
                weekStart.setDate(slotDate.getDate() - slotDate.getDay())
                periodKey = `${weekStart.getFullYear()}-${String(weekStart.getMonth() + 1).padStart(2, '0')}-${String(weekStart.getDate()).padStart(2, '0')}`
                break
        }
        
        if (!periods[periodKey]) {
            periods[periodKey] = { occupied: 0, total: 0 }
        }
        
        periods[periodKey].total++
        if (!slot.isAvailable && slot.isActive) {
            periods[periodKey].occupied++
        }
    })
    
    return Object.entries(periods).map(([period, data]) => ({
        period,
        occupied: data.occupied,
        total: data.total,
        occupancyRate: Math.round((data.occupied / data.total) * 100)
    })).sort((a, b) => new Date(a.period).getTime() - new Date(b.period).getTime())
}

// Função para calcular estatísticas por estacionamento
export function calculateParkingStats(slots: SlotData[], parkings: { id: string; name: string }[]) {
    return parkings.map(parking => {
        const parkingSlots = slots.filter(slot => slot.parkingId === parking.id)
        const total = parkingSlots.length
        const occupied = parkingSlots.filter(slot => !slot.isAvailable && slot.isActive).length
        const available = parkingSlots.filter(slot => slot.isAvailable && slot.isActive).length
        const maintenance = parkingSlots.filter(slot => !slot.isActive).length
        
        return {
            parkingId: parking.id,
            parkingName: parking.name,
            total,
            occupied,
            available,
            maintenance,
            occupancyRate: total > 0 ? Math.round((occupied / total) * 100) : 0
        }
    })
}

// Função para calcular tendências
export function calculateTrends(data: number[]): {
    trend: 'up' | 'down' | 'stable'
    percentage: number
} {
    if (data.length < 2) {
        return { trend: 'stable', percentage: 0 }
    }
    
    const firstHalf = data.slice(0, Math.floor(data.length / 2))
    const secondHalf = data.slice(Math.floor(data.length / 2))
    
    const firstAvg = firstHalf.reduce((sum, val) => sum + val, 0) / firstHalf.length
    const secondAvg = secondHalf.reduce((sum, val) => sum + val, 0) / secondHalf.length
    
    const percentage = Math.round(((secondAvg - firstAvg) / firstAvg) * 100)
    
    if (percentage > 5) return { trend: 'up', percentage }
    if (percentage < -5) return { trend: 'down', percentage }
    return { trend: 'stable', percentage }
}
