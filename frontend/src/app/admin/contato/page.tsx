"use client"

import { Inbox, RefreshCw, XCircle } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import api from "@/lib/api"

type ContactMessage = {
    id: string
    name: string
    email: string
    message: string
    createdAt: string
}

export default function AdminContatosPage() {
    const [messages, setMessages] = useState<ContactMessage[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)

    useEffect(() => {
        fetchMessages()
    }, [])

    const fetchMessages = async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await api.get<ContactMessage[]>("/contact-messages", { cache: "no-store" })
            setMessages(Array.isArray(data) ? data : [])
        } catch (err: any) {
            setError(err?.message || "Falha ao buscar mensagens.")
        } finally {
            setLoading(false)
        }
    }

    const stats = useMemo(() => {
        const total = messages.length
        const latest = messages
            .map(m => new Date(m.createdAt).getTime())
            .sort((a, b) => b - a)[0]
        return { total, latest }
    }, [messages])

    // Sem controle de lida/não lida nesta versão

    return (
        <>
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
                    <div className="mt-16 sm:mt-0">
                        <h1 className="text-4xl font-bold text-slate-900">Painel de Contatos</h1>
                        <p className="text-slate-500 mt-1">Gerencie as mensagens recebidas do site.</p>
                    </div>
                    <button
                        onClick={fetchMessages}
                        disabled={loading}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg font-semibold hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-wait"
                    >
                        <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
                        Atualizar
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 flex items-center gap-4">
                        <div className="p-3 bg-blue-100 rounded-full">
                            <Inbox className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Total de Mensagens</p>
                            <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 flex items-center gap-4">
                        <div className="p-3 bg-purple-100 rounded-full">
                            <span className="w-6 h-6 inline-flex items-center justify-center text-purple-700 font-bold">⏰</span>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Última mensagem</p>
                            <p className="text-3xl font-bold text-slate-900">
                                {stats.latest ? new Date(stats.latest).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }) : "—"}
                            </p>
                        </div>
                    </div>
                </div>

                {loading && <p className="text-center py-12">Carregando mensagens...</p>}
                {error && (
                    <div className="text-center text-red-600 bg-red-100 p-4 rounded-lg">
                        <p className="font-bold">Ocorreu um erro</p>
                        <p>{error}</p>
                    </div>
                )}

                {/* Mobile: Cards */}
                {!loading && !error && (
                    <div className="block sm:hidden space-y-4">
                        {messages.length === 0 && <p className="text-center py-12 text-slate-500">Nenhuma mensagem encontrada.</p>}
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className="rounded-2xl shadow-lg border border-slate-200 p-4 bg-white flex flex-col gap-2"
                                onClick={() => setSelectedMessage(msg)}
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">Contato</span>
                                    <span className="text-xs text-slate-400 ml-auto">{new Date(msg.createdAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}</span>
                                </div>
                                <div className="text-base text-slate-900">{msg.name}</div>
                                <div className="text-sm text-slate-500 break-all">{msg.email}</div>
                                <button
                                    className="text-teal-600 hover:text-teal-900 text-sm font-medium w-fit mt-2"
                                    onClick={e => { e.stopPropagation(); setSelectedMessage(msg); }}
                                >
                                    Ver Mensagem
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Desktop: Tabela */}
                {!loading && !error && (
                    <div className="hidden sm:block bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Tipo</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Data</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Nome</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {messages.map((msg) => (
                                        <tr
                                            key={msg.id}
                                            className="transition-colors bg-white hover:bg-slate-50 cursor-pointer"
                                            onClick={() => setSelectedMessage(msg)}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">Contato</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                                {new Date(msg.createdAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{msg.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{msg.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button className="text-teal-600 hover:text-teal-900">Ver Mensagem</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {!loading && messages.length === 0 && <p className="text-center py-12 text-slate-500">Nenhuma mensagem encontrada.</p>}
                    </div>
                )}
            </div>

            {/* Message Detail Modal */}
            {selectedMessage && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                        <div className="flex justify-between items-center p-6 border-b border-slate-200">
                            <h2 className="text-2xl font-bold text-slate-900">Detalhes da Mensagem</h2>
                            <button
                                onClick={() => setSelectedMessage(null)}
                                className="p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
                            >
                                <XCircle className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                <div className="bg-slate-50 p-4 rounded-lg">
                                    <p className="text-sm font-bold text-slate-600">Nome</p>
                                    <p className="text-slate-900">{selectedMessage.name}</p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-lg">
                                    <p className="text-sm font-bold text-slate-600">Email</p>
                                    <a href={`mailto:${selectedMessage.email}`} className="text-blue-600 hover:underline">
                                        {selectedMessage.email}
                                    </a>
                                </div>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-lg">
                                <p className="text-sm font-bold text-slate-600 mb-2">Mensagem</p>
                                <p className="text-slate-800 whitespace-pre-wrap">{selectedMessage.message}</p>
                                <p className="text-xs text-slate-500 mt-3">
                                    Recebida em {new Date(selectedMessage.createdAt).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}
                                </p>
                            </div>
                        </div>
                        <div className="p-6 border-t border-slate-200 bg-slate-50 rounded-b-2xl flex items-center justify-end">
                            <button
                                onClick={() => setSelectedMessage(null)}
                                className="px-4 py-2 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors"
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
