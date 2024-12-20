import path from 'path';
import env from './config/environment';
import { Knex } from 'knex';

const FIVE_SECONDS_IN_MILLISECONDS = 5 * 1000;

const databaseConfigs: Record<'default' | 'test', Knex.Config> = {
  default: {
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
      directory: path.join(__dirname, 'database/migrations'),
      tableName: 'migrations'
    }
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:'
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.join(__dirname, 'database/migrations'),
      tableName: 'migrations'
    }
  }
};

export { databaseConfigs };
export default databaseConfigs.default;
