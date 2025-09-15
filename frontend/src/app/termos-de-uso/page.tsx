"use client"

import { FileText, CheckCircle, AlertTriangle, Scale, Clock, Users } from "lucide-react"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

export default function TermosDeUsoPage() {
    const termsTopics = [
        {
            icon: CheckCircle,
            title: "Aceitação dos Termos",
            description: "Ao usar nossos serviços, você concorda com estes termos e condições de uso."
        },
        {
            icon: Users,
            title: "Uso Responsável",
            description: "Comprometa-se a usar o sistema de forma ética e respeitando outros usuários."
        },
        {
            icon: Scale,
            title: "Direitos e Obrigações",
            description: "Conheça seus direitos como usuário e suas responsabilidades ao usar a plataforma."
        },
        {
            icon: AlertTriangle,
            title: "Limitações",
            description: "Entenda as limitações de responsabilidade e uso do sistema Smart Parking."
        },
        {
            icon: Clock,
            title: "Modificações",
            description: "Reservamo-nos o direito de modificar estes termos com notificação prévia."
        },
        {
            icon: FileText,
            title: "Jurisdição",
            description: "Estes termos são regidos pelas leis brasileiras e sujeitos à nossa jurisdição."
        }
    ]

    return (
        <div className="bg-gray-50 min-h-screen text-gray-900">
            <Header />
            
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <FileText className="w-10 h-10 text-primary-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Termos de <span className="text-primary-500">Uso</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Leia atentamente estes termos antes de utilizar nossos estacionamentos inteligentes.
                    </p>
                    <p className="text-sm text-gray-500 mt-4">
                        Última atualização: 15 de Janeiro de 2024
                    </p>
                </div>

                {/* Topics Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {termsTopics.map((topic, index) => (
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
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Termos e Condições de Uso</h2>
                        
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Aceitação dos Termos</h3>
                                <p className="text-gray-600 leading-relaxed mb-3">
                                    Ao acessar e usar o sistema Smart Parking, você aceita estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deve usar nossos serviços.
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    Estes termos constituem um acordo legal entre você e a Smart Parking. Recomendamos que você leia estes termos cuidadosamente antes de usar nossos serviços.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Descrição dos Serviços</h3>
                                <p className="text-gray-600 leading-relaxed mb-3">
                                    O Smart Parking oferece estacionamentos inteligentes que incluem:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                                    <li>Monitoramento em tempo real de vagas disponíveis</li>
                                    <li>Reserva de vagas através de aplicativo web/mobile</li>
                                    <li>Sistema de pagamento online integrado</li>
                                    <li>Controle de acesso automatizado</li>
                                    <li>Relatórios de uso do estacionamento</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Elegibilidade e Registro</h3>
                                <p className="text-gray-600 leading-relaxed mb-3">
                                    Para usar nossos serviços, você deve:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                                    <li>Ter pelo menos 18 anos de idade</li>
                                    <li>Fornecer informações verdadeiras e precisas</li>
                                    <li>Manter a confidencialidade de suas credenciais de acesso</li>
                                    <li>Ser responsável por todas as atividades em sua conta</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">4. Uso Aceitável</h3>
                                <p className="text-gray-600 leading-relaxed mb-3">
                                    Você concorda em usar nossos serviços apenas para fins legais e de acordo com estes termos. É proibido:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                                    <li>Usar o sistema para atividades ilegais</li>
                                    <li>Tentar acessar sistemas ou dados não autorizados</li>
                                    <li>Interferir no funcionamento do sistema</li>
                                    <li>Compartilhar credenciais de acesso</li>
                                    <li>Usar bots ou scripts automatizados sem autorização</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">5. Pagamentos e Taxas</h3>
                                <p className="text-gray-600 leading-relaxed mb-3">
                                    O uso de nossos serviços pode estar sujeito a taxas e pagamentos:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                                    <li>Taxas de estacionamento conforme tabela vigente</li>
                                    <li>Taxas de processamento de pagamento</li>
                                    <li>Taxas de reserva antecipada (quando aplicável)</li>
                                    <li>Multas por violação de regras de uso</li>
                                </ul>
                                <p className="text-gray-600 leading-relaxed mt-3">
                                    Todas as taxas são cobradas em Reais (R$) e podem ser alteradas com notificação prévia.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">6. Limitação de Responsabilidade</h3>
                                <p className="text-gray-600 leading-relaxed mb-3">
                                    A Smart Parking não será responsável por:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                                    <li>Danos indiretos, incidentais ou consequenciais</li>
                                    <li>Perda de dados ou interrupção de serviço</li>
                                    <li>Danos a veículos ou propriedades</li>
                                    <li>Problemas de conectividade ou dispositivos</li>
                                    <li>Ações de terceiros ou eventos fora de nosso controle</li>
                                </ul>
                                <p className="text-gray-600 leading-relaxed mt-3">
                                    Nossa responsabilidade total será limitada ao valor pago pelos serviços no período de 12 meses anteriores ao evento.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">7. Propriedade Intelectual</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Todo o conteúdo, software, design e funcionalidades dos nossos estacionamentos são protegidos por direitos autorais, marcas registradas e outras leis de propriedade intelectual. Você não pode copiar, modificar, distribuir ou criar trabalhos derivados sem autorização expressa.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">8. Privacidade e Dados</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    O uso de seus dados pessoais é regido por nossa Política de Privacidade, que faz parte integrante destes termos. Ao usar nossos serviços, você concorda com a coleta e uso de informações conforme descrito na política de privacidade.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">9. Modificações dos Termos</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Reservamo-nos o direito de modificar estes termos a qualquer momento. Alterações significativas serão comunicadas com pelo menos 30 dias de antecedência. O uso continuado dos serviços após as modificações constitui aceitação dos novos termos.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">10. Rescisão</h3>
                                <p className="text-gray-600 leading-relaxed mb-3">
                                    Podemos suspender ou encerrar sua conta a qualquer momento por:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                                    <li>Violação destes termos de uso</li>
                                    <li>Uso inadequado dos serviços</li>
                                    <li>Atividades fraudulentas ou ilegais</li>
                                    <li>Inatividade prolongada da conta</li>
                                </ul>
                                <p className="text-gray-600 leading-relaxed mt-3">
                                    Você pode cancelar sua conta a qualquer momento através das configurações da plataforma.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">11. Lei Aplicável</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Estes termos são regidos pelas leis da República Federativa do Brasil. Qualquer disputa será resolvida nos tribunais da comarca de São Paulo, SP, com renúncia expressa a qualquer outro foro.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">12. Contato</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Para dúvidas sobre estes termos de uso, entre em contato conosco:
                                </p>
                                <div className="mt-4 space-y-2">
                                    <p className="text-gray-600"><strong>Email:</strong> juridico@smartparking.com</p>
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
