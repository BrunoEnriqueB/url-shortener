import { TCreateLinkAccessDTO } from '@/dtos/link_access/create.dto';
import Link from '@/models/link.model';
import LinkAccess from '@/models/link_access.model';
import User from '@/models/user.model';

interface LinkRepositoryInterface {
  create(
    original_url: string,
    shortened_url: string,
    user?: User
  ): Promise<Link>;
  findUniqueOrThrow(shortened_url: string): Promise<Link>;
  findUnique(shortened_url: string): Promise<Link | undefined>;
  findByIdOrThrow(id: number): Promise<Link>;
  createAccess(data: TCreateLinkAccessDTO): Promise<LinkAccess>;
}

export default LinkRepositoryInterface;
