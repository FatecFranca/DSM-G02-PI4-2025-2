"use client"

import { Shield, Lock, Eye, Database, Users, Bell } from "lucide-react"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

export default function PrivacidadePage() {
    const privacyTopics = [
        {
            icon: Shield,
            title: "Coleta de Dados",
            description: "Coletamos apenas informações necessárias para o funcionamento dos nossos estacionamentos, como dados de veículos e informações de pagamento."
        },
        {
            icon: Lock,
            title: "Segurança",
            description: "Utilizamos criptografia de ponta a ponta e protocolos de segurança avançados para proteger seus dados."
        },
        {
            icon: Eye,
            title: "Transparência",
            description: "Você tem total controle sobre seus dados e pode solicitar acesso, correção ou exclusão a qualquer momento."
        },
        {
            icon: Database,
            title: "Armazenamento",
            description: "Os dados são armazenados em servidores seguros com backup automático e redundância geográfica."
        },
        {
            icon: Users,
            title: "Compartilhamento",
            description: "Não compartilhamos seus dados pessoais com terceiros sem seu consentimento explícito."
        },
        {
            icon: Bell,
            title: "Notificações",
            description: "Você será notificado sobre qualquer mudança em nossa política de privacidade."
        }
    ]

    return (
        <div className="bg-gray-50 min-h-screen text-gray-900">
            <Header />
            
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Shield className="w-10 h-10 text-primary-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Política de <span className="text-primary-500">Privacidade</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Sua privacidade é fundamental para nós. Saiba como protegemos e utilizamos suas informações em nossos estacionamentos.
                    </p>
                    <p className="text-sm text-gray-500 mt-4">
                        Última atualização: 15 de Janeiro de 2024
                    </p>
                </div>

                {/* Topics Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {privacyTopics.map((topic, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                                <topic.icon className="w-6 h-6 text-primary-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{topic.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{topic.description}</p>
                        </div>
                    ))}
                </div>

                {/* Detailed Content */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Informações Coletadas</h2>
                        
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Dados Pessoais</h3>
                                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                                    <li>Nome completo e informações de contato</li>
                                    <li>Dados do veículo (placa, modelo, cor)</li>
                                    <li>Informações de pagamento (processadas de forma segura)</li>
                                    <li>Histórico de uso do estacionamento</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Dados Técnicos</h3>
                                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                                    <li>Endereço IP e dados de localização</li>
                                    <li>Informações do dispositivo e navegador</li>
                                    <li>Logs de acesso e uso dos estacionamentos</li>
                                    <li>Dados de performance e analytics</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Como Utilizamos</h3>
                                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                                    <li>Fornecer e melhorar nossos estacionamentos</li>
                                    <li>Processar pagamentos e transações</li>
                                    <li>Enviar notificações importantes</li>
                                    <li>Prevenir fraudes e garantir segurança</li>
                                    <li>Analisar uso e otimizar nossos estacionamentos</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Seus Direitos</h3>
                                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                                    <li>Acessar seus dados pessoais</li>
                                    <li>Corrigir informações incorretas</li>
                                    <li>Solicitar exclusão de dados</li>
                                    <li>Revogar consentimento a qualquer momento</li>
                                    <li>Portabilidade de dados</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Segurança</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados contra acesso não autorizado, alteração, divulgação ou destruição. Utilizamos criptografia SSL/TLS, firewalls avançados e monitoramento contínuo.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Retenção de Dados</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Mantemos seus dados apenas pelo tempo necessário para cumprir as finalidades descritas nesta política, a menos que a lei exija ou permita um período de retenção mais longo. Dados pessoais são excluídos automaticamente após 5 anos de inatividade.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Contato</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Para dúvidas sobre esta política de privacidade ou exercer seus direitos, entre em contato conosco:
                                </p>
                                <div className="mt-4 space-y-2">
                                    <p className="text-gray-600"><strong>Email:</strong> privacidade@smartparking.com</p>
                                    <p className="text-gray-600"><strong>Telefone:</strong> (16) 9998-0213</p>
                                    <p className="text-gray-600"><strong>Endereço:</strong> Avenida Padre Antônio Vieira, 1150 - São Paulo, SP</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
