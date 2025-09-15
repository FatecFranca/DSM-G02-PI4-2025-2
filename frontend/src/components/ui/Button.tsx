import { ReactNode } from "react"
import { ArrowRight, PlayCircle, Send } from "lucide-react"

interface ButtonProps {
    children: ReactNode
    variant?: "primary" | "secondary" | "outline"
    size?: "sm" | "md" | "lg"
    icon?: "arrow" | "play" | "send" | "none"
    className?: string
    onClick?: () => void
    type?: "button" | "submit"
    disabled?: boolean,
}

export default function Button({ 
    children, 
    variant = "primary", 
    size = "md", 
    icon = "none",
    className = "",
    onClick,
    type = "button",
    disabled = false
}: ButtonProps) {
    const baseClasses = "font-semibold transition-all duration-300 flex items-center justify-center group"
    
    const variants = {
        primary: "bg-primary-500 text-white hover:bg-primary-600",
        secondary: "bg-white text-primary-600 hover:bg-gray-100 border-2 border-primary-300 rounded-full",
        outline: "border-2 border-white text-white hover:bg-white hover:text-primary-600"
    }
    
    const sizes = {
        sm: "px-4 py-2 text-sm rounded-lg",
        md: "px-6 py-3 rounded-full text-base",
        lg: "px-8 py-4 rounded-full text-lg"
    }
    
    const icons = {
        arrow: <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />,
        play: <PlayCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />,
        send: <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />,
        none: null
    }

    const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : ""

    return (
        <button
            type={type}
            className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {icon === "play" && icons.play}
            {children}
            {icon === "arrow" && icons.arrow}
        </button>
    )
}
