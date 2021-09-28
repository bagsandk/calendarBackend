const { GraphQLString } = require("graphql");
const { knex } = require("../../db/knex.js");
const bcrypt = require("bcrypt");
const { UserType } = require("../TypeDefs/User.js");
const { insertUser } = require("../../db/model/User.js");

module.exports.CREATE_USER = {
  type: UserType,
  args: {
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    level: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const { name, email, password, level } = args;
    const pass = await bcrypt.hash(password, 10);
    await insertUser({
      name,
      email,
      password: pass,
      level,
    });
    return args;
  },
};

