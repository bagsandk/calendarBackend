const bcrypt = require("bcrypt");
exports.seed = async function (knex) {
  const pass = await bcrypt.hash("123456", 10)
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          name: "Admin",
          email: "admin@calendar.com",
          password: pass,
          level: "admin",
        },
      ]);
    });
};
