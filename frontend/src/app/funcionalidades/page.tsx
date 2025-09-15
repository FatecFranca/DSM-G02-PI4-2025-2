"use client"

import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Card from "@/components/ui/Card"
import Button from "@/components/ui/Button"
import {
  LayoutDashboard,
  Map,
  Users,
  FileText,
  Settings,
  MapPin,
  Car,
  Calendar,
  Clock,
  CreditCard,
  Filter,
  FileDown,
  Wrench,
  ClipboardList,
  BarChart3,
  MonitorSmartphone
} from "lucide-react"

export default function FuncionalidadesPage() {
  const adminFeatures = [
            {
          icon: LayoutDashboard,
          title: "Dashboard",
          description:
            "Visão geral dos nossos estacionamentos com vagas totais, ocupadas e livres, entradas/saídas e indicadores de receita.",
          bullets: [
            "KPIs: ocupação média, tempo médio de permanência, receita do dia/mês",
            "Mapa visual dos estacionamentos em tempo real (verde = livre, vermelho = ocupada)"
          ]
        },
            {
          icon: Map,
          title: "Gestão de Vagas",
          description:
            "Gerencie todas as vagas dos nossos estacionamentos com identificação, localização e status operacional.",
          bullets: [
            "Lista de vagas com ID e localização",
            "Status: ocupada, livre, reservada, manutenção",
            "Alteração manual de status",
            "Monitoramento via sensores IoT por vaga"
          ]
        },
            {
          icon: Users,
          title: "Gestão de Clientes",
          description:
            "Administre o cadastro de clientes, placas e histórico de uso dos nossos estacionamentos.",
          bullets: [
            "CRUD de clientes (nome, placa)",
            "Histórico de estacionamentos: datas, tempos e valores"
          ]
        },
            {
          icon: FileText,
          title: "Histórico e Relatórios",
          description:
            "Acompanhe entradas/saídas registradas pelos sensores IoT e gere relatórios.",
          bullets: [
            "Filtro por vaga, cliente e período",
            "Exportação em PDF/Excel"
          ]
        },
            {
          icon: Settings,
          title: "Configurações",
          description:
            "Defina tarifas, configure sensores IoT e gerencie usuários dos estacionamentos.",
          bullets: [
            "Tarifas: preço/hora, tolerância, promoções",
            "Configuração de sensores IoT (IR, servos)",
            "Usuários e papéis (admin, operador)"
          ]
        }
  ]

      const clientFeatures = [
      {
        icon: MapPin,
        title: "Localização e Disponibilidade",
        description: "Mapa com vagas disponíveis em tempo real nos nossos estacionamentos.",
        bullets: [
          "Visualização de vagas livres",
          "Distância até o estacionamento"
        ]
      },
          {
        icon: Calendar,
        title: "Reserva de Vaga",
        description: "Reserve com antecedência a vaga ideal nos nossos estacionamentos.",
        bullets: [
          "Escolher vaga e horário",
          "Confirmar e cancelar reservas"
        ]
      },
          {
        icon: Car,
        title: "Meu Estacionamento",
        description: "Acompanhe sua estadia e histórico nos nossos estacionamentos.",
        bullets: [
          "Histórico de entradas e saídas",
          "Tempo atual da estadia",
          "Valor a pagar em tempo real"
        ]
      },
          {
        icon: CreditCard,
        title: "Pagamentos",
        description: "Pague com segurança pelo app dos nossos estacionamentos.",
        bullets: [
          "Faturas e recibos",
          "Pix, cartão e outros meios"
        ]
      }
  ]

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <MonitorSmartphone className="w-10 h-10 text-primary-600" />
          </div>
                              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Funcionalidades dos <span className="text-primary-500">Estacionamentos</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Conheça todas as funcionalidades dos nossos estacionamentos inteligentes. Tecnologia IoT para uma experiência moderna e conveniente.
                    </p>
        </div>

        {/* Admin Panel */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Gestão do Estacionamento</h2>
              <p className="text-gray-600">Painel web para administrar nossos estacionamentos</p>
            </div>
            <Button variant="primary" size="md">Acessar Demo</Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminFeatures.map((feat, idx) => (
              <Card key={idx} variant="feature" delay={idx * 120}>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                    <feat.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{feat.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{feat.description}</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-1">
                  {feat.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        {/* Client Panel */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Experiência do Cliente</h2>
              <p className="text-gray-600">App mobile e web para nossos clientes</p>
            </div>
            <Button variant="secondary" size="md">Baixar App</Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {clientFeatures.map((feat, idx) => (
              <Card key={idx} variant="feature" delay={idx * 120}>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                    <feat.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{feat.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{feat.description}</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-1">
                  {feat.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        {/* Extras */}
        <section className="bg-white rounded-3xl border border-gray-100 shadow-lg p-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-3">
                <Filter className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Filtros Avançados</h3>
              <p className="text-gray-600">Busque por cliente, vaga, período e status com rapidez.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-3">
                <FileDown className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Exportações</h3>
              <p className="text-gray-600">Gere relatórios em PDF e Excel para auditoria e gestão.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-3">
                <BarChart3 className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Indicadores</h3>
              <p className="text-gray-600">Acompanhe métricas de desempenho e receita ao longo do tempo.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
