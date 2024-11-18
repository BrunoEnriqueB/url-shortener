import env from '@/config/environment';
import { UnauthorizedError } from '@/domain/errors/http';
import { TCreateLinkDTO } from '@/dtos/link/create.dto';
import { TDeleteLinkDto } from '@/dtos/link/delete.dto';
import { TListLinksDto } from '@/dtos/link/list.dto';
import { TUpdateLinkDto } from '@/dtos/link/update.dto';
import { CreateLinkAccessDTO } from '@/dtos/link_access/create.dto';
import Link from '@/models/link.model';
import User from '@/models/user.model';
import LinkRepositoryInterface from '@/repositories/link-repository.interface';
import hashOriginalUrl from '@/utils/hash-url.util';
import { Request } from 'express';

export class LinkService {
  constructor(private linkRepository: LinkRepositoryInterface) {}

  async createLink(createLinkDto: TCreateLinkDTO, user?: User): Promise<Link> {
    const shortenedUrl: string = hashOriginalUrl(createLinkDto.original_url);

    const newLink = await this.linkRepository.create(
      encodeURIComponent(createLinkDto.original_url),
      shortenedUrl,
      user
    );

    newLink.shortened_url = this.concatenateUrl(newLink.shortened_url);

    return newLink;
  }

  async list(list: TListLinksDto) {
    const links = await this.linkRepository.find(list);

    const parsedLinks = links.map((link) => {
      return {
        id: link.id,
        shortened_url: this.concatenateUrl(link.shortened_url),
        original_url: link.original_url,
        clicks: link.clicks
      };
    });

    return parsedLinks;
  }

  async linkAccess(shortenedUrl: string, req: Request): Promise<Link> {
    const link = await this.linkRepository.findUniqueOrThrow(shortenedUrl);

    const createLinkAccessDto = CreateLinkAccessDTO.parse({
      ip_address: req.ip,
      user_agent: req.headers['user-agent'],
      metadata: req.headers,
      link_id: Number(link.id)
    });

    this.linkRepository.createAccess(createLinkAccessDto);

    return link;
  }

  async update(updateLinkDto: TUpdateLinkDto) {
    const link = await this.linkRepository.findByIdOrThrow(updateLinkDto.id);

    const linkHasUser = link.user?.length;
    const linkBelongsToUser =
      link.user?.length && link.user[0]!.id === updateLinkDto.user_id;

    if (!linkHasUser || !linkBelongsToUser) {
      throw new UnauthorizedError();
    }

    const updatedLink = await this.linkRepository.update(updateLinkDto);

    return updatedLink;
  }

  async delete(deleteLinkDto: TDeleteLinkDto) {
    const link = await this.linkRepository.findById(deleteLinkDto.id);

    if (!link) return;

    const linkHasUser = link.user?.length;
    const linkBelongsToUser =
      link.user?.length && link.user[0]!.id === deleteLinkDto.user_id;

    if (!linkHasUser || !linkBelongsToUser) {
      return;
    }

    await this.linkRepository.delete(deleteLinkDto);
  }

  private concatenateUrl(shortenedUrl: string) {
    return `${env.API_URL}/${shortenedUrl}`;
  }
}
