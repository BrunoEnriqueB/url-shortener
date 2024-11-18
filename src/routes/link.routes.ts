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
 *         description: Not authorized.
 *       422:
 *         description: Validation error.
 */
router.post('/', linkController.createLink.bind(linkController));

export default router;
