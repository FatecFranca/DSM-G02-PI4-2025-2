import { useState, useEffect } from "react"
import Button from "../ui/Button"

export default function HeroSection() {
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    return (
        <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 py-20 md:py-32 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full animate-pulse-soft"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
            </div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center">
                    <h1 className={`text-5xl md:text-7xl font-bold text-white mb-6 leading-tight ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
                        Smart <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Parking</span>
                    </h1>
                    <p className={`text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto leading-relaxed ${isLoaded ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
                        Sistema inteligente de estacionamento com IoT, Arduino e sensores IR. 
                        Monitore vagas em tempo real, reserve sua vaga e pague online.
                    </p>
                    <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isLoaded ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
                        <Button variant="secondary" size="lg" icon="play">
                            Ver Demonstração
                        </Button>
                        <Button variant="outline" size="lg" icon="arrow">
                            Saiba Mais
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
