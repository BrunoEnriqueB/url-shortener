import {
  LinkAlreadyExistsError,
  LinkNotFoundError
} from '@/domain/errors/link';
import { TCreateLinkAccessDTO } from '@/dtos/link_access/create.dto';
import Link from '@/models/link.model';
import LinkAccess from '@/models/link_access.model';
import User from '@/models/user.model';
import UsersLinks from '@/models/user_links.model';
import { PartialModelObject } from 'objection';
import LinkRepositoryInterface from './link-repository.interface';
import { TListLinksDto } from '@/dtos/link/list.dto';
import { TUpdateLinkDto } from '@/dtos/link/update.dto';
import { TDeleteLinkDto } from '@/dtos/link/delete.dto';

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
      throw new LinkAlreadyExistsError();
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

      newLink = await newLink.$query().withGraphJoined('user');
    }

    return newLink;
  }

  async findUniqueOrThrow(shortenedUrl: string): Promise<Link> {
    const link = await Link.query()
      .withGraphJoined({
        accesses: true,
        user: true
      })
      .where({
        shortened_url: shortenedUrl
      })
      .first();

    if (!link) {
      throw new LinkNotFoundError();
    }

    return link;
  }

  async findByIdOrThrow(id: number): Promise<Link> {
    const link = await Link.query()
      .withGraphJoined({
        accesses: true,
        user: true
      })
      .findById(id);

    if (!link) {
      throw new LinkNotFoundError();
    }

    return link;
  }

  async findById(id: number): Promise<Link | undefined> {
    const link = await Link.query()
      .withGraphJoined({
        accesses: true,
        user: true
      })
      .findById(id);

    return link;
  }

  async findUnique(shortenedUrl: string): Promise<Link | undefined> {
    const link = await Link.query()
      .withGraphJoined({
        accesses: true,
        user: true
      })
      .where({
        shortened_url: shortenedUrl
      })
      .first();

    return link;
  }

  async createAccess(linkAccessDto: TCreateLinkAccessDTO): Promise<LinkAccess> {
    const findLink = await Link.query().findById(linkAccessDto.link_id);

    if (!findLink) {
      throw new LinkNotFoundError();
    }

    const newLinkAccessData: PartialModelObject<LinkAccess> = {
      link_id: linkAccessDto.link_id,
      ip_address: linkAccessDto.ip_address,
      metadata: linkAccessDto.metadata,
      user_agent: linkAccessDto.user_agent
    };

    const newLinkAccess =
      await LinkAccess.query().insertGraphAndFetch(newLinkAccessData);

    findLink.clicks++;

    await findLink.$query().update();

    return newLinkAccess;
  }

  async find(parameters: TListLinksDto) {
    const linksQuery = Link.query()
      .withGraphJoined({
        accesses: true
      })
      .joinRelated('user')
      .where('user.id', parameters.user_id)
      .orderBy('created_at', 'DESC');

    if (parameters.id) {
      linksQuery.where(`${Link.tableName}.id`, parameters.id);
    }

    const links = await linksQuery;

    return links;
  }

  async update(parameters: TUpdateLinkDto) {
    await Link.query()
      .whereExists(
        UsersLinks.query().where({
          user_id: parameters.user_id,
          link_id: parameters.id
        })
      )
      .where(`${Link.tableName}.id`, parameters.id)
      .patch({ original_url: parameters.new_url });

    const link = await Link.query().findById(parameters.id);

    return link;
  }

  async delete(parameters: TDeleteLinkDto) {
    await Link.query()
      .whereExists(
        UsersLinks.query().where({
          user_id: parameters.user_id,
          link_id: parameters.id
        })
      )
      .where(`${Link.tableName}.id`, parameters.id)
      .deleteById(parameters.id);
  }
}

export default LinkRepository;
