import type { Config } from "tailwindcss"

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#f2f2f2",
                dark: "#212121",
                cinza: "#2F3335",
                simplify: {
                    "100": "#3BD5B6",
                    "200": "#237E6D",
                },
                // Smart Parking Color Palette
                primary: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#007BFF', // Main blue
                    600: '#0056b3',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                },
                gray: {
                    50: '#f9fafb',
                    100: '#f3f4f6',
                    200: '#e5e7eb',
                    300: '#d1d5db',
                    400: '#9ca3af',
                    500: '#6b7280',
                    600: '#4b5563',
                    700: '#374151',
                    800: '#1f2937',
                    900: '#111827',
                },
            },
            animation: {
                "text-gradient": "text-gradient 1.5s linear infinite",
                flip: "flip 6s infinite steps(2, end)",
                rotate: "rotate 3s linear infinite both",
                shine: "shine 6s linear infinite",
                spinner: "spinner 1.2s linear infinite",
                blob: "blob 7s infinite",
                // Smart Parking animations
                "fade-in": "fadeIn 0.6s ease-out",
                "slide-up": "slideUp 0.8s ease-out",
                "scale-in": "scaleIn 0.5s ease-out",
                "bounce-subtle": "bounceSubtle 2s ease-in-out infinite",
                "pulse-soft": "pulseSoft 2s ease-in-out infinite",
            },
            keyframes: {
                "text-gradient": {
                    to: {
                        backgroundPosition: "200% center",
                    },
                },
                flip: {
                    to: {
                        transform: "rotate(360deg)",
                    },
                },
                rotate: {
                    to: {
                        transform: "rotate(90deg)",
                    },
                },
                spinner: {
                    "0%": {
                        opacity: "1",
                    },
                    "100%": {
                        opacity: "0.15",
                    },
                },
                shine: {
                    from: {
                        backgroundPosition: "0 0",
                    },
                    to: {
                        backgroundPosition: "-400% 0",
                    },
                },
                blob: {
                    "0%": {
                        transform: "translate(0px, 0px) scale(1)",
                    },
                    "33%": {
                        transform: "translate(30px, -50px) scale(1.1)",
                    },
                    "66%": {
                        transform: "translate(-20px, 20px) scale(0.9)",
                    },
                    "100%": {
                        transform: "translate(0px, 0px) scale(1)",
                    },
                },
                // Smart Parking keyframes
                fadeIn: {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                slideUp: {
                    "0%": { opacity: "0", transform: "translateY(40px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                scaleIn: {
                    "0%": { opacity: "0", transform: "scale(0.95)" },
                    "100%": { opacity: "1", transform: "scale(1)" },
                },
                bounceSubtle: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-5px)" },
                },
                pulseSoft: {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0.8" },
                },
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
}
export default config
