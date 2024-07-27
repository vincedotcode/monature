import express from 'express';
import communityGroupController from '../controllers/CommunityGroup.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Community Groups
 *   description: Community group management endpoints
 */

/**
 * @swagger
 * /api/community-groups/{adminId}:
 *   post:
 *     tags: [Community Groups]
 *     summary: Add a new community group
 *     parameters:
 *       - in: path
 *         name: adminId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the admin creating the community group
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
 *               category:
 *                 type: string
 *                 description: The ID of the category
 *     responses:
 *       201:
 *         description: Community group created successfully
 *       400:
 *         description: Error message
 */
router.post('/:adminId', communityGroupController.addCommunityGroup);

/**
 * @swagger
 * /api/community-groups:
 *   get:
 *     tags: [Community Groups]
 *     summary: Get all community groups
 *     responses:
 *       200:
 *         description: Community groups fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CommunityGroup'
 *       400:
 *         description: Error message
 */
router.get('/', communityGroupController.getAllCommunityGroups);

/**
 * @swagger
 * /api/community-groups/{id}:
 *   delete:
 *     tags: [Community Groups]
 *     summary: Delete a community group
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the community group to delete
 *     responses:
 *       200:
 *         description: Community group deleted successfully
 *       400:
 *         description: Error message
 */
router.delete('/:id', communityGroupController.deleteCommunityGroup);

/**
 * @swagger
 * /api/community-groups/{groupId}/categories/{categoryId}:
 *   post:
 *     tags: [Community Groups]
 *     summary: Add a category to a community group
 *     parameters:
 *       - in: path
 *         name: groupId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the community group
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the category to add
 *     responses:
 *       200:
 *         description: Category added to community group successfully
 *       400:
 *         description: Error message
 */
router.post('/:groupId/categories/:categoryId', communityGroupController.addCategoryToGroup);

export default router;
