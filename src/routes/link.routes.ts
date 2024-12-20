import { Router } from 'express';

import LinkController from '@/controllers/link.controller';
import LinkRepository from '@/repositories/link.repository';
import { LinkService } from '@/services/link.service';

const router = Router();

const linkRepository = new LinkRepository();
const linkService = new LinkService(linkRepository);

const linkController = new LinkController(linkService);

/**
 * @swagger
 * /api/link:
 *   get:
 *     summary: List links of user
 *     description: Retrieve information about a link, including the number of clicks. Requires a bearer token for authentication.
 *     tags:
 *       - Links
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Link details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: true
 *                 links:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       shortened_url:
 *                         type: string
 *                       original_url:
 *                         type: string
 *                       clicks:
 *                         type: integer
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       422:
 *         $ref: '#/components/responses/ValidationError'
 */

router.get('/', linkController.list.bind(linkController));

/**
 * @swagger
 * /api/link:
 *   post:
 *     summary: Creates a redirect link
 *     tags:
 *       - Links
 *     security:
 *          - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               original_url:
 *                 type: string
 *                 description: Url to be shorted.
 *                 example: "https://example.com"
 *     responses:
 *       201:
 *         description: Link created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   description: Shortened url.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       422:
 *         $ref: '#/components/responses/ValidationError'

 */
router.post('/', linkController.createLink.bind(linkController));

/**
 * @swagger
 * /api/link/{id}:
 *   patch:
 *     summary: Update a link
 *     description: Update the redirection URL of an existing link
 *     tags:
 *       - Links
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the link to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               new_url:
 *                 type: string
 *                 description: The new URL for the redirection
 *     responses:
 *       204:
 *         description: Link updated successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       422:
 *         $ref: '#/components/responses/ValidationError'
 */
router.patch('/:id', linkController.update.bind(linkController));

/**
 * @swagger
 * /api/link/{id}:
 *   delete:
 *     summary: Delete a link
 *     description: Delete an existing link by its ID
 *     tags:
 *       - Links
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the link to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Link deleted successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       422:
 *         $ref: '#/components/responses/ValidationError'
 */

router.delete('/:id', linkController.delete.bind(linkController));

export default router;
