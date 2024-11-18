import env from '@/config/environment';
import { TCreateLinkDTO } from '@/dtos/link/create.dto';
import { TListLinksDto } from '@/dtos/link/list.dto';
import { CreateLinkAccessDTO } from '@/dtos/link_access/create.dto';
import Link from '@/models/link.model';
import User from '@/models/user.model';
import LinkRepositoryInterface from '@/repositories/link-repository.interface';
import hashOriginalUrl from '@/utils/hash-url.util';
import { Request } from 'express';

export class LinkService {
  constructor(private linkRepository: LinkRepositoryInterface) {}

  async createLink(createLinkDto: TCreateLinkDTO, user?: User): Promise<Link> {
    let shortenedUrl: string = '';

    while (!shortenedUrl) {
      const hashedOriginalUrl = hashOriginalUrl(createLinkDto.original_url);

      const linkWithThisUrl =
        await this.linkRepository.findUnique(hashedOriginalUrl);

      if (!linkWithThisUrl) shortenedUrl = hashedOriginalUrl;
    }

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

  private concatenateUrl(shortened_url: string) {
    return `${env.API_URL}/${shortened_url}`;
  }
}
