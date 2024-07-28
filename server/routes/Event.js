import express from 'express';
import eventController from '../controllers/Event.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Event related endpoints
 */

/**
 * @swagger
 * /api/events/{userId}:
 *   post:
 *     tags: [Events]
 *     summary: Add a new event
 *     description: Only admins can create events.
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               location:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *               beforePicture:
 *                 type: string
 *               afterPicture:
 *                 type: string
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: Error message
 */
router.post('/:userId', eventController.addEvent);

/**
 * @swagger
 * /api/events/{id}:
 *   put:
 *     tags: [Events]
 *     summary: Update an existing event
 *     description: Only the organizer can update the event.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Event ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               location:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *               beforePicture:
 *                 type: string
 *               afterPicture:
 *                 type: string
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       400:
 *         description: Error message
 */
router.put('/:id/:userId', eventController.updateEvent);

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     tags: [Events]
 *     summary: Delete an event
 *     description: Only the organizer can delete the event.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       400:
 *         description: Error message
 */
router.delete('/:id', eventController.deleteEvent);

/**
 * @swagger
 * /api/events:
 *   get:
 *     tags: [Events]
 *     summary: Get all events
 *     description: Retrieve all events.
 *     responses:
 *       200:
 *         description: Events fetched successfully
 *       400:
 *         description: Error message
 */
router.get('/', eventController.getAllEvents);

/**
 * @swagger
 * /api/events/{id}/register/{userId}:
 *   post:
 *     tags: [Events]
 *     summary: Register for an event
 *     description: Register a user for an event.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Event ID
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User registered for the event successfully
 *       400:
 *         description: Error message
 */
router.post('/:id/register/:userId', eventController.registerForEvent);

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     tags: [Events]
 *     summary: Get event by ID
 *     description: Retrieve a single event by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event fetched successfully
 *       400:
 *         description: Error message
 */
router.get('/:id', eventController.getEventById);

export default router;
