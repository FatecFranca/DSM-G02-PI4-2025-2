import { Router } from "express";
import StatisticsController from "../controllers/statistics.controller";
import { cacheSeconds } from "../middlewares/cache.middleware";

const router = Router();

/**
 * @swagger
 * /statistics:
 *   get:
 *     summary: Obter estatísticas gerais do sistema
 *     tags: [Statistics]
 *     responses:
 *       200:
 *         description: Estatísticas agregadas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 parkings:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     active:
 *                       type: integer
 *                 parkingSlots:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     available:
 *                       type: integer
 *                     occupied:
 *                       type: integer
 *                 sensors:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     active:
 *                       type: integer
 *                 parkingSensors:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     active:
 *                       type: integer
 *                 dataPoints:
 *                   type: object
 *                   properties:
 *                     sensorsData:
 *                       type: integer
 *                     parkingSensorsData:
 *                       type: integer
 */
router.get("/", cacheSeconds(15), StatisticsController.getOverview);

export default router;
