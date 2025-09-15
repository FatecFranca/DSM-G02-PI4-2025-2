"use client"

import {
    Car,
    Cpu,
    Wifi,
    Zap,
    Users,
    Target,
    Award,
    Lightbulb,
    Code,
    Database,
    Shield,
    Globe,
    ArrowRight,
    ExternalLink
} from "lucide-react"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Button from "@/components/ui/Button"

export default function SobrePage() {
    const teamMembers = [
        {
            name: "Equipe Smart Parking",
            role: "Desenvolvedores IoT & Software",
            description: "Especialistas em Arduino, sensores e desenvolvimento web/mobile"
        }
    ]

    const components = [
        {
            name: "Arduino Uno",
            description: "Microcontrolador principal do sistema",
            specs: "ATmega328P, 14 I/O digitais, 6 analógicos",
            link: "https://marobotic.com/product/arduino-uno-r3-board/"
        },
        {
            name: "Display LCD 20×4",
            description: "Interface de visualização para usuários",
            specs: "20 colunas × 4 linhas, backlight azul",
            link: "https://marobotic.com/product/20x4-lcd-display/"
        },
        {
            name: "Módulo I2C LCD",
            description: "Interface de comunicação I2C para LCD",
            specs: "Conversor I2C para LCD, endereço configurável",
            link: "https://marobotic.com/product/i2c-lcd-module/"
        },
        {
            name: "Header Macho",
            description: "Conectores para montagem do circuito",
            specs: "2.54mm pitch, 40 pinos",
            link: "https://marobotic.com/product/2-54mm-40-pin-male-header/"
        },
        {
            name: "Header Fêmea",
            description: "Conectores complementares",
            specs: "2.54mm pitch, 40 pinos",
            link: "https://marobotic.com/product/2-54mm-40-pin-female-header/"
        },
        {
            name: "Sensor IR",
            description: "Detecção de presença de veículos",
            specs: "Infravermelho, alcance 2-30cm",
            link: "https://marobotic.com/product/ir-infrared-obstacle-avoidance-sensor/"
        },
        {
            name: "Servo Motor SG-90",
            description: "Controle de barreiras e mecanismos",
            specs: "9g, torque 1.8kg/cm, 180° rotação",
            link: "https://marobotic.com/product/mini-servo-motor-sg-90/"
        },
        {
            name: "Conector DC Fêmea",
            description: "Alimentação externa do sistema",
            specs: "5.5mm × 2.1mm, suporte até 5A",
            link: "https://marobotic.com/product/female-dc-power-jack-connector/"
        },
        {
            name: "Adaptador 5V 2A",
            description: "Fonte de alimentação principal",
            specs: "5V DC, 2A, entrada 100-240V AC",
            link: "https://marobotic.com/product/5v-2amp-power-adapter/"
        }
    ]

    const technologies = [
        {
            icon: Cpu,
            title: "Arduino IoT",
            description: "Microcontrolador Arduino Uno com sensores IR para detecção de veículos em tempo real"
        },
        {
            icon: Wifi,
            title: "Conectividade",
            description: "Comunicação wireless entre sensores e sistema central via módulos de comunicação"
        },
        {
            icon: Database,
            title: "Backend",
            description: "API RESTful com Node.js e banco de dados para gerenciamento de dados"
        },
        {
            icon: Code,
            title: "Frontend",
            description: "Interface web responsiva com React/Next.js e aplicativo mobile"
        },
        {
            icon: Shield,
            title: "Segurança",
            description: "Autenticação JWT, criptografia SSL e validação de dados"
        },
        {
            icon: Globe,
            title: "Cloud",
            description: "Deploy na nuvem com monitoramento e backup automático"
        }
    ]

    const milestones = [
        {
            year: "2024",
            title: "Lançamento do Smart Parking",
            description: "Sistema completo de estacionamento inteligente com IoT"
        },
        {
            year: "2023",
            title: "Desenvolvimento do Protótipo",
            description: "Primeira versão funcional com Arduino e sensores IR"
        },
        {
            year: "2023",
            title: "Concepção do Projeto",
            description: "Idealização da solução IoT para estacionamentos"
        }
    ]

    return (
        <div className="bg-gray-50 min-h-screen text-gray-900">
            <Header />

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Car className="w-10 h-10 text-primary-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Sobre o <span className="text-primary-500">Smart Parking</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Somos uma empresa de estacionamento que utiliza tecnologia IoT para oferecer uma experiência inteligente e conveniente aos nossos clientes.
                    </p>
                </div>

                {/* Mission & Vision */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                            <Target className="w-6 h-6 text-primary-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Nossa Missão</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Oferecer estacionamento inteligente e conveniente, utilizando tecnologia IoT para proporcionar aos nossos clientes uma experiência moderna e eficiente.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                            <Lightbulb className="w-6 h-6 text-primary-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Nossa Visão</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Ser referência em estacionamento inteligente, oferecendo a melhor experiência aos nossos clientes através da tecnologia IoT.
                        </p>
                    </div>
                </div>

                {/* Technology Stack */}
                <section className="mb-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            <span className="text-primary-500">Tecnologia</span> IoT
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Utilizamos tecnologia IoT com sensores e aplicativo para oferecer estacionamento inteligente aos nossos clientes.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {technologies.map((tech, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                                    <tech.icon className="w-6 h-6 text-primary-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">{tech.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{tech.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Hardware Components */}
                <section className="mb-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            <span className="text-primary-500">Componentes</span> Hardware
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Conheça os componentes IoT que utilizamos em nossos estacionamentos para detectar vagas e controlar o acesso.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {components.map((component, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-lg font-bold text-gray-900">{component.name}</h3>
                                    <a
                                        href={component.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary-600 hover:text-primary-700 transition-colors"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                                <p className="text-gray-600 mb-3">{component.description}</p>
                                <p className="text-sm text-gray-500 font-medium">{component.specs}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* How It Works */}
                <section className="mb-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Como <span className="text-primary-500">Funciona</span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Entenda como funciona nosso estacionamento inteligente, desde a detecção de vagas até o pagamento.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-primary-600">1</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Detecção</h3>
                                <p className="text-gray-600 text-sm">
                                    Sensores IR detectam a presença de veículos em cada vaga
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-primary-600">2</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Processamento</h3>
                                <p className="text-gray-600 text-sm">
                                    Arduino processa os dados e envia para o servidor
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-primary-600">3</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Aplicativo</h3>
                                <p className="text-gray-600 text-sm">
                                    Usuários veem vagas disponíveis e fazem reservas
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-primary-600">4</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Pagamento</h3>
                                <p className="text-gray-600 text-sm">
                                    Sistema integrado processa pagamentos online
                                </p>
                            </div>
                        </div>
                    </div>
                </section>


                {/* CTA Section */}
                <section className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl text-white text-center p-12">
                    <h2 className="text-3xl font-bold mb-6">
                        Pronto para estacionar?
                    </h2>
                    <p className="text-xl text-primary-100 mb-8 leading-relaxed">
                        Veja as vagas disponíveis e faça sua reserva.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button variant="secondary" size="lg" icon="arrow">
                            Ver Vagas
                        </Button>
                        <Button variant="outline" size="lg">
                            Contato
                        </Button>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
