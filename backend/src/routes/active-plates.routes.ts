import { Router } from "express";
import ActivePlatesController from "../controllers/active-plates.controller";

const router = Router();

/**
 * @swagger
 * /active-plates:
 *   get:
 *     summary: Listar placas com reservas ativas no momento atual
 *     tags: [Active Plates]
 *     responses:
 *       200:
 *         description: Lista de placas com reservas ativas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   plate:
 *                     type: string
 *                     description: Placa do veículo
 *                   parkingSlotId:
 *                     type: string
 *                     description: ID da vaga de estacionamento
 *                   startTime:
 *                     type: string
 *                     format: date-time
 *                     description: Horário de início da reserva
 *                   endTime:
 *                     type: string
 *                     format: date-time
 *                     description: Horário de fim da reserva
 */
router.get("/", ActivePlatesController.getActivePlates);

export default router;
