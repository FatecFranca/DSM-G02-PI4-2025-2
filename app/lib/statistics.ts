export interface SlotData {
    id: string
    parkingId: string
    isAvailable: boolean
    isActive: boolean
    number?: number
    createdAt: string
    updatedAt: string
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
    skewness: number
    kurtosis: number
    probability?: {
        cumulative: number
        percentile: number
    }
    regression?: {
        slope: number
        intercept: number
        rSquared: number
    }
    inference?: {
        confidenceInterval: [number, number]
        marginOfError: number
    }
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
            range: 0,
            skewness: 0,
            kurtosis: 0,
            probability: {
                cumulative: 0,
                percentile: 0
            },
            regression: {
                slope: 0,
                intercept: 0,
                rSquared: 0
            },
            inference: {
                confidenceInterval: [0, 0],
                marginOfError: 0
            }
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
    const maxFreq = Math.max(...Object.values(frequency))
    const mode = parseFloat(Object.keys(frequency).find(key => frequency[parseFloat(key)] === maxFreq) || '0')
    
    // Variância
    const variance = data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / data.length
    
    // Desvio padrão
    const standardDeviation = Math.sqrt(variance)
    
    // Min, Max, Range
    const min = Math.min(...data)
    const max = Math.max(...data)
    const range = max - min

    // Assimetria (Skewness)
    const skewness = data.length > 2 && standardDeviation > 0
        ? data.reduce((sum, val) => {
            const z = (val - mean) / standardDeviation
            return sum + Math.pow(z, 3)
        }, 0) / data.length
        : 0

    // Curtose (Kurtosis)
    const kurtosis = data.length > 3 && standardDeviation > 0
        ? (data.reduce((sum, val) => {
            const z = (val - mean) / standardDeviation
            return sum + Math.pow(z, 4)
        }, 0) / data.length) - 3
        : 0

    // Probabilidades
    const probability = {
        cumulative: Math.max(0, Math.min(1, data.filter(val => val <= mean).length / data.length)),
        percentile: max > 0 ? Math.max(0, Math.min(100, (mean / max) * 100)) : 0
    }

    // Regressão Linear Simples
    const n = data.length
    const sumX = (n * (n - 1)) / 2
    const sumY = data.reduce((sum, val) => sum + val, 0)
    const sumXY = data.reduce((sum, val, index) => sum + index * val, 0)
    const sumX2 = (n * (n - 1) * (2 * n - 1)) / 6
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
    const intercept = (sumY - slope * sumX) / n
    
    // R²
    const yMean = mean
    const ssRes = data.reduce((sum, val, index) => {
        const predicted = slope * index + intercept
        return sum + Math.pow(val - predicted, 2)
    }, 0)
    const ssTot = data.reduce((sum, val) => sum + Math.pow(val - yMean, 2), 0)
    const rSquared = ssTot > 0 ? 1 - (ssRes / ssTot) : 0

    const regression = {
        slope: isNaN(slope) ? 0 : slope,
        intercept: isNaN(intercept) ? 0 : intercept,
        rSquared: isNaN(rSquared) ? 0 : Math.max(0, Math.min(1, rSquared))
    }

    // Inferência Estatística
    const zScore = 1.96
    const marginOfError = standardDeviation > 0 && n > 1
        ? zScore * (standardDeviation / Math.sqrt(n))
        : 0
    const confidenceInterval: [number, number] = [
        mean - marginOfError,
        mean + marginOfError
    ]

    const inference = {
        confidenceInterval,
        marginOfError
    }

    return {
        mean: Math.round(mean * 100) / 100,
        median: Math.round(median * 100) / 100,
        mode: Math.round(mode * 100) / 100,
        standardDeviation: Math.round(standardDeviation * 100) / 100,
        variance: Math.round(variance * 100) / 100,
        min,
        max,
        range,
        skewness: Math.round(skewness * 100) / 100,
        kurtosis: Math.round(kurtosis * 100) / 100,
        probability,
        regression,
        inference
    }
}

// Função para calcular estatísticas de ocupação por período
export function calculateOccupancyByPeriod(slots: SlotData[], period: 'hour' | 'day' | 'week' = 'day') {
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
