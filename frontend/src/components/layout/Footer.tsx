import { Car } from "lucide-react"

export default function Footer() {
    const footerLinks = {
        produto: [
            { name: "Vagas", href: "/vagas" },
            { name: "Reservar", href: "/reservar" },
            { name: "Tecnologia", href: "/tecnologia" },
        ],
        empresa: [
            { name: "Sobre", href: "/sobre" },
            { name: "Blog", href: "/blog" },
        ],
        suporte: [
            { name: "Privacidade", href: "/privacidade" },
            { name: "Termos de Uso", href: "/termos-de-uso" },
            { name: "Contato", href: "/contato" }
        ]
    }

    return (
        <footer className="bg-gray-900 text-white py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                                <Car className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold">Smart Parking</span>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            Transformando estacionamentos com tecnologia IoT inteligente e soluções inovadoras.
                        </p>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-bold mb-4">Produto</h3>
                        <ul className="space-y-3 text-gray-400">
                            {footerLinks.produto.map((link, index) => (
                                <li key={index}>
                                    <a href={link.href} className="hover:text-white transition-colors">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-bold mb-4">Empresa</h3>
                        <ul className="space-y-3 text-gray-400">
                            {footerLinks.empresa.map((link, index) => (
                                <li key={index}>
                                    <a href={link.href} className="hover:text-white transition-colors">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-bold mb-4">Suporte</h3>
                        <ul className="space-y-3 text-gray-400">
                            {footerLinks.suporte.map((link, index) => (
                                <li key={index}>
                                    <a href={link.href} className="hover:text-white transition-colors">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                
                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                    <p>&copy; 2025 Smart Parking. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    )
}
