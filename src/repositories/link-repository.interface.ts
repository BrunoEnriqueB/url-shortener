import Link from '@/models/link.model';
import User from '@/models/user.model';

interface LinkRepositoryInterface {
  create(
    original_url: string,
    shortened_url: string,
    user?: User
  ): Promise<Link>;
  findUniqueOrThrow(shortened_url: string): Promise<Link>;
  findUnique(shortened_url: string): Promise<Link | undefined>;
}

export default LinkRepositoryInterface;
