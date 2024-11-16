import env from '@/config/environment';
import logger from '@/config/logger';
import Knex from 'knex';
import path from 'node:path';

const FIVE_SECONDS_IN_MILLISECONDS = 5 * 1000;

const database = Knex({
  client: 'postgres',
  connection: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    debug: env.NODE_ENV === 'DEVELOPMENT',
    pool: {
      min: 1,
      max: 10
    }
  },
  acquireConnectionTimeout: FIVE_SECONDS_IN_MILLISECONDS,
  migrations: {
    directory: path.join(__dirname, 'migrations')
  }
});

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
