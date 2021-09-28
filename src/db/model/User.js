const { knex } = require("../../db/knex.js");

const insertUser = (params) => {
  return knex("users").insert([params]);
};
const getAllUser = () => {
  return knex.select().from("users");
};
const getOneUser = (id) => {
  return knex
    .select()
    .from("users")
    .where({
      user_id: id,
    }).first();
};

module.exports = { insertUser, getAllUser, getOneUser };
