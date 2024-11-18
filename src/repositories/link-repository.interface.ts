import { TListLinksDto } from '@/dtos/link/list.dto';
import { TUpdateLinkDto } from '@/dtos/link/update.dto';
import { TCreateLinkAccessDTO } from '@/dtos/link_access/create.dto';
import Link from '@/models/link.model';
import LinkAccess from '@/models/link_access.model';
import User from '@/models/user.model';

interface LinkRepositoryInterface {
  create(originalUrl: string, shortenedUrl: string, user?: User): Promise<Link>;
  findUniqueOrThrow(shortenedUrl: string): Promise<Link>;
  findUnique(shortenedUrl: string): Promise<Link | undefined>;
  findByIdOrThrow(id: number): Promise<Link>;
  createAccess(data: TCreateLinkAccessDTO): Promise<LinkAccess>;
  find(listParameters: TListLinksDto): Promise<Link[]>;
  update(updateParameters: TUpdateLinkDto): Promise<Link | undefined>;
}

export default LinkRepositoryInterface;
