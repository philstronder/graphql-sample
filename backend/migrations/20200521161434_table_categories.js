
exports.up = function(knex, Promise) {
  return knex.schema.createTable('categories', table => {
      table.increments('id').primary()
      table.string('name').notNull()
      table.timestamp('date_created')
        .defaultTo(knex.fn.now())
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('categories')
};
