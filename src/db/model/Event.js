const { knex } = require("../knex.js");

const insertEvent = (params) => {
  return knex("events").insert([params]);
};
const updateEvent = (id, params) => {
  return knex("events").where({ event_id: id }).update(params);
};
const deleteEvent = (id) => {
  return knex("events").where("event_id", id).del();
};
const getAllEvent = () => {
  return knex
    .select(
      "events.event_id",
      "events.calendar_id",
      "events.created_by",
      "events.title",
      "events.start_date",
      "events.finish_date",
      "events.created_at"
    )
    .join("users", "users.user_id", "=", "events.created_by")
    .from("events");
};
const getOneEvent = (id) => {
  return knex
    .select()
    .from("events")
    .where({
      event_id: id,
    })
    .first();
};
const getEventByUser = (user_id) => {
  return knex.select().from("events").where({
    created_by: user_id,
  });
};

module.exports = {
  insertEvent,
  getAllEvent,
  getOneEvent,
  updateEvent,
  deleteEvent,
  getEventByUser,
};
