exports.up = function (knex) {
  return knex.schema.createTable("calendar", function (table) {
    table.increments("calendar_id");
    table.string("calendar_name", 50).notNullable();
    table.string("uri", 255).notNullable();
    table.integer("created_by").notNullable();
    table.enu("status", ["waiting", "approve", "reject"]).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("calendar");
};
