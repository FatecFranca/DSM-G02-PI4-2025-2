import { Router } from "express";
import ParkingSensorController from "../controllers/parking_sensor.controller";
import { validateParkingSensorExists } from "../middlewares/parking_sensor.middleware";

const router = Router();

/**
 * @swagger
 * /parking-sensors:
 *   post:
 *     summary: Criar um novo sensor de estacionamento
 *     tags: [Parking Sensors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - parkingId
 *               - name
 *               - type
 *             properties:
 *               parkingId:
 *                 type: string
 *                 format: uuid
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               name:
 *                 type: string
 *                 example: Sensor de Temperatura 001
 *               description:
 *                 type: string
 *                 example: Sensor de temperatura do estacionamento
 *               type:
 *                 type: string
 *                 enum: [TEMPERATURE, HUMIDITY, LIGHT, PRESSURE, SOUND, VIBRATION, MOTION, GAS]
 *                 example: TEMPERATURE
 *               isActive:
 *                 type: boolean
 *                 default: true
 *     responses:
 *       201:
 *         description: Sensor de estacionamento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ParkingSensor'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", ParkingSensorController.create);

/**
 * @swagger
 * /parking-sensors:
 *   get:
 *     summary: Listar todos os sensores de estacionamento
 *     tags: [Parking Sensors]
 *     responses:
 *       200:
 *         description: Lista de sensores de estacionamento
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ParkingSensor'
 */
router.get("/", ParkingSensorController.getAll);

/**
 * @swagger
 * /parking-sensors/active:
 *   get:
 *     summary: Listar sensores de estacionamento ativos
 *     tags: [Parking Sensors]
 *     responses:
 *       200:
 *         description: Lista de sensores de estacionamento ativos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ParkingSensor'
 */
router.get("/active", ParkingSensorController.getActive);

/**
 * @swagger
 * /parking-sensors/type/{type}:
 *   get:
 *     summary: Buscar sensores de estacionamento por tipo
 *     tags: [Parking Sensors]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [TEMPERATURE, HUMIDITY, LIGHT, PRESSURE, SOUND, VIBRATION, MOTION, GAS]
 *         description: Tipo do sensor
 *     responses:
 *       200:
 *         description: Lista de sensores do tipo especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ParkingSensor'
 */
router.get("/type/:type", ParkingSensorController.getByType);

/**
 * @swagger
 * /parking-sensors/parking/{parkingId}:
 *   get:
 *     summary: Buscar sensores de estacionamento por estacionamento
 *     tags: [Parking Sensors]
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
 *         description: Lista de sensores do estacionamento
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ParkingSensor'
 */
router.get("/parking/:parkingId", ParkingSensorController.getByParkingId);

/**
 * @swagger
 * /parking-sensors/{id}:
 *   get:
 *     summary: Buscar sensor de estacionamento por ID
 *     tags: [Parking Sensors]
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
 *         description: Sensor de estacionamento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ParkingSensor'
 *       404:
 *         description: Sensor não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", validateParkingSensorExists, ParkingSensorController.getById);

/**
 * @swagger
 * /parking-sensors/{id}:
 *   put:
 *     summary: Atualizar sensor de estacionamento
 *     tags: [Parking Sensors]
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
 *               parkingId:
 *                 type: string
 *                 format: uuid
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               name:
 *                 type: string
 *                 example: Sensor de Temperatura 001 Atualizado
 *               description:
 *                 type: string
 *                 example: Sensor de temperatura atualizado
 *               type:
 *                 type: string
 *                 enum: [TEMPERATURE, HUMIDITY, LIGHT, PRESSURE, SOUND, VIBRATION, MOTION, GAS]
 *                 example: TEMPERATURE
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Sensor de estacionamento atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ParkingSensor'
 *       404:
 *         description: Sensor não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", validateParkingSensorExists, ParkingSensorController.update);

/**
 * @swagger
 * /parking-sensors/{id}:
 *   delete:
 *     summary: Deletar sensor de estacionamento
 *     tags: [Parking Sensors]
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
 *         description: Sensor de estacionamento deletado com sucesso
 *       404:
 *         description: Sensor não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", validateParkingSensorExists, ParkingSensorController.delete);

export default router;
