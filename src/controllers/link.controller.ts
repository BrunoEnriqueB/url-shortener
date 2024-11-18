// Link Controller
import { UnprocessableEntityError } from '@/domain/errors/http';
import { CreateLinkDTO } from '@/dtos/link/create.dto';
import validateToken from '@/helpers/validate-token.helper';
import { LinkService } from '@/services/link.service';
import { NextFunction, Request, Response } from 'express';

export default class LinkController {
  constructor(private linkService: LinkService) {}

  async createLink(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const createLinkDto = CreateLinkDTO.safeParse(req.body);

      if (!createLinkDto.success) {
        throw new UnprocessableEntityError(createLinkDto.error.errors);
      }

      const user = await validateToken(req);

      const newLink = await this.linkService.createLink(
        createLinkDto.data,
        user
      );

      res.status(201).json({ success: true, url: newLink.shortened_url });
    } catch (error) {
      next(error);
    }
  }
}
