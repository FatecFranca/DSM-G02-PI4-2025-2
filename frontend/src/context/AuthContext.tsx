"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { api } from "@/lib/api"

interface User {
  id: string
  name: string
  email: string
  role: "user" | "admin"
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string, role: "user" | "admin") => Promise<void>
  register: (name: string, email: string, password: string, role: "user" | "admin") => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar se há token salvo no localStorage
    const savedToken = localStorage.getItem("auth_token")
    const savedUser = localStorage.getItem("auth_user")
    
    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
    }
    
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, role: "user" | "admin") => {
    try {
      const response = await api.post<{
        token: string
        role: "user" | "admin"
        id: string
        name: string
        email: string
      }>("/auth/login", {
        role,
        email,
        password
      })

      const { token: newToken, ...userData } = response
      
      setToken(newToken)
      setUser(userData)
      
      // Salvar no localStorage
      localStorage.setItem("auth_token", newToken)
      localStorage.setItem("auth_user", JSON.stringify(userData))
    } catch (error) {
      console.error("Erro no login:", error)
      throw error
    }
  }

  const register = async (name: string, email: string, password: string, role: "user" | "admin") => {
    try {
      await api.post("/auth/register", {
        role,
        name,
        email,
        password
      })
    } catch (error) {
      console.error("Erro no registro:", error)
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("auth_token")
    localStorage.removeItem("auth_user")
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  }
  return context
}

