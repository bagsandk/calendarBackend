exports.up = function (knex) {
  return knex.schema.createTable("events", function (table) {
    table.increments("event_id");
    table.integer("created_by").notNullable();
    table.integer("calendar_id").notNullable();
    table.string("title", 50).notNullable();
    table.string("desc", 100).notNullable();
    table.date("start_date", 255).notNullable();
    table.date("finish_date", 255).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("events");
};
