import { Router } from "express";
import ContactMessageController from "../controllers/contact_message.controller";
import { validateContactMessageExists } from "../middlewares/contact_message.middleware";

const router = Router();

/**
 * @swagger
 * /contact-messages:
 *   post:
 *     summary: Criar uma nova mensagem de contato
 *     tags: [Contact Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 format: email
 *                 example: joao@email.com
 *               message:
 *                 type: string
 *                 example: Mensagem de contato
 *     responses:
 *       201:
 *         description: Mensagem criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContactMessage'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", ContactMessageController.create);

/**
 * @swagger
 * /contact-messages:
 *   get:
 *     summary: Listar todas as mensagens de contato
 *     tags: [Contact Messages]
 *     responses:
 *       200:
 *         description: Lista de mensagens de contato
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ContactMessage'
 */
router.get("/", ContactMessageController.getAll);

/**
 * @swagger
 * /contact-messages/{id}:
 *   get:
 *     summary: Buscar mensagem de contato por ID
 *     tags: [Contact Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da mensagem de contato
 *     responses:
 *       200:
 *         description: Mensagem de contato encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContactMessage'
 *       404:
 *         description: Mensagem não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", validateContactMessageExists, ContactMessageController.getById);

/**
 * @swagger
 * /contact-messages/{id}:
 *   put:
 *     summary: Atualizar mensagem de contato
 *     tags: [Contact Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da mensagem de contato
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 format: email
 *                 example: joao@email.com
 *               message:
 *                 type: string
 *                 example: Mensagem atualizada
 *     responses:
 *       200:
 *         description: Mensagem atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContactMessage'
 *       404:
 *         description: Mensagem não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", validateContactMessageExists, ContactMessageController.update);

/**
 * @swagger
 * /contact-messages/{id}:
 *   delete:
 *     summary: Deletar mensagem de contato
 *     tags: [Contact Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da mensagem de contato
 *     responses:
 *       200:
 *         description: Mensagem deletada com sucesso
 *       404:
 *         description: Mensagem não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", validateContactMessageExists, ContactMessageController.delete);

export default router;
