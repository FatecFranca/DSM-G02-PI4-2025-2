import { MapPin, Smartphone, Shield, CreditCard } from "lucide-react"
import Card from "../ui/Card"

export default function FeaturesSection() {
    const features = [
        {
            icon: MapPin,
            title: "Monitoramento em Tempo Real",
            description: "Veja a disponibilidade de vagas instantaneamente através de sensores IR conectados",
            delay: 0
        },
        {
            icon: Smartphone,
            title: "Reserva pelo App",
            description: "Reserve sua vaga antecipadamente através do aplicativo mobile ou web",
            delay: 200
        },
        {
            icon: Shield,
            title: "Painel Administrativo",
            description: "Controle completo do estacionamento com relatórios e configurações avançadas",
            delay: 400
        },
        {
            icon: CreditCard,
            title: "Pagamentos Online",
            description: "Integração com sistemas de pagamento para transações seguras e rápidas",
            delay: 600
        }
    ]

    return (
        <section id="funcionalidades" className="py-16 bg-gray-100 rounded-3xl">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    Funcionalidades <span className="text-primary-500">Principais</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Recursos avançados que tornam o gerenciamento de estacionamento mais eficiente e conveniente
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                    <Card key={index} variant="feature" delay={feature.delay}>
                        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl">
                            <feature.icon className="w-8 h-8 text-primary-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{feature.title}</h3>
                        <p className="text-gray-600 text-center leading-relaxed">{feature.description}</p>
                    </Card>
                ))}
            </div>
        </section>
    )
}
