"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Button from "@/components/ui/Button"
import api from "@/lib/api"

interface FormData {
    name: string
    email: string
    message: string
}

interface FormErrors {
    name?: string
    email?: string
    message?: string
    general?: string
}

export default function ContatoPage() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        message: ""
    })
    const [errors, setErrors] = useState<FormErrors>({})
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {}

        // Validação do nome
        if (!formData.name.trim()) {
            newErrors.name = "Nome é obrigatório"
        } else if (formData.name.length > 100) {
            newErrors.name = "Nome deve ter no máximo 100 caracteres"
        }

        // Validação do email
        if (!formData.email.trim()) {
            newErrors.email = "Email é obrigatório"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Email inválido"
        } else if (formData.email.length > 255) {
            newErrors.email = "Email deve ter no máximo 255 caracteres"
        }

        // Validação da mensagem
        if (!formData.message.trim()) {
            newErrors.message = "Mensagem é obrigatória"
        } else if (formData.message.length > 1000) {
            newErrors.message = "Mensagem deve ter no máximo 1000 caracteres"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        // Limpar erro do campo quando o usuário começar a digitar
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsLoading(true)
        setErrors({})

        try {
            await api.post<unknown, FormData>("/contact-messages", formData)

            // Sucesso
            setIsSubmitted(true)
            setFormData({
                name: "",
                email: "",
                message: ""
            })
        } catch (error: unknown) {
            console.error("Erro ao enviar mensagem:", error)
            // Tenta extrair erros estruturados do backend a partir da mensagem
            let parsed: any = null
            if (error instanceof Error && error.message) {
                try {
                    parsed = JSON.parse(error.message)
                } catch {}
            }

            if (parsed?.details && Array.isArray(parsed.details)) {
                const apiErrors: FormErrors = {}
                parsed.details.forEach((detail: any) => {
                    if (detail?.path && detail.path[0]) {
                        apiErrors[detail.path[0] as keyof FormErrors] = detail.message
                    }
                })
                setErrors(apiErrors)
            } else if (parsed?.error) {
                setErrors({ general: parsed.error })
            } else {
                setErrors({ general: "Erro de conexão. Tente novamente." })
            }
        } finally {
            setIsLoading(false)
        }
    }

    const contactInfo = [
        {
            icon: Mail,
            title: "Email",
            value: "contato@smartparking.com",
            description: "Resposta em até 24 horas"
        },
        {
            icon: Phone,
            title: "Telefone",
            value: "(16) 9998-0213",
            description: "Segunda a Sexta, 8h às 18h"
        },
        {
            icon: MapPin,
            title: "Endereço",
            value: "Avenida Padre Antônio Vieira, 1150",
            description: "São Paulo, SP - 01234-567"
        },
        {
            icon: Clock,
            title: "Horário de Atendimento",
            value: "Segunda a Sexta",
            description: "8h às 18h (exceto feriados)"
        }
    ]

    return (
        <div className="bg-gray-50 min-h-screen text-gray-900">
            <Header />

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <MessageSquare className="w-10 h-10 text-primary-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Entre em <span className="text-primary-500">Contato</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Estamos aqui para ajudar! Entre em contato conosco para dúvidas, suporte ou parcerias.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">Informações de Contato</h2>

                        <div className="space-y-6 mb-8">
                            {contactInfo.map((info, index) => (
                                <div key={index} className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <info.icon className="w-6 h-6 text-primary-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{info.title}</h3>
                                        <p className="text-primary-600 font-medium">{info.value}</p>
                                        <p className="text-gray-600 text-sm">{info.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">Envie sua Mensagem</h2>

                        {isSubmitted ? (
                            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-green-800 mb-2">Mensagem Enviada!</h3>
                                <p className="text-green-700">
                                    Obrigado pelo contato. Retornaremos em breve!
                                </p>
                                <Button
                                    variant="primary"
                                    className="mt-4"
                                    onClick={() => setIsSubmitted(false)}
                                >
                                    Enviar Nova Mensagem
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                                {/* Erro Geral */}
                                {errors.general && (
                                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                        <p className="text-red-700 text-sm">{errors.general}</p>
                                    </div>
                                )}

                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Nome Completo *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                                }`}
                                            placeholder="Seu nome completo"
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                                }`}
                                            placeholder="seu@email.com"
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Mensagem *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        rows={6}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none ${errors.message ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                            }`}
                                        placeholder="Descreva sua dúvida, solicitação ou proposta..."
                                    />
                                    {errors.message && (
                                        <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                                    )}
                                    <p className="mt-1 text-xs text-gray-500">
                                        {formData.message.length}/1000 caracteres
                                    </p>
                                </div>

                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="lg"
                                    icon="send"
                                    className="w-full"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                            Enviando...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5 mr-2" />
                                            Enviar Mensagem
                                        </>
                                    )}
                                </Button>
                            </form>
                        )}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Perguntas Frequentes</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Respostas para as dúvidas mais comuns sobre o Smart Parking
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Como funciona o sistema?</h3>
                                <p className="text-gray-600">
                                    Fornecemos o estacionamento completo com sensores IoT. Os usuários escolhem suas vagas através do aplicativo, fazem reservas e pagamentos online.
                                </p>
                            </div>
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Como escolher uma vaga?</h3>
                                <p className="text-gray-600">
                                    Através do nosso aplicativo, você pode visualizar todas as vagas disponíveis em tempo real e escolher a que preferir, com opção de reserva antecipada.
                                </p>
                            </div>
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Suporte disponível?</h3>
                                <p className="text-gray-600">
                                    Oferecemos suporte técnico 24/7 para clientes
                                </p>
                            </div>
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Como funciona o pagamento?</h3>
                                <p className="text-gray-600">
                                    Aceitamos diversos métodos de pagamento através do aplicativo, incluindo cartões de crédito, PIX e transferências bancárias.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
