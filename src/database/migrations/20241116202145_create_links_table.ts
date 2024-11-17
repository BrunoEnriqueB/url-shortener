import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('links', (builder) => {
    builder.bigIncrements();
    builder.string('shortened_url', 10).unique().notNullable().index();
    builder.text('original_url').notNullable();
    builder.integer('clicks').defaultTo(0);
    builder.timestamps();
    builder.dateTime('deleted_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('links');
}
