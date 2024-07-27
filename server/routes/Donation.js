import express from 'express';
import donationController from '../controllers/Donation.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Donations
 *   description: Donation management endpoints
 */

/**
 * @swagger
 * /api/donations:
 *   post:
 *     tags: [Donations]
 *     summary: Add a new donation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               subHead:
 *                 type: string
 *               description:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Donation created successfully
 *       400:
 *         description: Error message
 */
router.post('/', donationController.addDonation);

/**
 * @swagger
 * /api/donations:
 *   get:
 *     tags: [Donations]
 *     summary: Get all donations
 *     responses:
 *       200:
 *         description: Donations fetched successfully
 *       400:
 *         description: Error message
 */
router.get('/', donationController.getAllDonations);

/**
 * @swagger
 * /api/donations/{id}:
 *   get:
 *     tags: [Donations]
 *     summary: Get a donation by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the donation to retrieve
 *     responses:
 *       200:
 *         description: Donation fetched successfully
 *       400:
 *         description: Error message
 */
router.get('/:id', donationController.getDonationById);

/**
 * @swagger
 * /api/donations/{id}:
 *   delete:
 *     tags: [Donations]
 *     summary: Delete a donation
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the donation to delete
 *     responses:
 *       200:
 *         description: Donation deleted successfully
 *       400:
 *         description: Error message
 */
router.delete('/:id', donationController.deleteDonation);

/**
 * @swagger
 * /api/donations/{id}/donate:
 *   post:
 *     tags: [Donations]
 *     summary: Add a user's donation to a specific donation entry
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the donation to add a user's donation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: User donation added successfully
 *       400:
 *         description: Error message
 */
router.post('/:id/donate', donationController.addUserDonation);


/**
 * @swagger
 * /api/donations/payment:
 *   post:
 *     tags: [Donations]
 *     summary: Create a donation payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Payment URL created successfully
 *       400:
 *         description: Error message
 */
router.post('/payment', donationController.createDonationPayment);


export default router;
