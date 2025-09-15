import { useState, useEffect } from "react"

interface StatCounterProps {
    number: number
    label: string
    suffix?: string
    className?: string
}

export default function StatCounter({ 
    number, 
    label, 
    suffix = "",
    className = ""
}: StatCounterProps) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        const duration = 2000
        const steps = 60
        const increment = number / steps
        let current = 0

        const timer = setInterval(() => {
            current += increment
            if (current >= number) {
                setCount(number)
                clearInterval(timer)
            } else {
                setCount(Math.floor(current))
            }
        }, duration / steps)

        return () => clearInterval(timer)
    }, [number])

    return (
        <div className={`text-center ${className}`}>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {count.toLocaleString('pt-BR')}{suffix}
            </div>
            <div className="text-primary-100 text-lg font-medium">{label}</div>
        </div>
    )
}
