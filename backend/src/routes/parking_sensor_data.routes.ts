import { Router } from "express";
import ParkingSensorDataController from "../controllers/parking_sensor_data.controller";
import { validateParkingSensorDataExists } from "../middlewares/parking_sensor_data.middleware";

const router = Router();

/**
 * @swagger
 * /parking-sensor-data:
 *   post:
 *     summary: Criar novos dados de sensor de estacionamento
 *     tags: [Parking Sensor Data]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - parkingSensorId
 *               - data
 *             properties:
 *               parkingSensorId:
 *                 type: string
 *                 format: uuid
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               data:
 *                 type: string
 *                 example: "25.5"
 *     responses:
 *       201:
 *         description: Dados de sensor de estacionamento criados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ParkingSensorData'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", ParkingSensorDataController.create);

/**
 * @swagger
 * /parking-sensor-data:
 *   get:
 *     summary: Listar todos os dados de sensores de estacionamento
 *     tags: [Parking Sensor Data]
 *     responses:
 *       200:
 *         description: Lista de dados de sensores de estacionamento
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ParkingSensorData'
 */
router.get("/", ParkingSensorDataController.getAll);

/**
 * @swagger
 * /parking-sensor-data/parking-sensor/{parkingSensorId}:
 *   get:
 *     summary: Buscar dados por sensor de estacionamento
 *     tags: [Parking Sensor Data]
 *     parameters:
 *       - in: path
 *         name: parkingSensorId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do sensor de estacionamento
 *     responses:
 *       200:
 *         description: Lista de dados do sensor de estacionamento
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ParkingSensorData'
 */
router.get("/parking-sensor/:parkingSensorId", ParkingSensorDataController.getByParkingSensorId);

/**
 * @swagger
 * /parking-sensor-data/parking/{parkingId}:
 *   get:
 *     summary: Buscar dados por estacionamento
 *     tags: [Parking Sensor Data]
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
 *         description: Lista de dados do estacionamento
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ParkingSensorData'
 */
router.get("/parking/:parkingId", ParkingSensorDataController.getByParkingId);

/**
 * @swagger
 * /parking-sensor-data/{id}:
 *   get:
 *     summary: Buscar dados de sensor de estacionamento por ID
 *     tags: [Parking Sensor Data]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID dos dados do sensor
 *     responses:
 *       200:
 *         description: Dados do sensor de estacionamento encontrados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ParkingSensorData'
 *       404:
 *         description: Dados não encontrados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", validateParkingSensorDataExists, ParkingSensorDataController.getById);

/**
 * @swagger
 * /parking-sensor-data/{id}:
 *   put:
 *     summary: Atualizar dados de sensor de estacionamento
 *     tags: [Parking Sensor Data]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID dos dados do sensor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               parkingSensorId:
 *                 type: string
 *                 format: uuid
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               data:
 *                 type: string
 *                 example: "26.0"
 *     responses:
 *       200:
 *         description: Dados de sensor de estacionamento atualizados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ParkingSensorData'
 *       404:
 *         description: Dados não encontrados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", validateParkingSensorDataExists, ParkingSensorDataController.update);

/**
 * @swagger
 * /parking-sensor-data/{id}:
 *   delete:
 *     summary: Deletar dados de sensor de estacionamento
 *     tags: [Parking Sensor Data]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID dos dados do sensor
 *     responses:
 *       200:
 *         description: Dados de sensor de estacionamento deletados com sucesso
 *       404:
 *         description: Dados não encontrados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", validateParkingSensorDataExists, ParkingSensorDataController.delete);

export default router;
