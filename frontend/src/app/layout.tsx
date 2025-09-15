import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"

const poppins = Poppins({ 
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
})

export const metadata: Metadata = {
    title: "Smart Parking | Sistema Inteligente de Estacionamento",
    description: "Sistema de IoT para estacionamento inteligente que integra Arduino, sensores IR e aplicativo web/mobile. Monitoramento em tempo real, reservas e pagamentos online.",
    keywords: ["Smart Parking", "IoT", "Arduino", "Estacionamento Inteligente", "Sensores IR", "App Mobile"],
    authors: [{ name: "Smart Parking Team" }],
    icons: {
        icon: "/assets/icons/favicon.ico",
        shortcut: "/assets/icons/favicon.ico",
        apple: ["/assets/icons/icon-192x192.png", "/assets/icons/icon-512x512.png"],
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="pt-BR">
            <body className={poppins.className}>{children}</body>
        </html>
    )
}
