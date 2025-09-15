"use client"

import { useRef, useState } from "react"
import ClientHeader from "@/components/layout/ClientHeader"
import Footer from "@/components/layout/Footer"
import { Bell, Image as ImageIcon, ShieldCheck, User } from "lucide-react"

export default function ClientPerfilPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [acceptCode, setAcceptCode] = useState(false)
    const [notifyEmail, setNotifyEmail] = useState(true)
    const [notifyPush, setNotifyPush] = useState(false)
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
    const fileRef = useRef<HTMLInputElement | null>(null)

    const onPickFile = () => fileRef.current?.click()
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = () => setAvatarUrl(String(reader.result))
        reader.readAsDataURL(file)
    }

    return (
        <div className="bg-gray-50 min-h-screen text-gray-900">
            <ClientHeader />

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Meu Perfil</h1>
                    <p className="text-gray-600">Gerencie suas informações pessoais e preferências.</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Dados básicos + foto */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <User className="w-5 h-5 text-primary-600" />
                            <h2 className="text-lg font-bold">Dados básicos</h2>
                        </div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center border border-gray-200">
                                {avatarUrl ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <ImageIcon className="w-8 h-8 text-gray-400" />
                                )}
                            </div>
                            <div>
                                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
                                <button type="button" onClick={onPickFile} className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-sm">Alterar foto</button>
                            </div>
                        </div>
                    </div>

                    {/* Preferências */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <Bell className="w-5 h-5 text-primary-600" />
                            <h2 className="text-lg font-bold">Preferências de notificação</h2>
                        </div>
                        <div className="space-y-4">
                            <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                <div>
                                    <div className="font-medium text-gray-800">E-mail</div>
                                    <div className="text-sm text-gray-500">Receber confirmações e lembretes por e-mail</div>
                                </div>
                                <input type="checkbox" checked={notifyEmail} onChange={(e) => setNotifyEmail(e.target.checked)} />
                            </label>
                            <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                <div>
                                    <div className="font-medium text-gray-800">Notificações push</div>
                                    <div className="text-sm text-gray-500">Alertas rápidos no navegador</div>
                                </div>
                                <input type="checkbox" checked={notifyPush} onChange={(e) => setNotifyPush(e.target.checked)} />
                            </label>
                        </div>
                    </div>

                    {/* Código de conduta */}
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <ShieldCheck className="w-5 h-5 text-primary-600" />
                            <h2 className="text-lg font-bold">Código de Conduta</h2>
                        </div>
                        <div className="space-y-2 text-sm text-gray-700">
                            <p>
                                Para manter um ambiente seguro e respeitoso, você concorda em:
                            </p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>Respeitar as normas do estacionamento e a sinalização local.</li>
                                <li>Não bloquear acessos, saídas e vagas de PCD.</li>
                                <li>Manter seus dados atualizados e verdadeiros.</li>
                                <li>Evitar condutas abusivas ou fraudulentas na plataforma.</li>
                            </ul>
                            <p className="text-gray-500">
                                Violações podem resultar em suspensão de acesso conforme os Termos de Uso.
                            </p>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <label className="flex items-center gap-2 text-sm text-gray-700">
                                <input type="checkbox" checked={acceptCode} onChange={(e) => setAcceptCode(e.target.checked)} />
                                <span>Li e aceito o Código de Conduta</span>
                            </label>
                            <button className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-sm" disabled={!acceptCode}>Salvar aceite</button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}


