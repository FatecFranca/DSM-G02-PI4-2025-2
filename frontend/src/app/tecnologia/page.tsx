"use client"

import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
import Button from "@/components/ui/Button"
import {
    ArrowRight,
    Database as Backend,
    CheckCircle,
    Cloud,
    Cpu,
    Globe,
    Smartphone as Mobile,
    Wifi as Network,
    Server,
    Shield,
    Smartphone,
    Zap
} from "lucide-react"

export default function TecnologiaPage() {
    const techStack = [
        {
            icon: Cpu,
            title: "Hardware IoT",
            description: "Sensores e microcontroladores Arduino para detecção em tempo real",
            features: [
                "Sensores IR para detecção de veículos",
                "Arduino Uno como microcontrolador principal",
                "Servo motores para controle de barreiras",
                "Display LCD para interface local"
            ]
        },
        {
            icon: Network,
            title: "Conectividade",
            description: "Comunicação wireless entre dispositivos e servidor central",
            features: [
                "Módulos WiFi para transmissão de dados",
                "Protocolo HTTP para comunicação com API",
                "Sincronização em tempo real",
                "Backup de dados local"
            ]
        },
        {
            icon: Backend,
            title: "Backend & API",
            description: "Servidor robusto para processamento e armazenamento de dados",
            features: [
                "Node.js com Express.js",
                "Banco de dados PostgreSQL",
                "API RESTful para integração",
                "Autenticação JWT segura"
            ]
        },
        {
            icon: Mobile,
            title: "App Mobile",
            description: "Aplicativo nativo para Android e iOS",
            features: [
                "React Native para desenvolvimento",
                "Interface intuitiva e responsiva",
                "Notificações push em tempo real",
                "Integração com pagamentos"
            ]
        },
        {
            icon: Globe,
            title: "Web Dashboard",
            description: "Painel administrativo web para gestão completa",
            features: [
                "Next.js com TypeScript",
                "Interface moderna e responsiva",
                "Relatórios e analytics",
                "Gestão de usuários e permissões"
            ]
        },
        {
            icon: Shield,
            title: "Segurança",
            description: "Proteção de dados e infraestrutura segura",
            features: [
                "Criptografia SSL/TLS",
                "Autenticação multifator",
                "Backup automático de dados",
                "Monitoramento de segurança 24/7"
            ]
        }
    ]

    const sensors = [
        {
            name: "Sensor IR (Infravermelho)",
            description: "Detecta presença de veículos em cada vaga",
            specs: "Alcance 2-30cm, resposta rápida, baixo consumo",
            function: "Identifica quando um carro entra ou sai da vaga"
        },
        {
            name: "Arduino Uno",
            description: "Microcontrolador principal do sistema",
            specs: "ATmega328P, 14 I/O digitais, 6 analógicos",
            function: "Processa dados dos sensores e controla periféricos"
        },
        {
            name: "Servo Motor SG-90",
            description: "Controle de barreiras e mecanismos",
            specs: "9g, torque 1.8kg/cm, rotação 180°",
            function: "Abre e fecha barreiras automaticamente"
        },
        {
            name: "Display LCD 20×4",
            description: "Interface visual para usuários",
            specs: "20 colunas × 4 linhas, backlight azul",
            function: "Mostra status das vagas e informações locais"
        }
    ]

    const systemFlow = [
        {
            step: 1,
            title: "Detecção",
            description: "Sensores IR detectam a presença de veículos em cada vaga do estacionamento",
            icon: Cloud
        },
        {
            step: 2,
            title: "Processamento",
            description: "Arduino processa os dados e envia informações para o servidor via WiFi",
            icon: Cpu
        },
        {
            step: 3,
            title: "Servidor",
            description: "API recebe e processa dados, atualiza banco de dados em tempo real",
            icon: Server
        },
        {
            step: 4,
            title: "Aplicativo",
            description: "App mobile e web mostram vagas disponíveis e permitem reservas",
            icon: Smartphone
        },
        {
            step: 5,
            title: "Pagamento",
            description: "Sistema integrado processa pagamentos online de forma segura",
            icon: Zap
        }
    ]

    const benefits = [
        {
            icon: CheckCircle,
            title: "Tempo Real",
            description: "Atualização instantânea do status das vagas"
        },
        {
            icon: CheckCircle,
            title: "Precisão",
            description: "Detecção confiável com sensores de alta qualidade"
        },
        {
            icon: CheckCircle,
            title: "Escalabilidade",
            description: "Sistema modular que cresce com sua necessidade"
        },
        {
            icon: CheckCircle,
            title: "Confiabilidade",
            description: "Backup de dados e redundância de sistemas"
        },
        {
            icon: CheckCircle,
            title: "Segurança",
            description: "Criptografia e autenticação robustas"
        },
        {
            icon: CheckCircle,
            title: "Facilidade",
            description: "Interface intuitiva para gestores e clientes"
        }
    ]

    return (
        <div className="bg-gray-50 min-h-screen text-gray-900">
            <Header />

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Cpu className="w-10 h-10 text-primary-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Nossa <span className="text-primary-500">Tecnologia</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Conheça a tecnologia IoT por trás dos nossos estacionamentos inteligentes. Sensores, aplicativo mobile, sistema web e muito mais.
                    </p>
                </div>

                {/* Tech Stack */}
                <section className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Stack <span className="text-primary-500">Tecnológica</span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Nossa solução completa combina hardware IoT, software moderno e conectividade para oferecer a melhor experiência.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {techStack.map((tech, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                                    <tech.icon className="w-6 h-6 text-primary-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{tech.title}</h3>
                                <p className="text-gray-600 mb-4 leading-relaxed">{tech.description}</p>
                                <ul className="space-y-2">
                                    {tech.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-sm text-gray-600">
                                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* How It Works */}
                <section className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Como <span className="text-primary-500">Funciona</span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Entenda o fluxo completo da nossa tecnologia, desde a detecção até o pagamento.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
                            {systemFlow.map((flow, index) => (
                                <div key={index} className="text-center">
                                    <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <flow.icon className="w-8 h-8 text-primary-600" />
                                    </div>
                                    <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                                        {flow.step}
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{flow.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {flow.description}
                                    </p>
                                    {index < systemFlow.length - 1 && (
                                        <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                                            <ArrowRight className="w-6 h-6 text-primary-400" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Sensors Section */}
                <section className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            <span className="text-primary-500">Sensores</span> IoT
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Conheça os componentes IoT que utilizamos para detectar veículos e controlar o acesso.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {sensors.map((sensor, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">{sensor.name}</h3>
                                <p className="text-gray-600 mb-4">{sensor.description}</p>
                                <div className="space-y-2">
                                    <div>
                                        <span className="text-sm font-semibold text-gray-700">Especificações:</span>
                                        <p className="text-sm text-gray-600">{sensor.specs}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-semibold text-gray-700">Função:</span>
                                        <p className="text-sm text-gray-600">{sensor.function}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Benefits */}
                <section className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            <span className="text-primary-500">Vantagens</span> da Tecnologia
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Por que nossa tecnologia IoT é a escolha certa para estacionamentos inteligentes.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                                    <benefit.icon className="w-6 h-6 text-primary-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                                <p className="text-gray-600">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Demo Section */}
                <section className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl text-white text-center p-12">
                    <h2 className="text-3xl font-bold mb-6">
                        Quer ver em ação?
                    </h2>
                    <p className="text-xl text-primary-100 mb-8 leading-relaxed">
                        Agende uma demonstração e veja nossa tecnologia funcionando em tempo real.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button variant="secondary" size="lg" icon="play">
                            Veja em ação
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
