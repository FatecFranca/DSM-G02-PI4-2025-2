"use client"

import { useState } from "react"
import { 
    CreditCard, 
    DollarSign, 
    Clock, 
    CheckCircle,
    XCircle,
    AlertCircle,
    Search,
    Filter,
    Download,
    Eye,
    RefreshCw
} from "lucide-react"
import Button from "@/components/ui/Button"

export default function PagamentosPage() {
    const [selectedFilter, setSelectedFilter] = useState("all")
    const [searchTerm, setSearchTerm] = useState("")

    const payments = [
        {
            id: "PAY-001",
            user: "João Silva",
            amount: "R$ 20,00",
            method: "PIX",
            status: "completed",
            date: "2024-01-15 14:30",
            reservationId: "RES-001",
            spot: "A-15"
        },
        {
            id: "PAY-002",
            user: "Maria Santos",
            amount: "R$ 15,00",
            method: "Cartão de Crédito",
            status: "completed",
            date: "2024-01-15 16:45",
            reservationId: "RES-002",
            spot: "B-22"
        },
        {
            id: "PAY-003",
            user: "Pedro Costa",
            amount: "R$ 30,00",
            method: "PIX",
            status: "pending",
            date: "2024-01-15 12:20",
            reservationId: "RES-003",
            spot: "C-08"
        },
        {
            id: "PAY-004",
            user: "Ana Oliveira",
            amount: "R$ 25,00",
            method: "Cartão de Débito",
            status: "failed",
            date: "2024-01-15 10:15",
            reservationId: "RES-004",
            spot: "A-03"
        },
        {
            id: "PAY-005",
            user: "Carlos Lima",
            amount: "R$ 18,00",
            method: "PIX",
            status: "completed",
            date: "2024-01-15 18:30",
            reservationId: "RES-005",
            spot: "B-15"
        },
        {
            id: "PAY-006",
            user: "Lucia Ferreira",
            amount: "R$ 22,00",
            method: "Cartão de Crédito",
            status: "completed",
            date: "2024-01-15 09:45",
            reservationId: "RES-006",
            spot: "C-12"
        },
        {
            id: "PAY-007",
            user: "Roberto Alves",
            amount: "R$ 35,00",
            method: "PIX",
            status: "pending",
            date: "2024-01-15 20:10",
            reservationId: "RES-007",
            spot: "A-08"
        },
        {
            id: "PAY-008",
            user: "Fernanda Costa",
            amount: "R$ 28,00",
            method: "Cartão de Débito",
            status: "completed",
            date: "2024-01-15 11:30",
            reservationId: "RES-008",
            spot: "B-05"
        }
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed": return "bg-green-100 text-green-800"
            case "pending": return "bg-yellow-100 text-yellow-800"
            case "failed": return "bg-red-100 text-red-800"
            default: return "bg-gray-100 text-gray-800"
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case "completed": return "Concluído"
            case "pending": return "Pendente"
            case "failed": return "Falhou"
            default: return "Desconhecido"
        }
    }

    const getMethodIcon = (method: string) => {
        switch (method) {
            case "PIX": return "💳"
            case "Cartão de Crédito": return "💳"
            case "Cartão de Débito": return "💳"
            default: return "💰"
        }
    }

    const filteredPayments = payments.filter(payment => {
        const matchesSearch = payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            payment.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            payment.reservationId.toLowerCase().includes(searchTerm.toLowerCase())
        
        const matchesFilter = selectedFilter === "all" || payment.status === selectedFilter
        
        return matchesSearch && matchesFilter
    })

    const stats = {
        total: payments.length,
        completed: payments.filter(p => p.status === "completed").length,
        pending: payments.filter(p => p.status === "pending").length,
        failed: payments.filter(p => p.status === "failed").length,
        totalAmount: payments.filter(p => p.status === "completed").reduce((sum, p) => sum + parseFloat(p.amount.replace("R$ ", "").replace(",", ".")), 0)
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Gestão de Pagamentos</h1>
                    <p className="text-gray-600">Gerencie todos os pagamentos dos estacionamentos</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="secondary" size="md" icon="refresh">
                        Atualizar
                    </Button>
                    <Button variant="secondary" size="md" icon="download">
                        Exportar
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                    <div className="text-sm text-gray-600">Total</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                    <div className="text-sm text-gray-600">Concluídos</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                    <div className="text-sm text-gray-600">Pendentes</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
                    <div className="text-sm text-gray-600">Falharam</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-green-600">R$ {stats.totalAmount.toFixed(2)}</div>
                    <div className="text-sm text-gray-600">Total Recebido</div>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Buscar por ID, usuário ou reserva..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <select
                            value={selectedFilter}
                            onChange={(e) => setSelectedFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                            <option value="all">Todos os Status</option>
                            <option value="completed">Concluído</option>
                            <option value="pending">Pendente</option>
                            <option value="failed">Falhou</option>
                        </select>
                        <Button variant="secondary" size="md" icon="filter">
                            Filtros
                        </Button>
                    </div>
                </div>
            </div>

            {/* Payments Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Pagamentos ({filteredPayments.length})</h2>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Usuário
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Valor
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Método
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Reserva
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Data
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredPayments.map((payment) => (
                                <tr key={payment.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {payment.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{payment.user}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{payment.amount}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <span className="mr-2">{getMethodIcon(payment.method)}</span>
                                            <span className="text-sm text-gray-900">{payment.method}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                                            {getStatusText(payment.status)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            <div>{payment.reservationId}</div>
                                            <div className="text-xs text-gray-500">Vaga {payment.spot}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(payment.date).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center space-x-2">
                                            <button className="text-blue-600 hover:text-blue-900">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            {payment.status === "pending" && (
                                                <button className="text-green-600 hover:text-green-900">
                                                    <CheckCircle className="w-4 h-4" />
                                                </button>
                                            )}
                                            {payment.status === "failed" && (
                                                <button className="text-orange-600 hover:text-orange-900">
                                                    <RefreshCw className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredPayments.length === 0 && (
                    <div className="text-center py-12">
                        <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum pagamento encontrado</h3>
                        <p className="text-gray-600">Tente ajustar os filtros ou aguarde novos pagamentos.</p>
                    </div>
                )}
            </div>

            {/* Alerts */}
            {stats.pending > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                        <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                            <h3 className="text-sm font-medium text-yellow-800">
                                Pagamentos Pendentes
                            </h3>
                            <p className="text-sm text-yellow-700 mt-1">
                                {stats.pending} pagamento(s) aguardando confirmação. Verifique o status dos pagamentos.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {stats.failed > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                        <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                        <div>
                            <h3 className="text-sm font-medium text-red-800">
                                Pagamentos Falharam
                            </h3>
                            <p className="text-sm text-red-700 mt-1">
                                {stats.failed} pagamento(s) falharam. Verifique e tente novamente.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
