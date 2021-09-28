const { GraphQLString, GraphQLObjectType } = require("graphql");
const { knex } = require("../../db/knex");
const { LoginType } = require("../TypeDefs/Login");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

const LogoutType = new GraphQLObjectType({
  name: "Logout",
  fields: () => ({
    ok: { type: GraphQLString },
    message: { type: GraphQLString },
  }),
});

module.exports.LOGOUT = {
  type: LogoutType,
  async resolve(perent, args, { req, res }) {
    res.clearCookie("refresh-token");
    res.clearCookie("access-token");
    return { ok: "a", message: "j" };
  },
};
