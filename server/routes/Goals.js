import express from 'express';
import goalsController from '../controllers/Goals.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Goals
 *   description: SDG Goals scraping endpoints
 */

/**
 * @swagger
 * /api/goals:
 *   get:
 *     tags: [Goals]
 *     summary: Get all SDGs
 *     responses:
 *       200:
 *         description: SDGs fetched successfully
 *       500:
 *         description: Error message
 */
router.get('/', goalsController.getGoals);

export default router;
