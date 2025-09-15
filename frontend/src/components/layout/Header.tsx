import { Car, Lock } from "lucide-react"
import Button from "../ui/Button"

export default function Header() {
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
                    
                    <Button variant="primary" size="md">
                        Demonstração
                    </Button>
                    {/* login */}
                    <Button variant="secondary" size="md">
                        <div className="flex items-center gap-2" onClick={() => window.location.href = "/login"}>
                            <Lock className="w-4 h-4" />
                            Login na plataforma
                        </div>
                    </Button>
                </div>
            </div>
        </header>
    )
}
