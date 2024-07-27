import express from 'express';
import forumPostController from '../controllers/Post.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Forum Posts
 *   description: Forum post management endpoints
 */

/**
 * @swagger
 * /api/forum-posts/{groupId}:
 *   post:
 *     tags: [Forum Posts]
 *     summary: Add a new post to a community group
 *     parameters:
 *       - in: path
 *         name: groupId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the community group
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               userId:
 *                 type: string
 *                 description: The ID of the user creating the post
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Error message
 */
router.post('/:groupId', forumPostController.addPost);

/**
 * @swagger
 * /api/forum-posts/{groupId}:
 *   get:
 *     tags: [Forum Posts]
 *     summary: Get all posts for a community group
 *     parameters:
 *       - in: path
 *         name: groupId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the community group
 *     responses:
 *       200:
 *         description: Posts fetched successfully
 *       400:
 *         description: Error message
 */
router.get('/:groupId', forumPostController.getPostsByCommunityGroup);

/**
 * @swagger
 * /api/forum-posts/{id}:
 *   delete:
 *     tags: [Forum Posts]
 *     summary: Delete a post
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post to delete
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user deleting the post
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       400:
 *         description: Error message
 */
router.delete('/:id', forumPostController.deletePost);

export default router;
