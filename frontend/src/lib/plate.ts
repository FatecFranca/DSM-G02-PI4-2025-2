import { z } from "zod"

// Schema Zod para validação de placa brasileira
// Aceita formato antigo (ABC1234) e Mercosul (ABC1D23)
export const plateSchema = z
  .string()
  .min(7, "A placa deve ter 7 caracteres")
  .max(7, "A placa deve ter 7 caracteres")
  .regex(
    /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/,
    "Formato inválido. Use o formato ABC1234 ou ABC1D23"
  )
  .transform((val) => val.toUpperCase().replace(/[^A-Z0-9]/g, ""))

// Função para aplicar máscara de placa enquanto o usuário digita
export function maskPlate(value: string): string {
  // Remove tudo que não é letra ou número e converte para maiúsculo
  const cleaned = value.replace(/[^A-Za-z0-9]/g, "").toUpperCase()
  
  // Limita a 7 caracteres
  const limited = cleaned.slice(0, 7)
  
  if (limited.length === 0) return ""
  
  // Primeiros 3 caracteres: apenas letras
  const letters = limited.slice(0, 3).replace(/[^A-Z]/g, "")
  if (limited.length <= 3) return letters
  
  // 4º caractere: apenas número
  const fourth = limited.slice(3, 4).replace(/[^0-9]/g, "")
  if (limited.length === 4) return letters + fourth
  
  // 5º caractere: letra ou número (Mercosul)
  const fifth = limited.slice(4, 5)
  if (limited.length === 5) return letters + fourth + fifth
  
  // 6º e 7º caracteres: apenas números
  const lastTwo = limited.slice(5, 7).replace(/[^0-9]/g, "")
  return letters + fourth + fifth + lastTwo
}

// Função para validar placa usando Zod
export function validatePlate(plate: string): { isValid: boolean; error?: string } {
  try {
    plateSchema.parse(plate)
    return { isValid: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        error: error.errors[0]?.message || "Placa inválida"
      }
    }
    return { isValid: false, error: "Placa inválida" }
  }
}

