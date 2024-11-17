import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('links_access', (builder) => {
    builder.bigIncrements();
    builder.string('ip_address', 100);
    builder.text('user_agent');
    builder.jsonb('metadata');
    builder.bigInteger('link_id').notNullable();
    builder.timestamps();

    builder.foreign('link_id').references('links.id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('links_access');
}
