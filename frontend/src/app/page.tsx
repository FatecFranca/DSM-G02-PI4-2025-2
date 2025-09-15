"use client"

import Header from "@/components/layout/Header"
import HeroSection from "@/components/sections/HeroSection"
import StatsSection from "@/components/sections/StatsSection"
import AboutSection from "@/components/sections/AboutSection"
import FeaturesSection from "@/components/sections/FeaturesSection"
import TechnologySection from "@/components/sections/TechnologySection"
import CTASection from "@/components/sections/CTASection"
import Footer from "@/components/layout/Footer"

export default function SmartParkingPage() {
    return (
        <div className="bg-gray-50 min-h-screen text-gray-900">
            <Header />
            <HeroSection />
            <StatsSection />
            
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <AboutSection />
                <FeaturesSection />
                <TechnologySection />
                <CTASection />
            </main>

            <Footer />
        </div>
    )
}
