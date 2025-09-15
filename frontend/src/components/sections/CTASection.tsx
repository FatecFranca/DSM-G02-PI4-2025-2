import Button from "../ui/Button"

export default function CTASection() {
    return (
        <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl text-white text-center">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Pronto para o Futuro dos Estacionamentos?
                </h2>
                <p className="text-xl text-primary-100 mb-8 leading-relaxed">
                    Junte-se à revolução do estacionamento inteligente e ofereça a melhor experiência aos seus usuários
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="secondary" size="lg" icon="arrow">
                        Solicitar Demonstração
                    </Button>
                    <Button variant="outline" size="lg">
                        Falar com Especialista
                    </Button>
                </div>
            </div>
        </section>
    )
}
