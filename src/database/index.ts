import logger from '@/config/logger';
import databaseConfigs from '@/knexfile';
import Knex from 'knex';
import { Model } from 'objection';

const database = Knex(databaseConfigs);

export async function testConnection() {
  try {
    await database.raw('SELECT 1');
    logger.debug('[DATABASE] - Connected');
  } catch (e) {
    logger.error(
      `[DATABASE] - An error occurred when connecting to database: ${JSON.stringify(e)}`
    );
    throw e;
  }
}

export async function setupDatabase() {
  Model.knex(database);
}

export default database;
