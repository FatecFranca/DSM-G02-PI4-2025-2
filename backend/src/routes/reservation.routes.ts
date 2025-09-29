import { Router } from "express";
import ReservationController from "../controllers/reservation.controller";

const router = Router();

/**
 * @swagger
 * /reservations:
 *   post:
 *     summary: Criar reserva para uma vaga
 *     tags: [Reservations]
 */
router.post("/", ReservationController.create);

/**
 * @swagger
 * /reservations:
 *   get:
 *     summary: Listar reservas
 *     tags: [Reservations]
 */
router.get("/", ReservationController.list);

/**
 * @swagger
 * /reservations/{id}:
 *   get:
 *     summary: Obter reserva por ID
 *     tags: [Reservations]
 */
router.get("/:id", ReservationController.getById);

/**
 * @swagger
 * /reservations/{id}:
 *   delete:
 *     summary: Cancelar reserva
 *     tags: [Reservations]
 */
router.delete("/:id", ReservationController.cancel);

export default router;


