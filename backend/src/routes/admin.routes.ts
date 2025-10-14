import { Router } from "express";
import AdminController from "../controllers/admin.controller";

const router = Router();

router.post("/", AdminController.create);
router.get("/", AdminController.list);
router.get("/:id", AdminController.getById);
router.put("/:id", AdminController.update);
router.delete("/:id", AdminController.delete);

export default router;



