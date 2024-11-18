import { TCreateLinkDTO } from '@/dtos/link/create.dto';
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

    return newLink;
  }

  async find(shortUrl: string): Promise<Link> {
    const link = this.linkRepository.findUniqueOrThrow(shortUrl);

    return link;
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
}
