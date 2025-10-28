"use client"

import { Car, LogOut, User } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"

export default function ClientHeader() {
    const pathname = usePathname()
    const router = useRouter()
    const { user, logout } = useAuth()
    const linkClass = (href: string) => `px-3 py-2 rounded-lg text-sm font-medium ${pathname === href ? "bg-primary-100 text-primary-700" : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"}`

    const handleLogout = () => {
        logout()
        router.push("/login")
    }

    return (
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                        <Car className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">Smart Parking</span>
                </div>
                <div className="flex items-center gap-4">
                    <nav className="flex items-center gap-1">
                        <Link href="/cliente/dashboard" className={linkClass("/cliente/dashboard")}>Dashboard</Link>
                        <Link href="/reservas" className={linkClass("/reservas")}>Reservar</Link>
                        <Link href="/cliente/reservas" className={linkClass("/cliente/reservas")}>Minhas Reservas</Link>
                    </nav>
                    
                    {user && (
                        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <User className="w-4 h-4" />
                                <span className="font-medium text-gray-900">{user.name}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Sair"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="hidden sm:inline">Sair</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}


