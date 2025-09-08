import { Router } from "express";
import SensorsController from "../controllers/sensors.controller";
import { validateSensorExists } from "../middlewares/sensors.middleware";

const router = Router();

/**
 * @swagger
 * /sensors:
 *   post:
 *     summary: Criar um novo sensor
 *     tags: [Sensors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - parkingSlotId
 *               - name
 *               - type
 *             properties:
 *               parkingSlotId:
 *                 type: string
 *                 format: uuid
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               name:
 *                 type: string
 *                 example: Sensor IR 001
 *               description:
 *                 type: string
 *                 example: Sensor infravermelho para detecção de presença
 *               type:
 *                 type: string
 *                 enum: [IR, ULTRASONIC, RFID, CAMERA]
 *                 example: IR
 *               isActive:
 *                 type: boolean
 *                 default: true
 *     responses:
 *       201:
 *         description: Sensor criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sensors'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", SensorsController.create);

/**
 * @swagger
 * /sensors:
 *   get:
 *     summary: Listar todos os sensores
 *     tags: [Sensors]
 *     responses:
 *       200:
 *         description: Lista de sensores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sensors'
 */
router.get("/", SensorsController.getAll);

/**
 * @swagger
 * /sensors/active:
 *   get:
 *     summary: Listar sensores ativos
 *     tags: [Sensors]
 *     responses:
 *       200:
 *         description: Lista de sensores ativos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sensors'
 */
router.get("/active", SensorsController.getActive);

/**
 * @swagger
 * /sensors/type/{type}:
 *   get:
 *     summary: Buscar sensores por tipo
 *     tags: [Sensors]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [IR, ULTRASONIC, RFID, CAMERA]
 *         description: Tipo do sensor
 *     responses:
 *       200:
 *         description: Lista de sensores do tipo especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sensors'
 */
router.get("/type/:type", SensorsController.getByType);

/**
 * @swagger
 * /sensors/parking-slot/{parkingSlotId}:
 *   get:
 *     summary: Buscar sensores por vaga de estacionamento
 *     tags: [Sensors]
 *     parameters:
 *       - in: path
 *         name: parkingSlotId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da vaga de estacionamento
 *     responses:
 *       200:
 *         description: Lista de sensores da vaga especificada
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sensors'
 */
router.get("/parking-slot/:parkingSlotId", SensorsController.getByParkingSlotId);

/**
 * @swagger
 * /sensors/{id}:
 *   get:
 *     summary: Buscar sensor por ID
 *     tags: [Sensors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do sensor
 *     responses:
 *       200:
 *         description: Sensor encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sensors'
 *       404:
 *         description: Sensor não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", validateSensorExists, SensorsController.getById);

/**
 * @swagger
 * /sensors/{id}:
 *   put:
 *     summary: Atualizar sensor
 *     tags: [Sensors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do sensor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               parkingSlotId:
 *                 type: string
 *                 format: uuid
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               name:
 *                 type: string
 *                 example: Sensor IR 001 Atualizado
 *               description:
 *                 type: string
 *                 example: Sensor infravermelho atualizado
 *               type:
 *                 type: string
 *                 enum: [IR, ULTRASONIC, RFID, CAMERA]
 *                 example: IR
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Sensor atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sensors'
 *       404:
 *         description: Sensor não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", validateSensorExists, SensorsController.update);

/**
 * @swagger
 * /sensors/{id}:
 *   delete:
 *     summary: Deletar sensor
 *     tags: [Sensors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do sensor
 *     responses:
 *       200:
 *         description: Sensor deletado com sucesso
 *       404:
 *         description: Sensor não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", validateSensorExists, SensorsController.delete);

export default router;
