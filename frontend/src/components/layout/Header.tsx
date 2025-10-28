"use client"

import { Car, Lock, LogOut, User } from "lucide-react"
import Button from "../ui/Button"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

export default function Header() {
    const { user, logout } = useAuth()
    const router = useRouter()

    const handleLogout = () => {
        logout()
        router.push("/")
    }

    return (
        <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                            <Car className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-gray-900">Smart Parking</span>
                    </div>
                    
                    <nav className="hidden md:flex space-x-8">
                        <a href="/sobre" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                            Sobre
                        </a>
                        <a href="/funcionalidades" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                            Funcionalidades
                        </a>
                        <a href="/vagas" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                            Vagas
                        </a>
                        <a href="/tecnologia" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                            Tecnologia
                        </a>
                        <a href="/contato" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                            Contato
                        </a>
                    </nav>
                    
                    {user ? (
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <User className="w-4 h-4" />
                                <span className="font-medium text-gray-900">{user.name}</span>
                            </div>
                            <Button 
                                variant="secondary" 
                                size="md"
                                onClick={handleLogout}
                            >
                                <div className="flex items-center gap-2">
                                    <LogOut className="w-4 h-4" />
                                    Sair
                                </div>
                            </Button>
                            <Button 
                                variant="primary" 
                                size="md"
                                onClick={() => router.push(user.role === "admin" ? "/admin" : "/reservas")}
                            >
                                {user.role === "admin" ? "Painel Admin" : "Minhas Reservas"}
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Button variant="primary" size="md">
                                Demonstração
                            </Button>
                            <Button 
                                variant="secondary" 
                                size="md"
                                onClick={() => router.push("/login")}
                            >
                                <div className="flex items-center gap-2">
                                    <Lock className="w-4 h-4" />
                                    Login na plataforma
                                </div>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
