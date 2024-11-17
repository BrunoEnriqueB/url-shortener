import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users_links', (builder) => {
    builder.bigIncrements();
    builder.bigInteger('link_id').notNullable();
    builder.integer('user_id').notNullable();
    builder.timestamps();

    builder.foreign('link_id').references('links.id');
    builder.foreign('user_id').references('users.id').onDelete('CASCADE');

    builder.unique(['link_id', 'user_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users_links');
}
