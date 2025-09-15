"use client"

import {
    BarChart3,
    Calendar,
    Car,
    CreditCard,
    Home,
    LogOut,
    MapPin,
    Menu,
    Mail,
    Settings,
    X,
    Book,
    Wrench
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const pathname = usePathname()

    const navigation = [
        {
            name: "Dashboard",
            href: "/admin",
            icon: Home
        },
        {
            name: "Vagas",
            href: "/admin/vagas",
            icon: MapPin
        },
        {
            name: "Reservas",
            href: "/admin/reservas",
            icon: Calendar
        },
        {
            name: "Relatórios",
            href: "/admin/relatorios",
            icon: BarChart3
        },
        {
            name: "Sensores",
            href: "/admin/sensores  ",
            icon: Wrench
        },
        {
            name: "Pagamentos",
            href: "/admin/pagamentos",
            icon: CreditCard
        },
        {
            name: "Configurações",
            href: "/admin/configuracoes",
            icon: Settings
        },
        {
            name: "Contato",
            href: "/admin/contato",
            icon: Mail
        }
    ]

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                }`}>
                <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                            <Car className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-lg font-bold text-gray-900">Admin</span>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <nav className="mt-6 px-3">
                    <div className="space-y-1">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive
                                        ? 'bg-primary-100 text-primary-700'
                                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                        }`}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'
                                        }`} />
                                    {item.name}
                                </Link>
                            )
                        })}
                    </div>

                    {/* Logout section */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <button className="group flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors">
                            <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                            Sair
                        </button>
                    </div>
                </nav>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top bar */}
                <div className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-200">
                    <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
                        >
                            <Menu className="w-5 h-5" />
                        </button>

                        <div className="flex items-center space-x-4">
                            <div className="text-sm text-gray-600">
                                Olá, <span className="font-medium text-gray-900">Administrador</span>
                            </div>
                            <div className="w-8 h-8 bg-gray-200 rounded-full">
                                <img src="https://avatars.githubusercontent.com/u/67373880?v=4" alt="Logo" className="w-full h-full object-cover rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page content */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    )
} 