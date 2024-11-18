import { LinkNotFoundError } from '@/domain/errors/link';
import { UserAlreadyExistsError } from '@/domain/errors/user';
import Link from '@/models/link.model';
import User from '@/models/user.model';
import UsersLinks from '@/models/user_links.model';
import { PartialModelObject } from 'objection';
import LinkRepositoryInterface from './link-repository.interface';

class LinkRepository implements LinkRepositoryInterface {
  async create(
    original_url: string,
    shortened_url: string,
    user?: User
  ): Promise<Link> {
    const findLink = await Link.query().where({
      shortened_url
    });

    if (findLink.length) {
      throw new UserAlreadyExistsError();
    }

    const newLinkData: PartialModelObject<Link> = {
      original_url,
      shortened_url
    };

    let newLink = await Link.query().insertGraphAndFetch(newLinkData);

    if (user) {
      await UsersLinks.query().insert({
        user_id: user.id,
        link_id: newLink.id
      });

      newLink = await newLink.$query().withGraphFetched('user');
    }

    return newLink;
  }

  async findUniqueOrThrow(shortened_url: string): Promise<Link> {
    const link = await Link.query()
      .where({
        shortened_url
      })
      .first();

    if (!link) {
      throw new LinkNotFoundError();
    }

    return link;
  }

  async findUnique(shortened_url: string): Promise<Link | undefined> {
    const link = await Link.query()
      .where({
        shortened_url
      })
      .first();

    return link;
  }
}

export default LinkRepository;
