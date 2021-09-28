exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("user_id");
    table.string("name", 50).notNullable();
    table.string("email", 100).notNullable();
    table.string("password", 255).notNullable();
    table.enu("level", ["admin", "user"]).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
