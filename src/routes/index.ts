import { Request, Response, Router } from 'express';

const router = Router();

router.get('/status', async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ message: 'Hello World' });
});

export default router;
