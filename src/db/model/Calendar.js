const { knex } = require("../knex.js");

const insertCalendar = (params) => {
  return knex("calendar").insert([params]);
};
const updateCalendar = (id, params) => {
  return knex("calendar").where({ calendar_id: id }).update(params);
};
const deleteCalendar = (id) => {
  return knex("calendar").where("calendar_id", id).del();
};
const getAllCalendar = () => {
  return knex
    .select(
      "calendar.calendar_id",
      "calendar.calendar_name",
      "calendar.created_by",
      "calendar.status",
      "calendar.uri",
      "users.name"
    )
    .join("users", "users.user_id", "=", "calendar.created_by")
    .from("calendar");
};
const getOneCalendar = (id) => {
  return knex
    .select(
      "calendar_id",
      "calendar_name",
      "created_by",
      "status",
      "uri",
      "created_at"
    )
    .from("calendar")
    .where({
      calendar_id: id,
    })
    .first();
};
const getCalendarByUser = (user_id) => {
  return knex
    .select(
      "calendar_id",
      "calendar_name",
      "created_by",
      "uri",
      "status",
      "created_at"
    )
    .from("calendar")
    .where({
      created_by: user_id,
    });
};

module.exports = {
  insertCalendar,
  getAllCalendar,
  getOneCalendar,
  updateCalendar,
  deleteCalendar,
  getCalendarByUser,
};
