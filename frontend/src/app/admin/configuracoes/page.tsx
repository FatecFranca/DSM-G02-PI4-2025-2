"use client"

import { useState } from "react"
import { 
    Settings, 
    DollarSign, 
    Wifi, 
    Shield,
    Bell,
    Save,
    CreditCard,
    MapPin,
    Clock,
    AlertCircle
} from "lucide-react"
import Button from "@/components/ui/Button"

export default function ConfiguracoesPage() {
    const [activeTab, setActiveTab] = useState("general")
    const [settings, setSettings] = useState({
        // General
        companyName: "Smart Parking",
        contactEmail: "contato@smartparking.com",
        contactPhone: "(11) 99999-0000",
        
        // Pricing
        hourlyRate: "5.00",
        dailyRate: "50.00",
        weeklyRate: "250.00",
        monthlyRate: "800.00",
        toleranceMinutes: "15",
        
        // IoT Settings
        sensorTimeout: "30",
        autoMaintenance: true,
        alertThreshold: "80",
        
        // Payment
        pixEnabled: true,
        creditCardEnabled: true,
        debitCardEnabled: true,
        mercadopagoEnabled: true,
        
        // Notifications
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        lowOccupancyAlert: true,
        sensorOfflineAlert: true
    })

    const handleSettingChange = (key: string, value: any) => {
        setSettings(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const tabs = [
        { id: "general", name: "Geral", icon: Settings },
        { id: "pricing", name: "Preços", icon: DollarSign },
        { id: "iot", name: "IoT", icon: Wifi },
        { id: "payment", name: "Pagamentos", icon: CreditCard },
        { id: "notifications", name: "Notificações", icon: Bell }
    ]

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
                <p className="text-gray-600">Configure os estacionamentos e sistema</p>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                                activeTab === tab.id
                                    ? 'border-primary-500 text-primary-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            <span>{tab.name}</span>
                        </button>
                    ))}
                </nav>
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                {activeTab === "general" && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-gray-900">Configurações Gerais</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nome da Empresa
                                </label>
                                <input
                                    type="text"
                                    value={settings.companyName}
                                    onChange={(e) => handleSettingChange("companyName", e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email de Contato
                                </label>
                                <input
                                    type="email"
                                    value={settings.contactEmail}
                                    onChange={(e) => handleSettingChange("contactEmail", e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Telefone de Contato
                                </label>
                                <input
                                    type="tel"
                                    value={settings.contactPhone}
                                    onChange={(e) => handleSettingChange("contactPhone", e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "pricing" && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-gray-900">Configurações de Preços</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Preço por Hora (R$)
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={settings.hourlyRate}
                                    onChange={(e) => handleSettingChange("hourlyRate", e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Preço Diário (R$)
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={settings.dailyRate}
                                    onChange={(e) => handleSettingChange("dailyRate", e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Preço Semanal (R$)
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={settings.weeklyRate}
                                    onChange={(e) => handleSettingChange("weeklyRate", e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Preço Mensal (R$)
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={settings.monthlyRate}
                                    onChange={(e) => handleSettingChange("monthlyRate", e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tolerância (minutos)
                                </label>
                                <input
                                    type="number"
                                    value={settings.toleranceMinutes}
                                    onChange={(e) => handleSettingChange("toleranceMinutes", e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "iot" && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-gray-900">Configurações IoT</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Timeout do Sensor (segundos)
                                </label>
                                <input
                                    type="number"
                                    value={settings.sensorTimeout}
                                    onChange={(e) => handleSettingChange("sensorTimeout", e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Limite de Alerta (%)
                                </label>
                                <input
                                    type="number"
                                    value={settings.alertThreshold}
                                    onChange={(e) => handleSettingChange("alertThreshold", e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>
                            
                            <div className="md:col-span-2">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={settings.autoMaintenance}
                                        onChange={(e) => handleSettingChange("autoMaintenance", e.target.checked)}
                                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                    />
                                    <label className="ml-2 block text-sm text-gray-900">
                                        Manutenção Automática
                                    </label>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                    Ativa manutenção automática quando sensores ficam offline
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "payment" && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-gray-900">Configurações de Pagamento</h2>
                        
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={settings.pixEnabled}
                                    onChange={(e) => handleSettingChange("pixEnabled", e.target.checked)}
                                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-gray-900">
                                    PIX
                                </label>
                            </div>
                            
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={settings.creditCardEnabled}
                                    onChange={(e) => handleSettingChange("creditCardEnabled", e.target.checked)}
                                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-gray-900">
                                    Cartão de Crédito
                                </label>
                            </div>
                            
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={settings.debitCardEnabled}
                                    onChange={(e) => handleSettingChange("debitCardEnabled", e.target.checked)}
                                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-gray-900">
                                    Cartão de Débito
                                </label>
                            </div>
                            
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={settings.mercadopagoEnabled}
                                    onChange={(e) => handleSettingChange("mercadopagoEnabled", e.target.checked)}
                                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-gray-900">
                                    MercadoPago
                                </label>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "notifications" && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-gray-900">Configurações de Notificações</h2>
                        
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={settings.emailNotifications}
                                    onChange={(e) => handleSettingChange("emailNotifications", e.target.checked)}
                                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-gray-900">
                                    Notificações por Email
                                </label>
                            </div>
                            
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={settings.smsNotifications}
                                    onChange={(e) => handleSettingChange("smsNotifications", e.target.checked)}
                                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-gray-900">
                                    Notificações por SMS
                                </label>
                            </div>
                            
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={settings.pushNotifications}
                                    onChange={(e) => handleSettingChange("pushNotifications", e.target.checked)}
                                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-gray-900">
                                    Notificações Push
                                </label>
                            </div>
                            
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={settings.lowOccupancyAlert}
                                    onChange={(e) => handleSettingChange("lowOccupancyAlert", e.target.checked)}
                                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-gray-900">
                                    Alerta de Baixa Ocupação
                                </label>
                            </div>
                            
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={settings.sensorOfflineAlert}
                                    onChange={(e) => handleSettingChange("sensorOfflineAlert", e.target.checked)}
                                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-gray-900">
                                    Alerta de Sensor Offline
                                </label>
                            </div>
                        </div>
                    </div>
                )}

                {/* Save Button */}
                <div className="pt-6 border-t border-gray-200">
                    <div className="flex justify-end space-x-3">
                        <Button variant="secondary" size="md">
                            Cancelar
                        </Button>
                        <Button variant="primary" size="md" icon="save">
                            Salvar Configurações
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
