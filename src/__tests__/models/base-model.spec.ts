import Link from '@/models/link.model';
import User from '@/models/user.model';
import Knex from 'knex';
import { Model } from 'objection';

import randomShortUrl from '@/utils/random-short-url.utils';
import { databaseConfigs } from '@/knexfile';

const knex = setupTestDb();

beforeAll(async () => {
  await knex.migrate.latest();
});

afterAll(async () => {
  await knex.destroy();
});

let trx: Knex.Knex.Transaction;

beforeEach(async () => {
  trx = await knex.transaction();

  Model.knex(trx);
});

afterEach(async () => {
  trx.rollback();
});

describe('Soft Delete Functionality', () => {
  it('shoud not return link in normal delete queries', async () => {
    const link = await Link.query().insert({
      original_url: 'https://teste.com',
      shortened_url: randomShortUrl()
    });

    const linkBeforeDelete = await Link.query().findById(link.id);
    expect(linkBeforeDelete).toBeDefined();

    await Link.query().deleteById(link.id);

    const linkAfterDelete = await Link.query().findById(link.id);
    expect(linkAfterDelete).toBeUndefined();
  });

  it('shoud return link in deleted queries', async () => {
    const link = await Link.query().insert({
      original_url: 'https://teste.com',
      shortened_url: randomShortUrl()
    });

    const linkBeforeDelete = await Link.query().withDeleted().findById(link.id);
    expect(linkBeforeDelete).toBeDefined();

    await Link.query().deleteById(link.id);

    const linkAfterDelete = await Link.query().withDeleted().findById(link.id);
    expect(linkAfterDelete).toBeDefined();
    expect(linkAfterDelete?.deleted_at).not.toBeNull();
  });

  it('should not return user in normal queries', async () => {
    const user = await User.query().insert({
      email: `test-${Date.now()}@example.com`,
      password: 'teste'
    });
    const usersBeforeDelete = await User.query();
    expect(usersBeforeDelete.length).toBe(1);

    await User.query().deleteById(user.id);
    const usersAfterDelete = await User.query();
    expect(usersAfterDelete.length).toBe(0);
  });

  it('should not return user in deleted queries', async () => {
    const user = await User.query().insert({
      email: `test-${Date.now()}@example.com`,
      password: 'teste'
    });
    const usersBeforeDelete = await User.query();
    expect(usersBeforeDelete.length).toBe(1);

    await User.query().deleteById(user.id);
    const usersAfterDelete = await User.query().withDeleted();
    expect(usersAfterDelete.length).toBe(0);
  });
});

function setupTestDb() {
  const knex = Knex(databaseConfigs.test);

  Model.knex(knex);

  return knex;
}
