import { Router } from "express";
import ReservationController from "../controllers/reservation.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @swagger
 * /reservations:
 *   post:
 *     summary: Criar reserva para uma vaga
 *     tags: [Reservations]
 */
router.post("/", authenticate, ReservationController.create);

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
 * /reservations/me:
 *   get:
 *     summary: Listar reservas do usuário autenticado
 *     tags: [Reservations]
 */
router.get("/me", authenticate, ReservationController.listMine);

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


