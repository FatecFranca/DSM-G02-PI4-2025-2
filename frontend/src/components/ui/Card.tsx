import { ReactNode, useState, useEffect } from "react"

interface CardProps {
    children: ReactNode
    variant?: "default" | "feature" | "stat" | "tech"
    className?: string
    delay?: number
}

export default function Card({ 
    children, 
    variant = "default", 
    className = "",
    delay = 0 
}: CardProps) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), delay)
        return () => clearTimeout(timer)
    }, [delay])

    const variants = {
        default: "bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500",
        feature: "bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500",
        stat: "bg-white/10 rounded-xl p-4 text-center",
        tech: "bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl p-8 text-white"
    }

    return (
        <div className={`
            ${variants[variant]}
            ${isVisible ? 'animate-fade-in' : 'opacity-0'}
            ${className}
        `}>
            {children}
        </div>
    )
}
