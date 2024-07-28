import express from 'express';
import chatController from '../controllers/AI.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: AI
 *   description: AI related endpoints
 */

/**
 * @swagger
 * /api/ai/chat:
 *   post:
 *     tags: [AI]
 *     summary: Interact with the AI bot
 *     description: Send a message to the AI bot and get a response related to Sustainable Development Goals or events.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: The message to send to the AI bot
 *     responses:
 *       200:
 *         description: AI response returned successfully
 *       500:
 *         description: Error message
 */
router.post('/chat', chatController);

export default router;
