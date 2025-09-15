import { MercadoPagoConfig } from "mercadopago"

const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN

if (!accessToken) {
    console.warn("[MERCADO PAGO] Access token não encontrado. A API de pagamentos não funcionará.")
}

export const mercadopagoClient = new MercadoPagoConfig({
    accessToken: accessToken!,
})

console.log("[MERCADO PAGO] Cliente configurado com sucesso.") 