import { Request, Response } from "express";
import StatisticsService from "../services/statistics.service";
import { handleError } from "../utils/errorHandler";

class StatisticsController {
	async getOverview(req: Request, res: Response) {
		try {
			const overview = await StatisticsService.getOverview();
			return res.json(overview);
		} catch (err) {
			return handleError(res, err as Error, "Erro ao carregar estatísticas do sistema.", 400);
		}
	}
}

export default new StatisticsController();
