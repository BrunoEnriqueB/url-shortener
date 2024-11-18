import { TCreateLinkDTO } from '@/dtos/link/create.dto';
import Link from '@/models/link.model';
import User from '@/models/user.model';
import LinkRepositoryInterface from '@/repositories/link-repository.interface';
import hashOriginalUrl from '@/utils/hash-url.util';

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
      createLinkDto.original_url,
      shortenedUrl,
      user
    );

    return newLink;
  }

  async getLinkByShortUrl(shortUrl: string): Promise<Link | undefined> {
    return await Link.query().findOne({ shortened_url: shortUrl });
  }
}
