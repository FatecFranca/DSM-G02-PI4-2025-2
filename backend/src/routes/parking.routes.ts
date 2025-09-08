import { Router } from "express";
import ParkingController from "../controllers/parking.controller";
import { validateParkingExists } from "../middlewares/parking.middleware";

const router = Router();

/**
 * @swagger
 * /parkings:
 *   post:
 *     summary: Criar um novo estacionamento
 *     tags: [Parkings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *               - country
 *               - state
 *               - city
 *               - number
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *                 example: Estacionamento Centro
 *               address:
 *                 type: string
 *                 example: Rua das Flores
 *               country:
 *                 type: string
 *                 example: Brasil
 *               state:
 *                 type: string
 *                 example: SP
 *               city:
 *                 type: string
 *                 example: São Paulo
 *               number:
 *                 type: string
 *                 example: "123"
 *               phone:
 *                 type: string
 *                 example: "(11) 99999-9999"
 *               description:
 *                 type: string
 *                 example: Estacionamento no centro da cidade
 *               isActive:
 *                 type: boolean
 *                 default: true
 *     responses:
 *       201:
 *         description: Estacionamento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Parking'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", ParkingController.create);

/**
 * @swagger
 * /parkings:
 *   get:
 *     summary: Listar todos os estacionamentos
 *     tags: [Parkings]
 *     responses:
 *       200:
 *         description: Lista de estacionamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Parking'
 */
router.get("/", ParkingController.getAll);

/**
 * @swagger
 * /parkings/active:
 *   get:
 *     summary: Listar estacionamentos ativos
 *     tags: [Parkings]
 *     responses:
 *       200:
 *         description: Lista de estacionamentos ativos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Parking'
 */
router.get("/active", ParkingController.getActive);

/**
 * @swagger
 * /parkings/{id}:
 *   get:
 *     summary: Buscar estacionamento por ID
 *     tags: [Parkings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do estacionamento
 *     responses:
 *       200:
 *         description: Estacionamento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Parking'
 *       404:
 *         description: Estacionamento não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", validateParkingExists, ParkingController.getById);

/**
 * @swagger
 * /parkings/{id}:
 *   put:
 *     summary: Atualizar estacionamento
 *     tags: [Parkings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do estacionamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Estacionamento Centro Atualizado
 *               address:
 *                 type: string
 *                 example: Rua das Flores, 456
 *               country:
 *                 type: string
 *                 example: Brasil
 *               state:
 *                 type: string
 *                 example: SP
 *               city:
 *                 type: string
 *                 example: São Paulo
 *               number:
 *                 type: string
 *                 example: "456"
 *               phone:
 *                 type: string
 *                 example: "(11) 88888-8888"
 *               description:
 *                 type: string
 *                 example: Estacionamento atualizado
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Estacionamento atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Parking'
 *       404:
 *         description: Estacionamento não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", validateParkingExists, ParkingController.update);

/**
 * @swagger
 * /parkings/{id}:
 *   delete:
 *     summary: Deletar estacionamento
 *     tags: [Parkings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do estacionamento
 *     responses:
 *       200:
 *         description: Estacionamento deletado com sucesso
 *       404:
 *         description: Estacionamento não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", validateParkingExists, ParkingController.delete);

export default router;
