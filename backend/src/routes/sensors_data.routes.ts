import { Router } from "express";
import SensorsDataController from "../controllers/sensors_data.controller";
import { validateSensorDataExists } from "../middlewares/sensors_data.middleware";

const router = Router();

/**
 * @swagger
 * /sensors-data:
 *   post:
 *     summary: Criar novos dados de sensor
 *     tags: [Sensors Data]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sensorId
 *               - data
 *             properties:
 *               sensorId:
 *                 type: string
 *                 format: uuid
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               data:
 *                 type: string
 *                 example: "PRESENT"
 *               isActive:
 *                 type: boolean
 *                 default: true
 *     responses:
 *       201:
 *         description: Dados de sensor criados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SensorsData'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", SensorsDataController.create);

/**
 * @swagger
 * /sensors-data:
 *   get:
 *     summary: Listar todos os dados de sensores
 *     tags: [Sensors Data]
 *     responses:
 *       200:
 *         description: Lista de dados de sensores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SensorsData'
 */
router.get("/", SensorsDataController.getAll);

/**
 * @swagger
 * /sensors-data/active:
 *   get:
 *     summary: Listar dados de sensores ativos
 *     tags: [Sensors Data]
 *     responses:
 *       200:
 *         description: Lista de dados de sensores ativos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SensorsData'
 */
router.get("/active", SensorsDataController.getActive);

/**
 * @swagger
 * /sensors-data/sensor/{sensorId}:
 *   get:
 *     summary: Buscar dados por sensor
 *     tags: [Sensors Data]
 *     parameters:
 *       - in: path
 *         name: sensorId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do sensor
 *     responses:
 *       200:
 *         description: Lista de dados do sensor
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SensorsData'
 */
router.get("/sensor/:sensorId", SensorsDataController.getBySensorId);

/**
 * @swagger
 * /sensors-data/parking-slot/{parkingSlotId}:
 *   get:
 *     summary: Buscar dados por vaga de estacionamento
 *     tags: [Sensors Data]
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
 *         description: Lista de dados da vaga
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SensorsData'
 */
router.get("/parking-slot/:parkingSlotId", SensorsDataController.getByParkingSlotId);

/**
 * @swagger
 * /sensors-data/{id}:
 *   get:
 *     summary: Buscar dados de sensor por ID
 *     tags: [Sensors Data]
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
 *         description: Dados do sensor encontrados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SensorsData'
 *       404:
 *         description: Dados não encontrados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", validateSensorDataExists, SensorsDataController.getById);

/**
 * @swagger
 * /sensors-data/{id}:
 *   put:
 *     summary: Atualizar dados de sensor
 *     tags: [Sensors Data]
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
 *               sensorId:
 *                 type: string
 *                 format: uuid
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               data:
 *                 type: string
 *                 example: "ABSENT"
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Dados de sensor atualizados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SensorsData'
 *       404:
 *         description: Dados não encontrados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", validateSensorDataExists, SensorsDataController.update);

/**
 * @swagger
 * /sensors-data/{id}:
 *   delete:
 *     summary: Deletar dados de sensor
 *     tags: [Sensors Data]
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
 *         description: Dados de sensor deletados com sucesso
 *       404:
 *         description: Dados não encontrados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", validateSensorDataExists, SensorsDataController.delete);

export default router;
