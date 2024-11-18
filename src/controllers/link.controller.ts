import {
  UnauthorizedError,
  UnprocessableEntityError
} from '@/domain/errors/http';
import { CreateLinkDTO } from '@/dtos/link/create.dto';
import { DeleteLinkDto } from '@/dtos/link/delete.dto';
import { FindLinkDTO } from '@/dtos/link/find.dto';
import { ListLinksDto } from '@/dtos/link/list.dto';
import { UpdateLinkDto } from '@/dtos/link/update.dto';
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

      res
        .status(201)
        .json({ success: true, url: newLink.shortened_url, id: newLink.id });
    } catch (error) {
      next(error);
    }
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await validateToken(req);

      if (!user) {
        throw new UnauthorizedError();
      }

      const listLinkDto = ListLinksDto.safeParse({
        user_id: user.id,
        id: req.query.id
      });

      if (!listLinkDto.success) {
        throw new UnprocessableEntityError(listLinkDto.error.errors);
      }

      const links = await this.linkService.list(listLinkDto.data);

      res.status(200).json({
        success: true,
        data: links
      });
    } catch (error) {
      next(error);
    }
  }

  async access(req: Request, res: Response, next: NextFunction): Promise<void> {
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

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await validateToken(req);

      if (!user) {
        throw new UnauthorizedError();
      }

      const updateLinkDto = UpdateLinkDto.safeParse({
        id: req.params.id,
        new_url: req.body.new_url,
        user_id: user.id
      });

      if (!updateLinkDto.success) {
        throw new UnprocessableEntityError(updateLinkDto.error.errors);
      }

      await this.linkService.update(updateLinkDto.data);

      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await validateToken(req);

      if (!user) {
        throw new UnauthorizedError();
      }

      const deleteLinkDto = DeleteLinkDto.safeParse({
        id: req.params.id,
        user_id: user.id
      });

      if (!deleteLinkDto.success) {
        throw new UnprocessableEntityError(deleteLinkDto.error.errors);
      }

      await this.linkService.delete(deleteLinkDto.data);

      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
}
