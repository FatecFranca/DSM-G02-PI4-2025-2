"use client"

import Link from "next/link"
import { AlertTriangle } from "lucide-react"

export default function NotFound() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-blue-50 px-6 py-12">
            <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center border border-slate-100">
                <div className="flex justify-center mb-6">
                    <span className="inline-flex items-center justify-center rounded-full bg-red-100 p-6 shadow-md">
                        <AlertTriangle className="w-20 h-20 text-red-500" />
                    </span>
                </div>
                <h1 className="text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">404</h1>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Página não encontrada</h2>
                <p className="text-slate-600 mb-8 text-lg">A página que você procura não existe, foi removida ou está temporariamente indisponível.</p>
                <Link
                    href="/"
                    className="inline-block bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg transition-all"
                >
                    Voltar para o início
                </Link>
            </div>
        </main>
    )
}
