"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { useAuth } from "@/context/AuthContext"

export default function RegisterPage() {
    const router = useRouter()
    const { register } = useAuth()
    const [perfil, setPerfil] = useState<"cliente" | "admin">("cliente")
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [confirmarSenha, setConfirmarSenha] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setIsSubmitting(true)
        setError("")
        setSuccess("")

        // Validações
        if (senha !== confirmarSenha) {
            setError("As senhas não coincidem.")
            setIsSubmitting(false)
            return
        }

        if (senha.length < 8) {
            setError("A senha deve ter pelo menos 8 caracteres.")
            setIsSubmitting(false)
            return
        }

        try {
            const role = perfil === "admin" ? "admin" : "user"
            await register(nome, email, senha, role)
            
            setSuccess("Conta criada com sucesso! Redirecionando para o login...")
            
            // Redirecionar para login após 2 segundos
            setTimeout(() => {
                router.push("/login")
            }, 2000)
        } catch (err: any) {
            const errorMessage = err.message.includes("400") 
                ? "Dados inválidos. Verifique as informações fornecidas."
                : err.message.includes("409")
                ? "Este email já está em uso."
                : "Erro ao criar conta. Tente novamente."
            setError(errorMessage)
            console.error("Erro no registro:", err)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="bg-gray-50 min-h-screen text-gray-900">
            <Header />

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-md mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold">Criar conta</h1>
                        <p className="text-gray-600 mt-2">Preencha os dados abaixo para criar sua conta.</p>
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
                        </div>

                        {/* Formulário */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                                    {success}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="nome">
                                    Nome completo
                                </label>
                                <input
                                    id="nome"
                                    type="text"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="Seu nome completo"
                                />
                            </div>

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
                                    placeholder="Mínimo 8 caracteres"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="confirmarSenha">
                                    Confirmar senha
                                </label>
                                <input
                                    id="confirmarSenha"
                                    type="password"
                                    value={confirmarSenha}
                                    onChange={(e) => setConfirmarSenha(e.target.value)}
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="Digite a senha novamente"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full inline-flex items-center justify-center rounded-lg bg-primary-600 text-white font-semibold py-2.5 px-4 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-70"
                            >
                                {isSubmitting ? "Criando conta..." : `Criar conta como ${perfil === "admin" ? "administrador" : "cliente"}`}
                            </button>

                            <div className="text-center">
                                <p className="text-sm text-gray-600">
                                    Já tem uma conta?{" "}
                                    <a 
                                        href="/login" 
                                        className="text-primary-600 hover:text-primary-700 font-medium"
                                    >
                                        Fazer login
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
