import { Router } from "express";
import ParkingSlotController from "../controllers/parking_slot.controller";
import { validateParkingSlotExists } from "../middlewares/parking_slot.middleware";

const router = Router();

/**
 * @swagger
 * /parking-slots:
 *   post:
 *     summary: Criar uma nova vaga de estacionamento
 *     tags: [Parking Slots]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - parkingId
 *               - number
 *             properties:
 *               parkingId:
 *                 type: string
 *                 format: uuid
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               number:
 *                 type: integer
 *                 example: 1
 *               isAvailable:
 *                 type: boolean
 *                 default: true
 *               isActive:
 *                 type: boolean
 *                 default: true
 *     responses:
 *       201:
 *         description: Vaga criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ParkingSlot'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", ParkingSlotController.create);

/**
 * @swagger
 * /parking-slots:
 *   get:
 *     summary: Listar todas as vagas de estacionamento
 *     tags: [Parking Slots]
 *     responses:
 *       200:
 *         description: Lista de vagas de estacionamento
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ParkingSlot'
 */
router.get("/", ParkingSlotController.getAll);

/**
 * @swagger
 * /parking-slots/available:
 *   get:
 *     summary: Listar vagas disponíveis
 *     tags: [Parking Slots]
 *     responses:
 *       200:
 *         description: Lista de vagas disponíveis
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ParkingSlot'
 */
router.get("/available", ParkingSlotController.getAvailable);

/**
 * @swagger
 * /parking-slots/parking/{parkingId}:
 *   get:
 *     summary: Buscar vagas por estacionamento
 *     tags: [Parking Slots]
 *     parameters:
 *       - in: path
 *         name: parkingId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do estacionamento
 *     responses:
 *       200:
 *         description: Lista de vagas do estacionamento
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ParkingSlot'
 */
router.get("/parking/:parkingId", ParkingSlotController.getByParkingId);

/**
 * @swagger
 * /parking-slots/{id}:
 *   get:
 *     summary: Buscar vaga por ID
 *     tags: [Parking Slots]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da vaga
 *     responses:
 *       200:
 *         description: Vaga encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ParkingSlot'
 *       404:
 *         description: Vaga não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", validateParkingSlotExists, ParkingSlotController.getById);

/**
 * @swagger
 * /parking-slots/{id}:
 *   put:
 *     summary: Atualizar vaga de estacionamento
 *     tags: [Parking Slots]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da vaga
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               parkingId:
 *                 type: string
 *                 format: uuid
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               number:
 *                 type: integer
 *                 example: 2
 *               isAvailable:
 *                 type: boolean
 *                 example: false
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Vaga atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ParkingSlot'
 *       404:
 *         description: Vaga não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", validateParkingSlotExists, ParkingSlotController.update);

/**
 * @swagger
 * /parking-slots/{id}:
 *   delete:
 *     summary: Deletar vaga de estacionamento
 *     tags: [Parking Slots]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da vaga
 *     responses:
 *       200:
 *         description: Vaga deletada com sucesso
 *       404:
 *         description: Vaga não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", validateParkingSlotExists, ParkingSlotController.delete);

export default router;
