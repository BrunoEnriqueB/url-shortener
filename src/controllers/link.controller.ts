// Link Controller
import env from '@/config/environment';
import { UnprocessableEntityError } from '@/domain/errors/http';
import { CreateLinkDTO } from '@/dtos/link/create.dto';
import { FindLinkDTO } from '@/dtos/link/find.dto';
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

      const shortened_url = `${env.API_URL}/${newLink.shortened_url}`;

      res.status(201).json({ success: true, url: shortened_url });
    } catch (error) {
      next(error);
    }
  }

  async find(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const findLinkDto = FindLinkDTO.safeParse(req.params);

      if (!findLinkDto.success) {
        throw new UnprocessableEntityError(findLinkDto.error.errors);
      }

      const link = await this.linkService.linkAccess(
        findLinkDto.data.shortened_url,
        req
      );

      res.redirect(decodeURIComponent(link.original_url));
    } catch (error) {
      next(error);
    }
  }
}
