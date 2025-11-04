"use client"

import api from "@/lib/api"
import { AlertCircle, Building2, Edit, Plus, RefreshCcw, Search, Trash2, X } from "lucide-react"
import { useEffect, useMemo, useState } from "react"

type Parking = {
    id: string
    name: string
    address: string
    country: string
    state: string
    city: string
    number: string
    phone: string
    description?: string
    isActive: boolean
    createdAt: string
    updatedAt: string
}

type ParkingFormData = {
    name: string
    address: string
    country: string
    state: string
    city: string
    number: string
    phone: string
    description: string
    isActive: boolean
}

export default function AdminEstacionamentosPage() {
    const [parkings, setParkings] = useState<Parking[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [activeFilter, setActiveFilter] = useState<"todos" | "ativo" | "inativo">("todos")

    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const [editingParking, setEditingParking] = useState<Parking | null>(null)
    const [saving, setSaving] = useState(false)
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

    const [formData, setFormData] = useState<ParkingFormData>({
        name: "",
        address: "",
        country: "Brasil",
        state: "",
        city: "",
        number: "",
        phone: "",
        description: "",
        isActive: true,
    })

    const [formErrors, setFormErrors] = useState<Partial<Record<keyof ParkingFormData, string>>>({})

    useEffect(() => {
        refresh()
    }, [])

    const refresh = async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await api.get<Parking[]>("/parkings", { cache: "no-store" })
            setParkings(Array.isArray(data) ? data : [])
        } catch (e: any) {
            setError(e?.message || "Falha ao carregar estacionamentos")
        } finally {
            setLoading(false)
        }
    }

    const filtered = useMemo(() => {
        return parkings.filter((parking) => {
            const searchOk = searchTerm === "" || 
                parking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                parking.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                parking.city.toLowerCase().includes(searchTerm.toLowerCase())
            
            const activeOk = activeFilter === "todos" ? true :
                activeFilter === "ativo" ? parking.isActive : !parking.isActive
            
            return searchOk && activeOk
        })
    }, [parkings, searchTerm, activeFilter])

    const validateForm = (): boolean => {
        const errors: Partial<Record<keyof ParkingFormData, string>> = {}

        if (!formData.name.trim()) {
            errors.name = "Nome é obrigatório"
        }

        if (!formData.address.trim()) {
            errors.address = "Endereço é obrigatório"
        }

        if (!formData.country.trim()) {
            errors.country = "País é obrigatório"
        }

        if (!formData.state.trim()) {
            errors.state = "Estado é obrigatório"
        }

        if (!formData.city.trim()) {
            errors.city = "Cidade é obrigatória"
        }

        if (!formData.number.trim()) {
            errors.number = "Número é obrigatório"
        }

        if (!formData.phone.trim()) {
            errors.phone = "Telefone é obrigatório"
        }

        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }

    const resetForm = () => {
        setFormData({
            name: "",
            address: "",
            country: "Brasil",
            state: "",
            city: "",
            number: "",
            phone: "",
            description: "",
            isActive: true,
        })
        setFormErrors({})
        setEditingParking(null)
    }

    const handleCreate = async () => {
        if (!validateForm()) return

        setSaving(true)
        try {
            await api.post<Parking>("/parkings", formData)
            setIsCreateOpen(false)
            resetForm()
            await refresh()
        } catch (e: any) {
            setFormErrors({ name: e?.message || "Erro ao criar estacionamento" })
        } finally {
            setSaving(false)
        }
    }

    const handleEdit = (parking: Parking) => {
        setEditingParking(parking)
        setFormData({
            name: parking.name,
            address: parking.address,
            country: parking.country,
            state: parking.state,
            city: parking.city,
            number: parking.number,
            phone: parking.phone,
            description: parking.description || "",
            isActive: parking.isActive,
        })
        setFormErrors({})
        setIsCreateOpen(true)
    }

    const handleUpdate = async () => {
        if (!editingParking || !validateForm()) return

        setSaving(true)
        try {
            await api.put<Parking>(`/parkings/${editingParking.id}`, formData)
            setIsCreateOpen(false)
            resetForm()
            await refresh()
        } catch (e: any) {
            setFormErrors({ name: e?.message || "Erro ao atualizar estacionamento" })
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id: string) => {
        setSaving(true)
        try {
            await api.delete(`/parkings/${id}`)
            setDeleteConfirm(null)
            await refresh()
        } catch (e: any) {
            setError(e?.message || "Erro ao deletar estacionamento")
        } finally {
            setSaving(false)
        }
    }

    const openCreateModal = () => {
        resetForm()
        setIsCreateOpen(true)
    }

    const closeModal = () => {
        setIsCreateOpen(false)
        resetForm()
    }

    const stats = useMemo(() => {
        return {
            total: parkings.length,
            ativos: parkings.filter(p => p.isActive).length,
            inativos: parkings.filter(p => !p.isActive).length,
        }
    }, [parkings])

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Gestão de Estacionamentos</h1>
                <p className="text-gray-600">Gerencie todos os estacionamentos do sistema</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                        </div>
                        <Building2 className="w-8 h-8 text-gray-400" />
                    </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Ativos</p>
                            <p className="text-2xl font-bold text-green-600">{stats.ativos}</p>
                        </div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Inativos</p>
                            <p className="text-2xl font-bold text-gray-600">{stats.inativos}</p>
                        </div>
                        <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                    </div>
                </div>
            </div>

            {/* Toolbar */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                    <div className="flex gap-4 flex-wrap">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar por nome, endereço ou cidade..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>

                        {/* Filter */}
                        <select
                            value={activeFilter}
                            onChange={(e) => setActiveFilter(e.target.value as "todos" | "ativo" | "inativo")}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                            <option value="todos">Todos</option>
                            <option value="ativo">Apenas Ativos</option>
                            <option value="inativo">Apenas Inativos</option>
                        </select>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={refresh}
                            disabled={loading}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 disabled:opacity-50"
                        >
                            <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                            Atualizar
                        </button>
                        <button
                            onClick={openCreateModal}
                            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Novo Estacionamento
                        </button>
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <p className="text-red-700">{error}</p>
                </div>
            )}

            {/* Table */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                {loading && (
                    <div className="text-center py-8 text-gray-500">Carregando estacionamentos...</div>
                )}

                {!loading && filtered.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        {parkings.length === 0 
                            ? "Nenhum estacionamento cadastrado."
                            : "Nenhum estacionamento encontrado com os filtros aplicados."
                        }
                    </div>
                )}

                {!loading && filtered.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Nome
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Endereço
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Cidade/Estado
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Telefone
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Ações
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filtered.map((parking) => (
                                    <tr key={parking.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{parking.name}</div>
                                            {parking.description && (
                                                <div className="text-xs text-gray-500 mt-1">{parking.description}</div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900">
                                                {parking.address}, {parking.number}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{parking.city}</div>
                                            <div className="text-xs text-gray-500">{parking.state}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {parking.phone}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span
                                                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    parking.isActive
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-gray-100 text-gray-800"
                                                }`}
                                            >
                                                {parking.isActive ? "Ativo" : "Inativo"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => handleEdit(parking)}
                                                    className="text-primary-600 hover:text-primary-900 p-2 hover:bg-primary-50 rounded"
                                                    title="Editar"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => setDeleteConfirm(parking.id)}
                                                    className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded"
                                                    title="Deletar"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Create/Edit Modal */}
            {isCreateOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-900">
                                {editingParking ? "Editar Estacionamento" : "Novo Estacionamento"}
                            </h3>
                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nome *
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => {
                                        setFormData({ ...formData, name: e.target.value })
                                        if (formErrors.name) setFormErrors({ ...formErrors, name: undefined })
                                    }}
                                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                                        formErrors.name ? "border-red-300 bg-red-50" : "border-gray-300"
                                    }`}
                                    placeholder="Ex: Estacionamento Centro"
                                />
                                {formErrors.name && (
                                    <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                                )}
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Endereço *
                                </label>
                                <input
                                    type="text"
                                    value={formData.address}
                                    onChange={(e) => {
                                        setFormData({ ...formData, address: e.target.value })
                                        if (formErrors.address) setFormErrors({ ...formErrors, address: undefined })
                                    }}
                                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                                        formErrors.address ? "border-red-300 bg-red-50" : "border-gray-300"
                                    }`}
                                    placeholder="Ex: Rua das Flores"
                                />
                                {formErrors.address && (
                                    <p className="mt-1 text-sm text-red-600">{formErrors.address}</p>
                                )}
                            </div>

                            {/* Address Details */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Número *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.number}
                                        onChange={(e) => {
                                            setFormData({ ...formData, number: e.target.value })
                                            if (formErrors.number) setFormErrors({ ...formErrors, number: undefined })
                                        }}
                                        className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                                            formErrors.number ? "border-red-300 bg-red-50" : "border-gray-300"
                                        }`}
                                        placeholder="Ex: 123"
                                    />
                                    {formErrors.number && (
                                        <p className="mt-1 text-sm text-red-600">{formErrors.number}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Telefone *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.phone}
                                        onChange={(e) => {
                                            setFormData({ ...formData, phone: e.target.value })
                                            if (formErrors.phone) setFormErrors({ ...formErrors, phone: undefined })
                                        }}
                                        className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                                            formErrors.phone ? "border-red-300 bg-red-50" : "border-gray-300"
                                        }`}
                                        placeholder="Ex: (11) 99999-9999"
                                    />
                                    {formErrors.phone && (
                                        <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                                    )}
                                </div>
                            </div>

                            {/* Location */}
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        País *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.country}
                                        onChange={(e) => {
                                            setFormData({ ...formData, country: e.target.value })
                                            if (formErrors.country) setFormErrors({ ...formErrors, country: undefined })
                                        }}
                                        className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                                            formErrors.country ? "border-red-300 bg-red-50" : "border-gray-300"
                                        }`}
                                        placeholder="Ex: Brasil"
                                    />
                                    {formErrors.country && (
                                        <p className="mt-1 text-sm text-red-600">{formErrors.country}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Estado *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.state}
                                        onChange={(e) => {
                                            setFormData({ ...formData, state: e.target.value })
                                            if (formErrors.state) setFormErrors({ ...formErrors, state: undefined })
                                        }}
                                        className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                                            formErrors.state ? "border-red-300 bg-red-50" : "border-gray-300"
                                        }`}
                                        placeholder="Ex: SP"
                                    />
                                    {formErrors.state && (
                                        <p className="mt-1 text-sm text-red-600">{formErrors.state}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Cidade *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.city}
                                        onChange={(e) => {
                                            setFormData({ ...formData, city: e.target.value })
                                            if (formErrors.city) setFormErrors({ ...formErrors, city: undefined })
                                        }}
                                        className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                                            formErrors.city ? "border-red-300 bg-red-50" : "border-gray-300"
                                        }`}
                                        placeholder="Ex: São Paulo"
                                    />
                                    {formErrors.city && (
                                        <p className="mt-1 text-sm text-red-600">{formErrors.city}</p>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Descrição
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    placeholder="Descrição opcional do estacionamento"
                                />
                            </div>

                            {/* Active Status */}
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    checked={formData.isActive}
                                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                                />
                                <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                                    Estacionamento ativo
                                </label>
                            </div>
                        </div>
                        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={editingParking ? handleUpdate : handleCreate}
                                disabled={saving}
                                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 flex items-center gap-2"
                            >
                                {saving ? (
                                    <>
                                        <RefreshCcw className="w-4 h-4 animate-spin" />
                                        Salvando...
                                    </>
                                ) : editingParking ? (
                                    "Salvar Alterações"
                                ) : (
                                    "Criar Estacionamento"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                    <AlertCircle className="w-5 h-5 text-red-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Confirmar Exclusão</h3>
                            </div>
                            <p className="text-gray-600 mb-6">
                                Tem certeza que deseja excluir o estacionamento{" "}
                                <strong>{parkings.find(p => p.id === deleteConfirm)?.name}</strong>?
                                Esta ação não pode ser desfeita.
                            </p>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setDeleteConfirm(null)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={() => handleDelete(deleteConfirm)}
                                    disabled={saving}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                                >
                                    {saving ? "Excluindo..." : "Excluir"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

