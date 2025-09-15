"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

export default function LoginPage() {
    const router = useRouter()
    const [perfil, setPerfil] = useState<"cliente" | "admin">("cliente")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setIsSubmitting(true)

        // Mock de autenticação: apenas redireciona baseado na aba/perfil
        const destino = perfil === "admin" ? "/admin" : "/reservas"

        // Simula pequeno delay para UX
        setTimeout(() => {
            router.push(destino)
        }, 500)
    }

    return (
        <div className="bg-gray-50 min-h-screen text-gray-900">
            <Header />

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-md mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold">Acessar conta</h1>
                        <p className="text-gray-600 mt-2">Escolha o tipo de acesso e informe suas credenciais.</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
                        {/* Tabs */}
                        <div className="flex gap-2 p-1 bg-gray-100 rounded-xl mb-6">
                            <button
                                type="button"
                                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                    perfil === "cliente" ? "bg-white shadow text-gray-900" : "text-gray-600 hover:text-gray-800"
                                }`}
                                onClick={() => setPerfil("cliente")}
                            >
                                Cliente
                            </button>
                            <button
                                type="button"
                                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                    perfil === "admin" ? "bg-white shadow text-gray-900" : "text-gray-600 hover:text-gray-800"
                                }`}
                                onClick={() => setPerfil("admin")}
                            >
                                Administrador
                            </button>
                        </div>

                        {/* Formulário */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="seu@email.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="senha">
                                    Senha
                                </label>
                                <input
                                    id="senha"
                                    type="password"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="••••••••"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full inline-flex items-center justify-center rounded-lg bg-primary-600 text-white font-semibold py-2.5 px-4 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-70"
                            >
                                {isSubmitting ? "Entrando..." : `Logar como ${perfil === "admin" ? "administrador" : "cliente"}`}
                            </button>

                            <p className="text-xs text-gray-500 text-center">
                                Este é um login de demonstração. Você será redirecionado para {perfil === "admin" ? "/admin" : "/reservas"}.
                            </p>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}


