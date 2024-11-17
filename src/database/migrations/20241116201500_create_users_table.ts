import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (builder: Knex.CreateTableBuilder) => {
    builder.increments();
    builder.string('email').notNullable();
    builder.string('password', 100);
    builder.timestamps();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
}
