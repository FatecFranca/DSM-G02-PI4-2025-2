"use client"

import { useRouter } from "next/navigation"
import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type AdminAuthContextType = {
    isAuthenticated: boolean
    login: (password: string) => boolean
    logout: () => void
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

export function AdminAuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const router = useRouter()
    const login = (password: string): boolean => {
        // Esta verificação acontece no lado do cliente.
        if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
            setIsAuthenticated(true)
            if (typeof window !== "undefined") {
                sessionStorage.setItem("isAdminAuthenticated", "true")
            }
            return true
        }
        return false
    }

    const logout = () => {
        setIsAuthenticated(false)
        if (typeof window !== "undefined") {
            sessionStorage.removeItem("isAdminAuthenticated")
            router.push("/")
        }
    }

    // Mantém o estado ao recarregar a página
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedAuth = sessionStorage.getItem("isAdminAuthenticated")
            if (storedAuth === "true") {
                setIsAuthenticated(true)
            }
        }
    }, [])

    return <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AdminAuthContext.Provider>
}

export function useAdminAuth() {
    const context = useContext(AdminAuthContext)
    if (context === undefined) {
        throw new Error("useAdminAuth deve ser usado dentro de um AdminAuthProvider")
    }
    return context
}
