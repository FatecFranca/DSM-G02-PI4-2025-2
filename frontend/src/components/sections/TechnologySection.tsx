import { CheckCircle, Wifi } from "lucide-react"
import Card from "../ui/Card"

export default function TechnologySection() {
    const technologies = [
        {
            title: "Arduino & Sensores IR",
            description: "Hardware confiável para detecção precisa de veículos"
        },
        {
            title: "Next.js & React",
            description: "Interface moderna e responsiva para web e mobile"
        },
        {
            title: "Conectividade IoT",
            description: "Comunicação em tempo real entre dispositivos"
        },
        {
            title: "Cloud Integration",
            description: "Armazenamento seguro e sincronização de dados"
        }
    ]

    return (
        <section id="tecnologia" className="py-16">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    <span className="text-primary-500">Tecnologia</span> Avançada
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Stack moderno e confiável para garantir performance e escalabilidade
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <div className="space-y-6">
                        {technologies.map((tech, index) => (
                            <div key={index} className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                                    <CheckCircle className="w-6 h-6 text-primary-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{tech.title}</h3>
                                    <p className="text-gray-600">{tech.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Card variant="tech">
                    <div className="text-center mb-8">
                        <Wifi className="w-16 h-16 mx-auto mb-4 animate-pulse-soft" />
                        <h3 className="text-2xl font-bold mb-2">Sistema Conectado</h3>
                        <p className="text-primary-100">
                            Todos os componentes trabalham em harmonia para oferecer uma experiência perfeita
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="bg-white/10 rounded-xl p-4">
                            <div className="text-2xl font-bold">99.9%</div>
                            <div className="text-sm text-primary-100">Uptime</div>
                        </div>
                        <div className="bg-white/10 rounded-xl p-4">
                            <div className="text-2xl font-bold">&lt;1s</div>
                            <div className="text-sm text-primary-100">Resposta</div>
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}
