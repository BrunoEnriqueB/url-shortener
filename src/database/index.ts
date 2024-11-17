import logger from '@/config/logger';
import databaseConfig from '@/knexfile';
import Knex from 'knex';

const database = Knex(databaseConfig);

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

export default database;
