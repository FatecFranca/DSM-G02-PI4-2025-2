import { Zap, Smartphone, BarChart3 } from "lucide-react"
import Card from "../ui/Card"

export default function AboutSection() {
    const features = [
        {
            icon: Zap,
            title: "Tecnologia IoT",
            description: "Sensores inteligentes conectados que monitoram cada vaga em tempo real"
        },
        {
            icon: Smartphone,
            title: "App Intuitivo",
            description: "Interface moderna e fácil de usar para web e dispositivos móveis"
        },
        {
            icon: BarChart3,
            title: "Analytics",
            description: "Relatórios detalhados e insights sobre o uso do estacionamento"
        }
    ]

    return (
        <section id="sobre" className="py-16">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    Sobre o <span className="text-primary-500">Smart Parking</span>
                </h2>
                <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                    O Smart Parking é um sistema revolucionário que utiliza tecnologia IoT para transformar 
                    a experiência de estacionamento. Através da integração de Arduino, sensores infravermelhos 
                    e aplicações web/mobile, oferecemos uma solução completa e inteligente.
                </p>
                
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {features.map((feature, index) => (
                        <Card key={index} variant="default" delay={index * 200}>
                            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                <feature.icon className="w-6 h-6 text-primary-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
