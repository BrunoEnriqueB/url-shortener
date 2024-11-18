import { Router } from 'express';

import LinkController from '@/controllers/link.controller';
import LinkRepository from '@/repositories/link.repository';
import { LinkService } from '@/services/link.service';

const router = Router();

const linkRepository = new LinkRepository();
const linkService = new LinkService(linkRepository);

const linkController = new LinkController(linkService);

router.get('/:shortened_url', linkController.find.bind(linkController));

export default router;
