import { Request, Response, Router } from 'express';
import authRouter from '@/routes/auth.routes';

const router = Router();

/**
 * @swagger
 * /api/status:
 *   get:
 *     summary: Check the API status
 *     description: Returns a simple status message to verify the API is running.
 *     tags:
 *       - Status
 *     responses:
 *       200:
 *         description: API is running successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello World
 */
router.get('/status', async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ message: 'Hello World' });
});

router.use('/auth', authRouter);

export default router;
